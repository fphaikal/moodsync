import { getSpotifyToken } from "@/utils/spotifyToken";
import { NextRequest, NextResponse } from "next/server";

// GET handler untuk API
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mood = searchParams.get("mood") || "happy";

  try {
    const token = await getSpotifyToken();

    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=30&seed_genres=${encodeURIComponent(mood)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch Spotify recommendations" },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Spotify recommendations", error: error },
      { status: 500 }
    );
  }
}
