import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/lib/prisma";


//read
export async function GET() {
    console.log(prisma);
    
    try {
        const grouped = await prisma.memoryData.groupBy({
            by: ["score"],
            _count: {score: true}
        });

        const counts = Array(30).fill(0);
        
        for (const { score, _count } of grouped) {
        if (score >= 1 && score <= 25) {
            counts[score - 1] = _count.score;
        }
        }
        console.log("len: ", counts.length);
        console.log("data: ", counts);


        return NextResponse.json(counts);
    } catch(err) {
        console.error(err);
        return NextResponse.json({err: "Failed to get score data"}, {status: 500})
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newRow = await prisma.memoryData.create({
      data: { score: body.score ?? 0 },
    });
    return NextResponse.json(newRow);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to insert memory data" }, { status: 500 });
  }
}
