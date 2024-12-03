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

interface ChampionTopLiProps {
  championRankData: ChampionInfo;
  championData: Champion;
}

// interface ChampionData {
//   [key: string]: Champion;
// }

export default function ChampionTopLi({
  championRankData,
  championData,
}: ChampionTopLiProps) {
  console.log("championRankData:", championRankData);
  console.log("championData:", championData);
  return (
    <>
      <div>
        <div style={{ borderRadius: "50%", backgroundColor: "white" }}>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${championData?.id}.png`}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </div>
    </>
  );
}