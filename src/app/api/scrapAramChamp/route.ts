import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// 예외 처리 목록 설정
const exceptions: { [key: string]: string } = {
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
function formatChampionName(name: string) {
  return (
    exceptions[name] ||
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  );
}

async function scrapAramChamp() {
  try {
    const { data } = await axios.get("https://op.gg/ko/lol/modes/aram");
    const $ = cheerio.load(data);

    const championTiers: { name: string; tier: string }[] = [];

    $("tbody tr").each((index, element) => {
      let name = $(element)
        .find("td>a>img")
        .attr("alt")
        ?.trim()
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase();

      name = name ? formatChampionName(name) : undefined;
      const tier = $(element).find("td:nth-child(3)").text()?.trim();

      if (name) {
        championTiers.push({ name, tier: tier || "1" });
      }
    });

    return championTiers;
  } catch (error) {
    console.error("Error fetching champion tiers:", error);
    return null;
  }
}

// ✅ Next.js API Route에서 `GET` 핸들러만 export
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
