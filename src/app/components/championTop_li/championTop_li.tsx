import { useEffect, useState } from "react";

interface ChampionInfo {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  championSeasonMilestone: number;
  lastPlayTime: number;
  markRequiredForNextLevel: number;
  milestoneGrades: string[];
  nextSeasonMilestone: object;
  puuid: string;
  tokensEarned: unknown; // 정확한 타입을 알아야 수정 가능
}

export default function ChampionTopLi({
  championInfo,
}: {
  championInfo: ChampionInfo;
}) {
  const [data, setData] = useState<ChampionInfo | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/loadRotationChamp");
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log(data, "오찌도찌");
  }, [data]);
  return <>{championInfo.championId == 0 && <div></div>}</>;
}
