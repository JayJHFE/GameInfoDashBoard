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
interface Champion {
  tags: Array<string>;
  id: string;
  info: {
    magic: number;
    [key: string]: number | string;
  };
  key: string;
  name: string;
  image: string;
}

interface ChampionData {
  [key: string]: Champion;
}

export default function ChampionTopLi({
  championRankData,
  championData,
}: {
  championRankData: ChampionInfo;
  championData: ChampionData;
}) {
  return <>{championRankData.championId == 0 && <div></div>}</>;
}
