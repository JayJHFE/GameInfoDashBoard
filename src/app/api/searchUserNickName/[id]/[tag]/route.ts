import { NextResponse } from "next/server";

export async function searchUserNickName(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "X-Riot-Token": "RGAPI-d0ef7619-7f3f-4fae-a38b-68eff7631dff", // 환경 변수 사용
      },
    });

    if (!response.ok) {
      // 서버에서 받은 상태 코드와 에러 메시지 출력
      const errorMessage = await response.text(); // 서버 응답을 텍스트로 읽기
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      console.error(`Error Message from API: ${errorMessage}`);
      throw new Error(
        `Riot Games API responded with ${response.status}: ${errorMessage}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Riot Games API:", error);
    throw error; // 원본 에러를 그대로 전달
  }
}

export async function GET(
  req: Request,
  context: { params: { id: string; tag: string } }
) {
  const { id, tag } = await context.params;

  console.log("API Route hit");
  console.log("Received ID:", id, "Received Tag:", tag);

  if (!id || !tag) {
    return NextResponse.json(
      { error: "ID or Tag is missing" },
      { status: 400 }
    );
  }

  const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${id}/${tag}`;
  console.log("Constructed URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": "RGAPI-d0ef7619-7f3f-4fae-a38b-68eff7631dff", // 환경 변수 사용
      },
    });

    if (!response.ok) {
      // 서버 에러 메시지를 텍스트로 출력
      const errorMessage = await response.text();
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      console.error(`Error Message from API: ${errorMessage}`);
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
