import { TableNode, Field, MySqlDataTypes, PostgreSqlDataTypes } from "../types/types";

type DatabaseType = 'mysql' | 'postgresql';

interface ParsedColumn {
  name: string;
  type: string;
  length?: number;
  isPrimary?: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  defaultValue?: string;
  comment?: string;
}

interface ParsedTable {
  name: string;
  columns: ParsedColumn[];
}

/**
 * SQL CREATE TABLE statement'ı parse eder
 */
function parseCreateTableSQL(sql: string, dbType: DatabaseType = 'mysql'): ParsedTable {
  // SQL'i temizle
  const cleanSQL = sql.trim().replace(/\s+/g, ' ');
  
  // Tablo adını çıkar
  const tableNameMatch = cleanSQL.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:`([^`]+)`|(\w+))/i);
  if (!tableNameMatch) {
    throw new Error('Tablo adı bulunamadı');
  }
  
  const tableName = tableNameMatch[1] || tableNameMatch[2];
  
  // Sütun tanımlarını çıkar - multiline için alternatif yaklaşım
  const columnsMatch = cleanSQL.match(/\(([\s\S]*)\)/);
  if (!columnsMatch) {
    throw new Error('Sütun tanımları bulunamadı');
  }
  
  const columnsString = columnsMatch[1];
  const columns: ParsedColumn[] = [];
  
  // Sütunları parse et
  const columnLines = splitColumns(columnsString);
  
  for (const line of columnLines) {
    const trimmedLine = line.trim();
    
    // PRIMARY KEY, FOREIGN KEY, INDEX gibi constraint'leri atla
    if (trimmedLine.match(/^(PRIMARY\s+KEY|FOREIGN\s+KEY|INDEX|KEY|UNIQUE\s+KEY|CONSTRAINT)/i)) {
      continue;
    }
    
    const column = parseColumn(trimmedLine, dbType);
    if (column) {
      columns.push(column);
    }
  }
  
  return {
    name: tableName,
    columns
  };
}

/**
 * Sütun tanımlarını virgülle ayırır (parantez içindeki virgülleri göz ardı eder)
 */
function splitColumns(columnsString: string): string[] {
  const columns: string[] = [];
  let current = '';
  let parenthesesCount = 0;
  
  for (let i = 0; i < columnsString.length; i++) {
    const char = columnsString[i];
    
    if (char === '(') {
      parenthesesCount++;
    } else if (char === ')') {
      parenthesesCount--;
    } else if (char === ',' && parenthesesCount === 0) {
      if (current.trim()) {
        columns.push(current.trim());
      }
      current = '';
      continue;
    }
    
    current += char;
  }
  
  if (current.trim()) {
    columns.push(current.trim());
  }
  
  return columns;
}

/**
 * Tek bir sütun tanımını parse eder
 */
function parseColumn(columnDef: string, dbType: DatabaseType): ParsedColumn | null {
  const parts = columnDef.split(/\s+/);
  if (parts.length < 2) return null;
  
  const columnName = parts[0].replace(/[`"]/g, '');
  let dataType = parts[1].toUpperCase();
  
  const column: ParsedColumn = {
    name: columnName,
    type: dataType,
    isNullable: true // Varsayılan olarak nullable
  };
  
  // Veri tipi ve uzunluk
  const typeMatch = dataType.match(/([A-Z]+)(?:\((\d+)(?:,\d+)?\))?/);
  if (typeMatch) {
    column.type = typeMatch[1];
    if (typeMatch[2]) {
      column.length = parseInt(typeMatch[2]);
    }
  }
  
  // Constraint'leri kontrol et
  const restOfDefinition = parts.slice(2).join(' ').toUpperCase();
  
  if (restOfDefinition.includes('PRIMARY KEY')) {
    column.isPrimary = true;
    column.isNullable = false;
  }
  
  if (restOfDefinition.includes('NOT NULL')) {
    column.isNullable = false;
  }
  
  if (restOfDefinition.includes('UNIQUE')) {
    column.isUnique = true;
  }
  
  // Default değer
  const defaultMatch = restOfDefinition.match(/DEFAULT\s+('([^']*)'|"([^"]*)"|(\S+))/);
  if (defaultMatch) {
    column.defaultValue = defaultMatch[2] || defaultMatch[3] || defaultMatch[4];
  }
  
  // Comment
  const commentMatch = restOfDefinition.match(/COMMENT\s+'([^']*)'/);
  if (commentMatch) {
    column.comment = commentMatch[1];
  }
  
  return column;
}

/**
 * Veri tipini normalize eder (MySQL/PostgreSQL farklılıklarını giderir)
 */
function normalizeDataType(type: string, dbType: DatabaseType): keyof MySqlDataTypes | keyof PostgreSqlDataTypes {
  const normalizedType = type.toUpperCase();
  
  if (dbType === 'mysql') {
    // MySQL tip eşlemeleri
    const mysqlMappings: Record<string, keyof MySqlDataTypes> = {
      'INT': 'INT',
      'INTEGER': 'INTEGER',
      'BIGINT': 'BIGINT',
      'SMALLINT': 'SMALLINT',
      'TINYINT': 'TINYINT',
      'MEDIUMINT': 'MEDIUMINT',
      'FLOAT': 'FLOAT',
      'DOUBLE': 'DOUBLE',
      'DECIMAL': 'DECIMAL',
      'NUMERIC': 'NUMERIC',
      'BIT': 'BIT',
      'CHAR': 'CHAR',
      'VARCHAR': 'VARCHAR',
      'TEXT': 'TEXT',
      'TINYTEXT': 'TINYTEXT',
      'MEDIUMTEXT': 'MEDIUMTEXT',
      'LONGTEXT': 'LONGTEXT',
      'JSON': 'JSON',
      'DATE': 'DATE',
      'DATETIME': 'DATETIME',
      'TIMESTAMP': 'TIMESTAMP',
      'TIME': 'TIME',
      'YEAR': 'YEAR',
      'BINARY': 'BINARY',
      'VARBINARY': 'VARBINARY',
      'BLOB': 'BLOB',
      'TINYBLOB': 'TINYBLOB',
      'MEDIUMBLOB': 'MEDIUMBLOB',
      'LONGBLOB': 'LONGBLOB',
      'BOOLEAN': 'BOOLEAN',
      'BOOL': 'BOOLEAN',
      'ENUM': 'ENUM',
      'SET': 'SET'
    };
    
    return mysqlMappings[normalizedType] || 'VARCHAR';
  } else {
    // PostgreSQL tip eşlemeleri
    const postgresqlMappings: Record<string, keyof PostgreSqlDataTypes> = {
      'SMALLINT': 'smallint',
      'INT': 'integer',
      'INT4': 'integer',
      'INTEGER': 'integer',
      'BIGINT': 'bigint',
      'INT8': 'bigint',
      'SERIAL': 'serial',
      'BIGSERIAL': 'bigserial',
      'DECIMAL': 'decimal',
      'NUMERIC': 'numeric',
      'REAL': 'real',
      'FLOAT4': 'real',
      'DOUBLE': 'double precision',
      'FLOAT8': 'double precision',
      'MONEY': 'money',
      'VARCHAR': 'varchar',
      'CHAR': 'char',
      'TEXT': 'text',
      'TIMESTAMP': 'timestamp',
      'TIMESTAMPTZ': 'timestamp with time zone',
      'DATE': 'date',
      'TIME': 'time',
      'TIMETZ': 'time with time zone',
      'INTERVAL': 'interval',
      'BOOLEAN': 'boolean',
      'BOOL': 'boolean',
      'BYTEA': 'bytea',
      'JSON': 'json',
      'JSONB': 'jsonb',
      'UUID': 'uuid',
      'INET': 'inet',
      'CIDR': 'cidr',
      'MACADDR': 'macaddr'
    };
    
    return postgresqlMappings[normalizedType] || 'text';
  }
}

/**
 * ParsedTable'ı TableNode'a çevirir
 */
function convertToTableNode(parsedTable: ParsedTable, dbType: DatabaseType = 'mysql', position: { x: number, y: number } = { x: 0, y: 0 }): TableNode {
  const fields: Field[] = parsedTable.columns.map(col => ({
    name: col.name,
    type: normalizeDataType(col.type, dbType),
    isPrimary: col.isPrimary,
    length: col.length,
    comment: col.comment,
    isUnique: col.isUnique,
    isNullable: col.isNullable,
    defaultValue: col.defaultValue
  }));

  return {
    id: `table-${parsedTable.name}-${Date.now()}`,
    name: parsedTable.name,
    type: "tableNode",
    position,
    data: {
      label: parsedTable.name,
      fields
    }
  };
}

/**
 * Ana converter fonksiyonu - SQL'i TableNode'a çevirir
 */
export function convertSQLToTableNode(
  sql: string, 
  dbType: DatabaseType = 'mysql',
  position: { x: number, y: number } = { x: 0, y: 0 }
): TableNode {
  try {
    const parsedTable = parseCreateTableSQL(sql, dbType);
    return convertToTableNode(parsedTable, dbType, position);
  } catch (error) {
    throw new Error(`SQL parse hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
  }
}

/**
 * Birden fazla SQL statement'ı parse eder
 */
export function convertMultipleSQLToTableNodes(
  sqlStatements: string[],
  dbType: DatabaseType = 'mysql',
  startPosition: { x: number, y: number } = { x: 0, y: 0 },
  spacing: { x: number, y: number } = { x: 300, y: 0 }
): TableNode[] {
  const tableNodes: TableNode[] = [];
  
  sqlStatements.forEach((sql, index) => {
    try {
      const position = {
        x: startPosition.x + (index * spacing.x),
        y: startPosition.y + (index * spacing.y)
      };
      
      const tableNode = convertSQLToTableNode(sql, dbType, position);
      tableNodes.push(tableNode);
    } catch (error) {
      console.error(`SQL ${index + 1} parse edilemedi:`, error);
    }
  });
  
  return tableNodes;
}

/**
 * Tek bir string içindeki birden fazla CREATE TABLE statement'ı ayırır
 */
export function splitSQLStatements(sqlText: string): string[] {
  // Basit bir yaklaşım - daha karmaşık durumlar için daha gelişmiş bir parser gerekebilir
  return sqlText
    .split(/CREATE\s+TABLE/i)
    .map(statement => statement.trim())
    .filter(statement => statement.length > 0)
    .map((statement, index) => {
      if (index === 0) return statement;
      return 'CREATE TABLE ' + statement;
    })
    .filter(statement => statement.startsWith('CREATE TABLE'));
} 