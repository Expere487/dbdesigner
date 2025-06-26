import type { Node, Edge } from "@xyflow/react";

export type MySqlDataTypes = {
    // Sayısal Tipler
    TINYINT: number | boolean; // TINYINT(1) genellikle boolean olarak kullanılır
    SMALLINT: number;
    MEDIUMINT: number;
    INT: number;
    INTEGER: number;
    BIGINT: bigint | number; // Büyük sayılar için bigint kullanmak daha güvenlidir
    FLOAT: number;
    DOUBLE: number;
    DECIMAL: string; // Hassasiyet kaybını önlemek için string olarak alınması önerilir
    NUMERIC: string; // DECIMAL ile aynı
    BIT: Buffer | number;

    // Metin Tipleri
    CHAR: string;
    VARCHAR: string;
    TINYTEXT: string;
    TEXT: string;
    MEDIUMTEXT: string;
    LONGTEXT: string;
    JSON: Record<string, any> | any[];

    // Tarih ve Zaman Tipleri
    DATE: Date | string;
    DATETIME: Date | string;
    TIMESTAMP: Date | string;
    TIME: string;
    YEAR: number;

    // İkili (Binary) Veri Tipleri
    BINARY: Buffer;
    VARBINARY: Buffer;
    TINYBLOB: Buffer;
    BLOB: Buffer;
    MEDIUMBLOB: Buffer;
    LONGBLOB: Buffer;

    // Diğer Tipler
    BOOLEAN: boolean; // TINYINT(1)'in takma adıdır
    ENUM: string; // Spesifik değerler için 'value1' | 'value2' gibi birleşim tipleri oluşturulabilir
    SET: string; // Virgülle ayrılmış bir string olarak gelir
};

export type PostgreSqlDataTypes = {
    // Sayısal Tipler
    smallint: number; // int2
    integer: number;  // int, int4
    bigint: bigint | number;   // int8
    smallserial: number; // serial2
    serial: number;      // serial4
    bigserial: bigint | number;  // serial8
    decimal: string;     // Hassasiyet kaybını önlemek için string
    numeric: string;     // Hassasiyet kaybını önlemek için string
    real: number;        // float4
    "double precision": number; // float8
    money: string;       // Genellikle string olarak işlenir

    // Metin Tipleri
    "character varying": string; // varchar
    varchar: string;
    character: string;           // char
    char: string;
    text: string;

    // Tarih ve Zaman Tipleri
    timestamp: Date | string;
    "timestamp with time zone": Date | string; // timestamptz
    "timestamp without time zone": Date | string;
    date: Date | string;
    time: string;
    "time with time zone": string; // timetz
    "time without time zone": string;
    interval: string; // Veya daha spesifik bir interval objesi

    // Boolean Tipi
    boolean: boolean; // bool

    // İkili (Binary) Veri Tipi
    bytea: Buffer;

    // JSON Tipleri
    json: Record<string, any> | any[];
    jsonb: Record<string, any> | any[];

    // Diğer Tipler
    uuid: string;
    inet: string;
    cidr: string;
    macaddr: string;

    // Geometrik Tipler (genellikle string veya özel obje olarak gelir)
    point: string | { x: number; y: number };
    line: string;
    lseg: string;
    box: string;
    path: string;
    polygon: string;
    circle: string;

    // Dizi (Array) Tipleri - Örnekler
    // Gerçek kullanımda 'any[]' veya daha spesifik tipler kullanılır.
    // Örneğin `text[]` -> `string[]`, `integer[]` -> `number[]`
    _text: string[];
    _int4: number[];
    _numeric: string[];
    _bool: boolean[];
};

export type Field = {
    name: string;
    type: keyof MySqlDataTypes | keyof PostgreSqlDataTypes;
    isPrimary?: boolean;
    length?: number;
    comment?: string;
    isForeign?: boolean;
    isUnique?: boolean;
    isNullable?: boolean;
    defaultValue?: string;
}

export interface TableNode extends Node {
    id: string;
    name?: string;
    type: "tableNode";
    position: { x: number, y: number };
    data: {
        label: string;
        fields: Field[];
    },
}

export type Project = {
    created_at: string;
    db_type: string;
    description: string;
    id: string;
    name: string;
    project_type: string;
    updated_at: string;
    user_id: string;
}

export type ProjectTables = {
    id: string;
    project_id: string;
    name: string;
    pos_x: number;
    pos_y: number;
    created_at: string;
}

export type ProjectTableFields = {
    id: string;
    table_id: string;
    name: string;
    data_type: string;
    length: number;
    nullable: boolean;
    is_primary: boolean;
    is_foreign: boolean;
    is_unique: boolean;
    is_nullable: boolean;
    default_value: string;
    comment?: string;
}
