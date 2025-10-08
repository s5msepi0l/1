import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/lib/prisma";


//read
export async function GET() {
    console.log(prisma);
    const rows = await prisma.test.findMany();
    return NextResponse.json(rows);
}

//write
export async function POST(req: Request) {
    const body = await req.json();
    const newRow = await prisma.test.create({
        data: { message: (body.hasOwnProperty("message")) ? body.message : "Sample message" }
    });
    return NextResponse.json(newRow);

}