// app/api/getExtractedData/route.ts
import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory store (for demo purposes)
let latestData: any = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    latestData = body; // save posted data
    console.log("Received data:", latestData);
    return NextResponse.json({ message: "Data received" });
  } catch (err) {
    return NextResponse.json({ message: "Failed to receive data", error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(latestData); // Playwright can fetch this
}
