// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { puuid: string } }
// ) {
//   const { puuid } = await params;

//   console.log("API Route hit");
//   console.log("Received PUUID:", puuid);

//   if (!puuid) {
//     return NextResponse.json({ error: "PUUID is missing" }, { status: 400 });
//   }

//   const url = `https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`;

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "X-Riot-Token": "RGAPI-d0ef7619-7f3f-4fae-a38b-68eff7631dff",
//       },
//     });

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       console.error(`Riot API Error: ${response.status} - ${errorMessage}`);
//       return NextResponse.json(
//         {
//           error: `Riot API responded with ${response.status}: ${errorMessage}`,
//         },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Unhandled Error:", error);
//     return NextResponse.json(
//       { error: (error as Error).message || "Unknown error occurred" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { puuid?: string } }
) {
  if (!params.puuid) {
    return NextResponse.json({ error: "PUUID is missing" }, { status: 400 });
  }

  const url = `https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${params.puuid}`;

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
