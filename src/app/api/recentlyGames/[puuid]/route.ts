import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { puuid: string } }
) {
  const { puuid } = await params;

  console.log("API Route hit");
  console.log("Received PUUID:", puuid);

  if (!puuid) {
    return NextResponse.json({ error: "PUUID is missing" }, { status: 400 });
  }

  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": "RGAPI-d0ef7619-7f3f-4fae-a38b-68eff7631dff",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Riot API Error: ${response.status} - ${errorMessage}`);
      return NextResponse.json(
        {
          error: `Riot API responded with ${response.status}: ${errorMessage}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
