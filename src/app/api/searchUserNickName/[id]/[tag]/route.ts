import { NextResponse } from "next/server";

// 🔹 내부에서만 사용할 함수 (export 제거!)
async function searchUserNickName(
  url: string,
  method: "GET" | "POST" | "PUsT" | "DELETE" = "GET"
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "X-Riot-Token": String(process.env.API_KEY)!, // 환경 변수 사용
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      console.error(`Error Message from API: ${errorMessage}`);
      throw new Error(
        `Riot Games API responded with ${response.status}: ${errorMessage}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from Riot Games API:", error);
    throw error;
  }
}

// ✅ Next.js API Route에서 `GET` 핸들러만 export
export async function GET(
  req: Request,
  // context: { params: { id: string; tag: string } }
  { params }: { params: Promise<{ id: string; tag: string }> }
) {
  //   { params }: { params: Promise<{ puuid: string }> }
  // ) {
  //   const { puuid } = await params;
  const { id, tag } = await params;
  // const { id, tag } = context.params;

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
    const data = await searchUserNickName(url, "GET");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
