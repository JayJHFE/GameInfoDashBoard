import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  // { params }: { params: { matchId: string } }
  { params }: { params: Promise<{ matchId: string }> }
) {
  const { matchId } = await params;

  // console.log("Params received:", params);

  // console.log("API Route hit");
  // console.log("Received PUUID:", matchId);

  if (!matchId) {
    return NextResponse.json({ error: "PUUID is missing" }, { status: 400 });
  }
  const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": String(process.env.API_KEY)!,
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
