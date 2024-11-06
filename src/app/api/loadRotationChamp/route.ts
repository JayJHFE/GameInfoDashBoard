import { NextResponse } from "next/server";

export async function fetchRotationChamp(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) {
  const API_KEY = process.env.API_KEY; // 환경 변수에서 API 키 가져오기

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "X-Riot-Token": API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error(`Riot Games API responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data); // 데이터를 JSON으로 반환
  } catch (error) {
    console.error("Error fetching data from Riot Games API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Riot Games API" },
      { status: 500 }
    );
  }
}

// Next.js의 GET 핸들러로 설정
export const GET = async () => {
  const url = "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations";
  const data = await fetchRotationChamp(url, "GET");
  return NextResponse.json(data);
};
