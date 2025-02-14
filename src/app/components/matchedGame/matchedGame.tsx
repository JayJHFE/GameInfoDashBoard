import { useEffect, useState } from "react";

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
  win: boolean;
}
interface MatchedGameProps {
  gameData: {
    info: InfoData;
    metatdata: { [key: string]: string | number | object };
  };
  puuidSearched: string;
}
interface ItemData {
  type: string;
  version: string;
  basic: object;
  data: {
    [key: number]: {
      name: string;
    };
  };
}
// totalDamageDealtToChampions
export default function MatchedGame({
  gameData,
  puuidSearched,
}: MatchedGameProps) {
  console.log(gameData);
  console.log(puuidSearched);
  const [allItems, setAllItems] = useState<ItemData>({
    type: "",
    version: "",
    basic: {},
    data: {},
  });
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const ItemResponse = await fetch("/LeagueofLegendData/item.json");
        const itemDatajson: { data: ItemData } = await ItemResponse.json();
        setAllItems(itemDatajson.data);
      } catch (error) {
        console.error("아이템 데이터를 불러오는 중 오류 발생:", error);
      }
    };
  
    fetchItems(); 
  }, []);
  

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
                    : "#31313c"
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
              
              {/* 아이템 정보 출력 */}
              <div style={{ display: "flex", gap: "5px", marginLeft: "10px" }}>
                {[participants.item0, participants.item1, participants.item2, participants.item3, participants.item4, participants.item5, participants.item6]
                  .filter((itemId) => typeof itemId === "number" && itemId !== 0) // 🔹 숫자만 필터링
                  .map((itemId, index) => {
                    const itemKey = Number(itemId); // 🔹 숫자로 변환
                    console.log(`Item ${index}:`, itemKey, "Data:", allItems?.data?.[itemKey].name);
                    return (
                      <div key={index}>
                        {allItems?.data?.[itemKey] ? ( // 🔹 변환된 숫자 키로 접근
                          <div>
                            <img
                              // src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/item/${itemKey}.png`}
                              src={`https://ddragon.leagueoflegends.com/cdn/15.3.1/img/item/${itemKey}.png`}
                              alt={allItems.data[itemKey].name}
                              style={{ width: "40px", height: "40px", borderRadius: "5px" }}
                            />
                            <p style={{ fontSize: "12px", textAlign: "center" }}>{allItems.data[itemKey].name}</p>
                          </div>
                        ) : (
                          <div style={{ width: "40px", height: "40px", backgroundColor: "#444", borderRadius: "5px" }} />
                        )}
                      </div>
                    );
                  })}
              </div>



              {participants.win == true ? (
                <img
                  src="/realVictory.png"
                  style={{ width: "100px", marginLeft: "30vw" }}
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}
