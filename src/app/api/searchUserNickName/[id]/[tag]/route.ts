import { NextResponse } from "next/server";

export async function searchUserNickName(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "X-Riot-Token": "RGAPI-d0ef7619-7f3f-4fae-a38b-68eff7631dff",
      },
    });

    if (!response.ok) {
      throw new Error(`Riot Games API responded with ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Riot Games API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Riot Games API" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: { id: string; tag: string } }
) {
  const { id, tag } = context.params;

  console.log("API Route hit");
  console.log("Received ID:", id, "Received Tag:", tag);

  if (!id || !tag) {
    return NextResponse.json(
      { error: "ID or Tag is missing" },
      { status: 400 }
    );
  }

  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${id}/${tag}`;
  console.log("오찌도찌", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": "RGAPI-<your-api-key>",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Riot Games API responded with status ${response.status}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Riot Games API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Riot Games API" },
      { status: 500 }
    );
  }
}
