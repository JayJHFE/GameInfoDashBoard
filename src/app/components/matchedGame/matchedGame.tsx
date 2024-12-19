interface Participant {
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  champLevel: number;
  totalDamageDealtToChampions: number;
  puuid: string;
  [key: string]: string | number | boolean | object;
}
interface InfoData {
  endOfGameResult: string;
  gameMode: string;
  gameDuration: number;
  gameId: number;
  participants: Participant[];
}
interface MatchedGameProps {
  gameData: {
    info: InfoData;
    metatdata: { [key: string]: string | number | object };
  };
  puuidSearched: string;
}
// totalDamageDealtToChampions
export default function MatchedGame({
  gameData,
  puuidSearched,
}: MatchedGameProps) {
  console.log(gameData);
  console.log(puuidSearched);
  const currentUser = gameData.info.participants.find(
    (participant) => participant.puuid === puuidSearched
  );

  // 참가자가 없으면 아무것도 렌더링하지 않음
  if (!currentUser) {
    return <div>참가자를 찾을 수 없습니다.</div>;
  }

  // `teamId`가 일치하는 참가자들 필터링
  const teamParticipants = gameData.info.participants.filter(
    (participant) => participant.teamId === currentUser.teamId
  );

  // 팀원들을 `totalDamageDealtToChampions` 기준으로 정렬
  const sortedTeamParticipants = [...teamParticipants].sort(
    (a, b) => b.totalDamageDealtToChampions - a.totalDamageDealtToChampions
  );

  // `puuidSearched`와 일치하는 참가자의 순위 찾기
  const currentUserRank =
    sortedTeamParticipants.findIndex(
      (participant) => participant.puuid === puuidSearched
    ) + 1;
  return (
    <div>
      {gameData.info.participants.map((participants, index) => (
        <div key={index}>
          {puuidSearched === participants.puuid ? (
            <>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${participants?.championName}.png`}
                alt={participants.championName}
              />
              <div>
                {participants.kills}/{participants.deaths}/
                {participants.assists}
              </div>
              <div>{participants.champLevel}</div>
              <div>{currentUserRank}</div>
            </>
          ) : (
            ""
          )}
        </div>
      ))}
      <h1>Matched Game</h1>
    </div>
  );
}
