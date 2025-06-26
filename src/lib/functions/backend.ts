"use server"
import { Project, Field, TableNode } from "@/types/types"

export const getUserProjects = async (user_id: string) => {
    const projects = await fetch(`${process.env.API_URL}/project/get/all/${user_id}`)
    const projectsData = await projects.json()
    return projectsData as Project[]
}

export const getProject = async (project_id: string) => {
    const project = await fetch(`${process.env.API_URL}/project/get/${project_id}`)
    const projectData = await project.json()
    return projectData
}

export const createTable = async (project_id: string, name: string, pos_x: number, pos_y: number, fields: Field[]) => {
    try {
        // Tablo için gerekli field verilerini API formatına dönüştür
        const table_fields = fields.map(field => ({
            name: field.name,
            data_type: field.type,
            length: field.length || null,
            is_primary_key: field.isPrimary || false,
            is_nullable: field.isNullable !== false, // Varsayılan true
            is_unique: field.isUnique || false,
            default_value: field.defaultValue || null,
            comment: field.comment || null
        }));

        const response = await fetch(`${process.env.API_URL}/tables/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                project_id,
                name,
                pos_x,
                pos_y,
                table_fields
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Tablo oluşturma hatası:', error);
        throw error;
    }
}

// Veritabanından gelen table ve field verilerini TableNode formatına convert eden fonksiyon
const convertDbTableToTableNode = (dbTable: any): TableNode => {
    // Field'ları convert et
    const convertedFields = dbTable.fields.map((field: any) => ({
        name: field.name,
        type: field.data_type.toLowerCase(), // Veri tipini küçük harfe çevir
        isPrimary: field.is_primary_key || false,
        length: field.length || undefined,
        comment: field.comment || undefined,
        isForeign: false, // Şimdilik false, foreign key mantığı eklenebilir
        isUnique: field.is_unique || false,
        isNullable: field.is_nullable !== false, // Varsayılan true
        defaultValue: field.default_value || undefined,
    }));

    // TableNode formatına dönüştür
    return {
        id: dbTable.id,
        type: "tableNode",
        position: {
            x: dbTable.pos_x || 0,
            y: dbTable.pos_y || 0
        },
        data: {
            label: dbTable.name,
            fields: convertedFields
        }
    };
};

export const getTables = async (project_id: string) => {
    const tables = await fetch(`${process.env.API_URL}/tables/get/${project_id}`)
    const tablesData = await tables.json()
    
    // Her tabloyu TableNode formatına convert et
    const convertedTables = tablesData.map((table: any) => convertDbTableToTableNode(table));
    
    return convertedTables as TableNode[];
}
