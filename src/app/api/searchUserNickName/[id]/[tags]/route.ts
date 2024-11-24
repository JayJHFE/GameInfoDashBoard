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

// 동적 경로를 처리하는 GET 핸들러
export async function GET(
  req: Request,
  { params }: { params: { id: string; tag: string } }
) {
  const { id, tag } = params;

  console.log("Received ID:", id, "Received Tag:", tag);

  if (!id || !tag) {
    return NextResponse.json(
      { error: "아이디와 태그를 모두 입력해주세요." },
      { status: 400 }
    );
  }

  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${id}/${tag}`;

  try {
    const data = await searchUserNickName(url, "GET");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API call:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Riot Games API" },
      { status: 500 }
    );
  }
}
