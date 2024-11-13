// import { NextResponse } from "next/server";
// import axios from "axios";
// import * as cheerio from "cheerio";

// export async function scrapAramChamp() {
//   try {
//     const { data } = await axios.get("https://www.op.gg/modes/aram");
//     const $ = cheerio.load(data);

//     const championTiers = <any>[];

//     $("tbody tr").each((_, element) => {
//       // console.log(element,"1");
//       // name에 기호나 공백이 있으면 제거

//       const name = $(element)
//         .find("td>a>img")
//         .attr("alt")
//         ?.trim()
//         .replace(/[^a-zA-Z]/g, "")
//         .toLowerCase()
//         .replace(/^./, (char) => char.toUpperCase());
//       const tier = $(element).find("td:nth-child(3)").text()?.trim(); // 'img'로 수정하여 이미지의 'alt' 속성 사용

//       if (name && tier) {
//         championTiers.push({ name, tier });
//       }
//     });
//     return championTiers;
//   } catch (error) {
//     console.error("Error fetching champion tiers:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch champion tiers" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   const championTiers = await scrapAramChamp();
//   if (championTiers) {
//     return NextResponse.json(championTiers);
//   } else {
//     return NextResponse.json(
//       { error: "Failed to fetch champion tiers" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// 예외 처리 목록 설정
const exceptions = {
  Wukong: "MonkeyKing",
  Drmundo: "DrMundo",
  Twistedfate: "TwistedFate",
  Tahmkench: "TahmKench",
  Xinzhao: "XinZhao",
  Kogmaw: "KogMaw",
  Reksai: "RekSai",
  Jarvaniv: "JarvanIV",
  Leesin: "LeeSin",
  Renataglasc: "Renata",
  Ksante: "KSante",
  Masteryi: "MasterYi",
  Missfortune: "MissFortune",
  Nunuwillump: "Nunu",
  Aurelionsol: "AurelionSol",
};

// 챔피언 이름 형식화 함수
function formatChampionName(name) {
  // 예외 목록에 있는 이름이면 예외 처리된 값 반환
  if (exceptions.hasOwnProperty(name)) {
    return exceptions[name];
  }
  // 일반적인 경우: 첫 글자 대문자 처리
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export async function scrapAramChamp() {
  try {
    const { data } = await axios.get("https://www.op.gg/modes/aram");
    const $ = cheerio.load(data);

    const championTiers = <any>[];

    $("tbody tr").each((_, element) => {
      // 이미지 alt 속성에서 챔피언 이름 추출 후 기호나 공백 제거 및 형식화
      let name = $(element)
        .find("td>a>img")
        .attr("alt")
        ?.trim()
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase();

      // 예외 규칙 또는 일반 규칙을 통해 이름을 형식화
      name = name ? formatChampionName(name) : null;

      const tier = $(element).find("td:nth-child(3)").text()?.trim();

      if (name && tier) {
        championTiers.push({ name, tier });
      }
    });

    return championTiers;
  } catch (error) {
    console.error("Error fetching champion tiers:", error);
    return NextResponse.json(
      { error: "Failed to fetch champion tiers" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const championTiers = await scrapAramChamp();
  if (championTiers) {
    return NextResponse.json(championTiers);
  } else {
    return NextResponse.json(
      { error: "Failed to fetch champion tiers" },
      { status: 500 }
    );
  }
}
