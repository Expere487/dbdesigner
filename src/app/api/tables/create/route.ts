import { createClient } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { project_id, name, pos_x, pos_y, table_fields} = await request.json()
    console.log(project_id, name, pos_x, pos_y, table_fields)
    const supabase = createClient()
    
    // Önce tabloyu oluştur
    const { data: tableData, error: tableError } = await supabase
        .from('db_tables')
        .insert({
            project_id,
            name,
            pos_x,
            pos_y,
        })
        .select()
        .single()
    
    if (tableError) {
        return NextResponse.json({ error: tableError.message }, { status: 500 })
    }
    
    // Tablo ID'sini field'lara ekle
    const fieldsWithTableId = table_fields.map((field: any) => ({
        ...field,
        table_id: tableData.id
    }))
    
    // Field'ları ekle
    const { data: fieldsData, error: fieldsError } = await supabase
        .from('db_columns')
        .insert(fieldsWithTableId)
    
    if (fieldsError) {
        return NextResponse.json({ error: fieldsError.message }, { status: 500 })
    }
        
    return NextResponse.json({ 
        message: "Tablo başarıyla oluşturuldu", 
        table: tableData,
        fields: fieldsData 
    }, { status: 200 })
}