import { getSpotifyToken } from "@/utils/spotifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {
  if (req.method !== "GET") {
    return NextResponse.json({ message: "Method not allowed" });
  }

  try {
    const token = await getSpotifyToken();
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to refresh Spotify token", error }, { status: 500 });
  }
}
