import { convertSQLToTableNode, convertMultipleSQLToTableNodes, splitSQLStatements } from './sql-converter';

// MySQL örnek SQL'leri
const mysqlExamples = {
  // Basit tablo
  users: `
    CREATE TABLE users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT TRUE
    )
  `,
  
  // Daha karmaşık tablo
  products: `
    CREATE TABLE products (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(200) NOT NULL COMMENT 'Ürün adı',
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      category_id INT,
      stock_quantity SMALLINT DEFAULT 0,
      created_at DATETIME DEFAULT NOW(),
      updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `
};

// PostgreSQL örnek SQL'leri
const postgresqlExamples = {
  // Basit tablo
  users: `
    CREATE TABLE users (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      email varchar(255) UNIQUE,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      is_active boolean DEFAULT true
    )
  `,
  
  // JSON ve UUID kullanan tablo
  orders: `
    CREATE TABLE orders (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id integer NOT NULL,
      order_data jsonb,
      total_amount numeric(12,2),
      status varchar(50) DEFAULT 'pending',
      created_at timestamp with time zone DEFAULT NOW()
    )
  `
};

/**
 * MySQL SQL'ini TableNode'a çeviren örnek fonksiyon
 */
export function convertMySQLExample() {
  try {
    const userTable = convertSQLToTableNode(
      mysqlExamples.users, 
      'mysql', 
      { x: 100, y: 100 }
    );
    
    const productTable = convertSQLToTableNode(
      mysqlExamples.products, 
      'mysql', 
      { x: 500, y: 100 }
    );
    
    console.log('MySQL Tabloları başarıyla çevrildi:');
    console.log('Users Tablosu:', userTable);
    console.log('Products Tablosu:', productTable);
    
    return [userTable, productTable];
  } catch (error) {
    console.error('MySQL çevirme hatası:', error);
    return [];
  }
}

/**
 * PostgreSQL SQL'ini TableNode'a çeviren örnek fonksiyon
 */
export function convertPostgreSQLExample() {
  try {
    const tableNodes = convertMultipleSQLToTableNodes(
      [postgresqlExamples.users, postgresqlExamples.orders],
      'postgresql',
      { x: 100, y: 300 },
      { x: 400, y: 0 }
    );
    
    console.log('PostgreSQL Tabloları başarıyla çevrildi:', tableNodes);
    return tableNodes;
  } catch (error) {
    console.error('PostgreSQL çevirme hatası:', error);
    return [];
  }
}

/**
 * Birden fazla SQL statement'ı tek seferde işleyen örnek
 */
export function convertMultipleSQLExample() {
  const multipleSQL = `
    CREATE TABLE categories (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      parent_id INT DEFAULT NULL
    );
    
    CREATE TABLE tags (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(50) UNIQUE NOT NULL,
      color VARCHAR(7) DEFAULT '#000000'
    );
  `;
  
  try {
    // SQL'leri ayır
    const sqlStatements = splitSQLStatements(multipleSQL);
    console.log('Bulunan SQL Statement\'ları:', sqlStatements.length);
    
    // Tabloları çevir
    const tableNodes = convertMultipleSQLToTableNodes(
      sqlStatements,
      'mysql',
      { x: 100, y: 500 },
      { x: 350, y: 0 }
    );
    
    console.log('Çevrilen tablolar:', tableNodes);
    return tableNodes;
  } catch (error) {
    console.error('Çoklu SQL çevirme hatası:', error);
    return [];
  }
}

/**
 * Tüm örnekleri çalıştıran ana fonksiyon
 */
export function runAllExamples() {
  console.log('=== SQL Converter Örnekleri ===\n');
  
  console.log('1. MySQL Örnekleri:');
  const mysqlTables = convertMySQLExample();
  
  console.log('\n2. PostgreSQL Örnekleri:');
  const postgresqlTables = convertPostgreSQLExample();
  
  console.log('\n3. Çoklu SQL Örneği:');
  const multipleTables = convertMultipleSQLExample();
  
  const allTables = [...mysqlTables, ...postgresqlTables, ...multipleTables];
  console.log(`\nToplam ${allTables.length} tablo başarıyla çevrildi.`);
  
  return allTables;
} 