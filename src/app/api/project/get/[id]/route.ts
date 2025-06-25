import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params
    const supabase = await createClient()
    const { data, error } = await supabase.from('projects').select('*').eq('id', id)
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data[0])
}   