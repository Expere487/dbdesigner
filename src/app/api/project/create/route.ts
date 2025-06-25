import { createClient } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, description, databaseType,user_id} = await request.json()
    console.log(name, description, databaseType,user_id)
    const supabase = createClient()
    const { data, error } = await supabase.from('projects').insert({
        name,
        description,
        db_type: databaseType,
        user_id
    })
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ message: "Project created", project: data }, { status: 200 })
}