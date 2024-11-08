// // pages/api/fetchChampionTiers.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import cheerio from "cheerio";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { data } = await axios.get("https://poro.gg/champions?gameMode=aram&format=stats");
//     const $ = cheerio.load(data);
//     console.log(data);

//     // 필요한 데이터 파싱 예시 (DOM 구조에 맞춰 수정)
//     const championTiers = <any>[];
//     $("tbody tr td a div").each((_, element) => {
//       const name = $(element).find(".champion-name").text();
//       const tier = $(element).find(".champion-tier").text();
//       championTiers.push({ name, tier });
//     });

//     res.status(200).json(championTiers);
//   } catch (error) {
//     console.error("Error fetching champion tiers:", error);
//     res.status(500).json({ error: "Failed to fetch champion tiers" });
//   }
// }

// pages/api/fetchChampionTiers.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import cheerio from "cheerio";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // poro.gg의 ARAM 티어 페이지에서 HTML 데이터 가져오기
//     const { data } = await axios.get("https://poro.gg/game-mode/aram");
//     const $ = cheerio.load(data);

//     // 챔피언 티어 정보를 저장할 배열
//     const championTiers = <any>[];

//     // tbody 내의 모든 tr 요소를 순회하면서 필요한 데이터 추출
//     $("tbody tr").each((_, element) => {
//       // 각 tr 내의 td > a > div 경로로 접근하여 aria-label 속성 값 추출

//       // 챔피언 이름 추출
//       const name = $(element).find("td a div").attr("aria-label")?.trim();
//       // 챔피언 티어 추출
//       const tier = $(element).find("td image").attr("alt")?.trim();

//       // 데이터가 있는 경우 배열에 추가
//       if (name && tier) {
//         championTiers.push({ name, tier });
//       }
//     });

//     res.status(200).json(championTiers);
//   } catch (error) {
//     console.error("Error fetching champion tiers:", error);
//     res.status(500).json({ error: "Failed to fetch champion tiers" });
//   }
// }



// pages/api/fetchAramChampionTier.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";
// import cheerio from "cheerio";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // const { data } = await axios.get("https://poro.gg/game-mode/aram");
//     const { data } = await axios.get("https://poro.gg/champions?gameMode=aram&format=stats");
//     const $ = cheerio.load(data);

//     const championTiers = <any>[];

//     $("tbody tr").each((_, element) => {
//       const name = $(element).find("td a div").attr("aria-label")?.trim();
//       const tier = $(element).find("td image").attr("alt")?.trim();

//       if (name && tier) {
//         championTiers.push({ name, tier });
//       }
//     });
//     console.log(championTiers);
//     res.status(200).json(championTiers);
//   } catch (error) {
//     console.error("Error fetching champion tiers:", error);
//     res.status(500).json({ error: "Failed to fetch champion tiers" });
//   }
// }


// pages/api/fetchAramChampionTier/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapAramChamp() {
  try {
    const { data } = await axios.get("https://www.op.gg/modes/aram");
    const $ = cheerio.load(data);

    const championTiers = <any>[];

    $("tbody tr").each((_, element) => {
      // console.log(element,"1");
      // name에 기호나 공백이 있으면 제거

      const name = $(element).find("td>a>img").attr("alt")?.trim().replace(/[^a-zA-Z]/g, "").toLowerCase().replace(/^./, (char) => char.toUpperCase());
      const tier = $(element).find("td:nth-child(3)").text()?.trim(); // 'img'로 수정하여 이미지의 'alt' 속성 사용

      if (name && tier) {
        championTiers.push({ name, tier });
      }
    });
    return championTiers;
  } catch (error) {
    console.error("Error fetching champion tiers:", error);
    return NextResponse.json({ error: "Failed to fetch champion tiers" }, { status: 500 });
  }
}

export async function GET() {
  const championTiers = await scrapAramChamp();
  if (championTiers) {
    return NextResponse.json(championTiers);
  } else {
    return NextResponse.json({ error: "Failed to fetch champion tiers" }, { status: 500 });
  }
}

// app/api/fetchAramChampionTier/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   console.log("API 라우트 호출됨");  // 호출 여부 확인용 로그

//   // 테스트용 응답
//   return NextResponse.json({ message: "API 라우트가 정상적으로 연결되었습니다." });
// }

// app/api/fetchAramChampionTier/route.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//   return NextResponse.json({ message: "fetchAramChampionTier 라우트가 정상적으로 연결되었습니다." });
// }
