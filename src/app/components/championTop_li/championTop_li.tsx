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
  return <>{championInfo.championId == 0 && <div></div>}</>;
}
