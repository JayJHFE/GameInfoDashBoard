import { NextResponse } from "next/server";

export async function searchUser1(
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
    // return NextResponse.json(data);
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
  const data = await searchUser1(url, "GET");
  return NextResponse.json(data);
};




// ■ CHAMPION-MASTERY-V4

// : 검색할 유저 챔피언 숙련도 오름차순으로 반환


// ■ MATCH-V5

// : 특정 게임에 대한 모든 게임정보(게임 내용과 관련된 200가지 항목)들을 반환


// ■ SPECTATOR-V4

// : 해당 유저(검색 대상)가 진행중인 게임정보를 반환


// ■ SUMMONER-V4

// : 해당 유저(검색 대상)의 정보를 반환

// (Riot API를 쓰기 위해서는 account id, puuid 등이 필요한데 여기서 확인 가능)

// import { NextResponse } from "next/server";

// export async function fetchRiotAPI(
//   endpoint: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
// ) {
//   const baseURL = "https://kr.api.riotgames.com/lol";

//   try {
//     const response = await fetch(`${baseURL}/${endpoint}`, {
//       method,
//       headers: {
//         "X-Riot-Token": "RGAPI-d0ef7619-7f3f-4fae-a38b-68eff7631dff",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Riot Games API responded with ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data from Riot Games API:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch data from Riot Games API" },
//       { status: 500 }
//     );
//   }
// }

// // GET 핸들러로 분기 처리
// export const GET = async (request: Request) => {
//   const { searchParams } = new URL(request.url);
//   const apiType = searchParams.get("api"); // 쿼리 파라미터로 API 선택
//   const queryParam = searchParams.get("query"); // 추가적으로 필요한 값

//   if (!apiType) {
//     return NextResponse.json(
//       { error: "Query parameter 'api' is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     // 분기 처리로 API 호출
//     let data;

//     switch (apiType) {
//       case "champion-rotations":
//         data = await fetchRiotAPI("platform/v3/champion-rotations");
//         break;
//       case "summoner":
//         if (!queryParam) {
//           return NextResponse.json(
//             { error: "Query parameter 'query' is required for summoner API" },
//             { status: 400 }
//           );
//         }
//         data = await fetchRiotAPI(`summoner/v4/summoners/by-name/${queryParam}`);
//         break;
//       case "match":
//         if (!queryParam) {
//           return NextResponse.json(
//             { error: "Query parameter 'query' is required for match API" },
//             { status: 400 }
//           );
//         }
//         data = await fetchRiotAPI(`match/v5/matches/${queryParam}`);
//         break;
//       case "spectator":
//         if (!queryParam) {
//           return NextResponse.json(
//             { error: "Query parameter 'query' is required for spectator API" },
//             { status: 400 }
//           );
//         }
//         data = await fetchRiotAPI(`spectator/v4/active-games/by-summoner/${queryParam}`);
//         break;
//       default:
//         return NextResponse.json(
//           { error: `Unknown API type: ${apiType}` },
//           { status: 400 }
//         );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: `Failed to fetch data for API type: ${apiType}` },
//       { status: 500 }
//     );
//   }
// };
