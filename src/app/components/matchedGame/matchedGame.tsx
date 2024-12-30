interface Participant {
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  champLevel: number;
  totalDamageDealtToChampions: number;
  puuid: string;
  lane: string;
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

  const displayRoleOrLane = (participant: Participant) => {
    if (participant.individualPosition === "TOP") return "탑";
    if (participant.individualPosition === "JUNGLE") return "정글";
    if (participant.individualPosition === "MIDDLE") return "미드";
    if (participant.individualPosition === "BOTTOM") return "원딜";
    if (participant.individualPosition === "UTILITY") return "서포터";
  };
  const gameModeCheck = (gameInfo: InfoData) => {
    if (gameInfo.gameMode === "CLASSIC") return "소환사의 협곡";
    if (gameInfo.gameMode === "ARAM") return "칼바람 나락";
  };

  return (
    <div>
      {gameData.info.participants.map((participants) => (
        <>
          {puuidSearched === participants.puuid ? (
            <div
              key={participants.puuid}
              style={{
                display: "flex",
                padding: "2px 10px 2px 10px",
                marginTop: "10px",
                width: "60vw",
                borderRadius: "10px",
                backgroundColor: `${
                  gameModeCheck(gameData.info) == "소환사의 협곡"
                    ? "green"
                    : "blue"
                }`,
              }}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${participants?.championName}.png`}
                alt={participants.championName}
                style={{ borderRadius: "50%" }}
              />
              <div
                style={{
                  marginLeft: "10px",
                  paddingTop: `${
                    gameModeCheck(gameData.info) == "소환사의 협곡"
                      ? "5px"
                      : "15px"
                  }`,
                }}
              >
                <div>게임 유형: {gameModeCheck(gameData.info)}</div>
                <div>
                  KDA: {participants.kills}/{participants.deaths}/
                  {participants.assists}
                </div>
                <div>레벨: {participants.champLevel}</div>
                <div>딜량: {currentUserRank}등</div>

                {gameModeCheck(gameData.info) == "소환사의 협곡" ? (
                  <div>포지션: {displayRoleOrLane(participants)}</div>
                ) : (
                  ""
                )}
              </div>
              <img src="/realVictory.png" style={{ width: "100px" }} />
            </div>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}
