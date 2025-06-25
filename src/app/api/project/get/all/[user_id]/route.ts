import { createClient } from "@/lib/supabase/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { user_id: string } }) {
    const { user_id } = await params
    const supabase = createClient()
    const { data, error } = await supabase.from('projects').select('*').eq('user_id', user_id)
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
}