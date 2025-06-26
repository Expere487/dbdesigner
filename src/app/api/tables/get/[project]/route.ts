import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET(request: NextRequest, { params }: { params: { project: string } }) {
    const { project } = await params
    const supabase = createClient()
    const { data: tables, error } = await supabase.from('db_tables').select('*').eq('project_id', project)
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const { data: fields, error: fieldsError } = await supabase.from('db_columns').select('*').in('table_id', tables.map((table: any) => table.id))
    if (fieldsError) {
        return NextResponse.json({ error: fieldsError.message }, { status: 500 })
    }
    const tablesWithFields = tables.map((table: any) => ({
        ...table,
        fields: fields.filter((field: any) => field.table_id === table.id)
    }))
    return NextResponse.json(tablesWithFields)
}   