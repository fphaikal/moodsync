import client from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return NextResponse.json({ message: "Method not allowed" });
  }

  const clientConn = await client;
  const db = clientConn.db("stats");

  const moodCollection = await db.collection("byMood").find({}).toArray();

  return NextResponse.json({ moodCollection });
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" });
  }
  
  try {
    const { mood } = await req.json();

    if(!mood) {
      return NextResponse.json({ message: "Mood is required" }, { status: 400 });
    }

    const clientConn = await client;
    const db = clientConn.db("stats");

    const result = await db.collection("byMood").updateOne(
      { name: mood },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    return NextResponse.json({ message: "Mood added", result });
  } catch (error) {
    return NextResponse.json({ message: "Failed to count", error: error }, { status: 500 });
  }

}
