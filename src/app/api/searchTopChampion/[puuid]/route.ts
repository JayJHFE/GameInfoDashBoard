import { NextResponse } from "next/server";

// const API_KEY: string = process.env.API_KEY || "";

// console.log("API_KEY in API Handler:", API_KEY);

export async function GET(
  req: Request,
  // { params }: { params: { puuid: string } }
  { params }: { params: Promise<{ puuid: string }> }
) {
  const { puuid } = await params;

  // console.log("API Route hit");
  // console.log("Received PUUID:", puuid);

  if (!puuid) {
    return NextResponse.json({ error: "PUUID is missing" }, { status: 400 });
  }

  const url = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3`;

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
