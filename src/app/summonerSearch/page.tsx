"use client";
import { useEffect, useState } from "react";
import ChampionTopLi from "../components/championTop_li/championTop_li";
import MatchedGame from "../components/matchedGame/matchedGame";
import styles from "./page.module.css";

interface Champion {
  tags: Array<string>;
  id: string;
  info: {
    magic: number;
    attack: number;
    defense: number;
  };
  key: string;
  name: string;
  image: string;
}

interface ChampionData {
  [key: string]: Champion;
}

interface TeamMember {
  riotId: string;
  puuid: string;
  championId: number;
  teamId: number;
}

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
  tokensEarned: unknown;
}

interface Participant {
  [key: string]: string | number | boolean | object;
}

// interface InfoData {
//   gameMode: string;
//   gameDuration: number;
//   participants: Participants;
// }
interface InfoData {
  endOfGameResult: string;
  gameMode: string;
  gameDuration: number;
  gameId: number;
  participants: Participant[];
}
interface GameData {
  info: InfoData;
  metatdata: { [key: string]: string | number | object };
}

export default function SummonerSearch() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [, setResult] = useState(null);
  const [userChampionTier, setUserChampionTier] = useState<ChampionInfo[]>([]);
  const [allChampionData, setAllChampionData] = useState<any>(null);
  const [matchedChampion, setMatchedChampion] = useState<Champion[] | null>(
    null
  );
  const [puuidSearched, setPuuidSearched] = useState<string>("");
  const [championWithRank, setChampionWithRank] = useState<
    { champion: Champion; rankData: ChampionInfo | null }[]
  >([]);
  const [activeGame, setActiveGame] = useState<object | null>(null);
  const [matchedGame, setMatchedGame] = useState<GameData[]>([]);
  const [blueTeamImages, setBlueTeamImages] = useState<
    {
      puuid: string;
      id: string;
      imageUrl: string;
      position: { top: string; left: string };
    }[]
  >([]);

  const [redTeamImages, setRedTeamImages] = useState<
    {
      puuid: string;
      id: string;
      imageUrl: string;
      position: { top: string; left: string };
    }[]
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError("");
  };

  // 소환사 검색 함수
  const handleSearch = async () => {
    const regex = /^[^\s#]+#[^\s].+$/;

    if (!regex.test(inputValue)) {
      setError("아이디와 태그는 '아이디 #태그' 형식으로 입력해주세요.");
      return;
    }

    const [id, tag] = inputValue.split("#");

    let formattedTag = tag;

    if (/^[가-힣]{2}$/.test(tag)) {
      formattedTag = `${tag[0]} ${tag[1]}`;
    }

    try {
      const requestUrl = `/api/searchUserNickName/${id}/${formattedTag}`;
      const response = await fetch(requestUrl, { method: "GET" });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      const { puuid } = data;
      setPuuidSearched(puuid);

      if (!puuid) {
        throw new Error("puuid not found in the response.");
      }

      const secondRequestUrl = `/api/searchTopChampion/${puuid}`;
      const secondResponse = await fetch(secondRequestUrl, { method: "GET" });

      const userChampionTierData = await secondResponse.json();
      setUserChampionTier(userChampionTierData);

      if (!secondResponse.ok) {
        throw new Error(
          `Second API responded with status ${secondResponse.status}`
        );
      }

      if (allChampionData && userChampionTierData.length > 0) {
        const matchedChampionIds = userChampionTierData.map(
          (item: ChampionInfo) => item.championId.toString()
        );

        const matched = (Object.values(allChampionData) as Champion[]).filter(
          (champion) => matchedChampionIds.includes(champion.key)
        );

        setMatchedChampion(matched.length > 0 ? matched : null);
      }
    } catch (error) {
      console.error("Error fetching summoner data:", error);
      setError("소환사 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  // 진행중인게임 함수
  const searchActiveGame = async () => {
    try {
      const activeGameRequestUrl = `/api/activeGame/${puuidSearched}`;
      const activeGameResponse = await fetch(activeGameRequestUrl, {
        method: "GET",
      });

      if (!activeGameResponse.ok) {
        throw new Error(
          `Active Game API responded with status ${activeGameResponse.status}`
        );
      }

      const activeGameData = await activeGameResponse.json();
      setActiveGame(activeGameData);
      const blueTeam: TeamMember[] = [];
      const redTeam: TeamMember[] = [];

      activeGameData.participants.forEach((participant: Participant) => {
        const riotId = participant.riotId as string;
        const puuid = participant.puuid as string;
        const championId = participant.championId as number;
        const teamId = participant.teamId as number;

        // 팀별로 분리
        if (participant.teamId === 100) {
          blueTeam.push({ riotId, puuid, championId, teamId });
        } else if (participant.teamId === 200) {
          redTeam.push({ riotId, puuid, championId, teamId });
        }
      });
      const bluePositions = [
        { top: "38.7%", left: "10%" },
        { top: "48%", left: "9%" },
        { top: "58%", left: "8%" },
        { top: "66%", left: "10%" },
        { top: "70%", left: "13.2%" },
      ];
      const redPositions = [
        { top: "4%", left: "30%" },
        { top: "7%", left: "33.1%" },
        { top: "14.5%", left: "35.3%" },
        { top: "24%", left: "36%" },
        { top: "33%", left: "35%" },
      ];

      const mapTeamImages = (team: TeamMember[]) =>
        team
          .map((participant, idx) => {
            const champion = Object.values(allChampionData as Champion[]).find(
              (champ) => champ.key === participant.championId.toString()
            );
            return {
              puuid: participant.puuid,
              id: champion?.id, // 챔피언 id
              imageUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion?.id}_0.jpg`, // 이미지 URL 생성
              position:
                participant.teamId == 100
                  ? bluePositions[idx]
                  : redPositions[idx],
            };
          })
          .filter((champion) => champion.id !== undefined) as {
          puuid: string;
          id: string;
          imageUrl: string;
          position: { top: string; left: string };
        }[];

      setBlueTeamImages(
        mapTeamImages(blueTeam).filter((champion) => champion.id !== undefined)
      );
      setRedTeamImages(
        mapTeamImages(redTeam).filter((champion) => champion.id !== undefined)
      );
    } catch (error) {
      console.error("Error fetching active game data:", error);
    }
  };

  // 최근전적조회 함수
  const searchRecentGame = async () => {
    try {
      const recentGameRequestUrl = `/api/recentlyGames/${puuidSearched}`;
      const recentGameResponse = await fetch(recentGameRequestUrl, {
        method: "GET",
      });

      if (!recentGameResponse.ok) {
        throw new Error(
          `Recent Game API responded with status ${recentGameResponse.status}`
        );
      }

      const recentGameData = await recentGameResponse.json();
      console.log("Recent Game Data:", recentGameData);

      // 5개의 값을 사용하여 추가 API 호출
      const additionalApiUrls = recentGameData.map(
        (item: string) => `/api/specificGame/${item}`
        // console.log("Generated URL:", url);
      );

      // 5개의 API 호출을 병렬 처리
      const additionalApiResponses = await Promise.all(
        additionalApiUrls.map((url: string) =>
          fetch(url, { method: "GET" }).then((res) => {
            if (!res.ok) {
              throw new Error(`API call failed with status ${res.status}`);
            }
            return res.json(); // JSON 데이터 파싱
          })
        )
      );
      setMatchedGame(additionalApiResponses);
      console.log("Recent Game Data:", additionalApiResponses);
    } catch (error) {
      console.error("Error fetching recent game data:", error);
    }
  };

  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const champResponse = await fetch("/LeagueofLegendData/champion.json");
        const championDatajson: { data: ChampionData } =
          await champResponse.json();
        const championData = championDatajson.data;
        setAllChampionData(championData);
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    };

    fetchJsonData();
  }, []);

  useEffect(() => {
    if (matchedChampion && userChampionTier) {
      const combinedData = matchedChampion.map((champion) => {
        const correspondingChampionInfo = userChampionTier.find(
          (tierchampion) => tierchampion.championId.toString() === champion.key
        );

        return {
          champion,
          rankData: correspondingChampionInfo || {
            championId: parseInt(champion.key),
            championLevel: 0,
            championPoints: 0,
            championPointsSinceLastLevel: 0,
            championPointsUntilNextLevel: 0,
            championSeasonMilestone: 0,
            lastPlayTime: 0,
            markRequiredForNextLevel: 0,
            milestoneGrades: [],
            nextSeasonMilestone: {},
            puuid: "",
            tokensEarned: null,
          },
        };
      });

      setChampionWithRank(combinedData);
    }
  }, [matchedChampion, userChampionTier]);
  useEffect(() => {
    console.log("activeGame", activeGame);
  }, [activeGame]);
  useEffect(() => {
    console.log("allChampionData", allChampionData);
  }, [allChampionData]);
  // useEffect(() => {
  //   setIsAnimating(true); // 컴포넌트가 마운트될 때 애니메이션 활성화
  // }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true); // 애니메이션 시작
    }, 1000); // 초기 렌더링 후 300ms 대기
    return () => clearTimeout(timeout); // 타이머 클리어
  }, [blueTeamImages, redTeamImages]);

  return (
    <div>
      <h1>Summoner Search</h1>
      <div>
        <h2>아이디를 입력해주세요</h2>
        <input
          type="text"
          placeholder="아이디 #태그"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {championWithRank.map(({ champion, rankData }) => (
          <ChampionTopLi
            key={champion.key}
            championRankData={rankData!}
            championData={champion}
          />
        ))}
      </div>
      {championWithRank.length > 0 && (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button onClick={searchRecentGame}>최근 전적보기</button>
            <button onClick={searchActiveGame}>실시간 게임 확인</button>
          </div>
        </>
      )}
      {activeGame && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src="/summonerValleyminimap.jpg"
            style={{ width: "40vw" }}
            alt="champion"
          />
          {/* {blueTeamImages.map((champion, index) => (
            <img
              key={`blue-${index}`}
              src={champion.imageUrl}
              className={isAnimating ? `${styles.falling}` : ""}
              style={{
                position: "absolute",
                top: champion.position.top,
                left: champion.position.left,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid blue",
                zIndex: 10,
                animationDelay: `${index * 0.2}s`,
              }}
              alt={champion.id}
            />
          ))}
          {redTeamImages.map((champion, index) => (
            <img
              key={`red-${index}`}
              src={champion.imageUrl}
              className={isAnimating ? `${styles.falling}` : ""}
              style={{
                position: "absolute",
                top: champion.position.top,
                left: champion.position.left,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid red",
                zIndex: 10,
                animationDelay: `${index * 0.2}s`,
              }}
              alt={champion.id}
            />
          ))} */}
          {isAnimating
            ? blueTeamImages.map((champion, index) => {
                console.log(champion);
                const isCurrentUser = champion.puuid === puuidSearched; // 조건 추가

                return (
                  <img
                    key={`blue-${index}`}
                    src={champion.imageUrl}
                    className={isAnimating ? `${styles.falling}` : ""}
                    style={{
                      position: "absolute",
                      top: champion.position.top,
                      left: champion.position.left,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: isCurrentUser
                        ? "3px solid yellow"
                        : "2px solid blue", // 조건부 스타일
                      zIndex: 10,
                      animationDelay: `${index * 0.2}s`,
                    }}
                    alt={champion.id}
                  />
                );
              })
            : null}

          {isAnimating
            ? redTeamImages.map((champion, index) => {
                const isCurrentUser = champion.puuid === puuidSearched; // 조건 추가

                return (
                  <img
                    key={`red-${index}`}
                    src={champion.imageUrl}
                    className={isAnimating ? `${styles.falling}` : ""}
                    style={{
                      position: "absolute",
                      top: champion.position.top,
                      left: champion.position.left,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: isCurrentUser
                        ? "3px solid yellow"
                        : "2px solid red", // 조건부 스타일
                      zIndex: 10,
                      animationDelay: `${index * 0.2}s`,
                    }}
                    alt={champion.id}
                  />
                );
              })
            : null}
        </div>
      )}
      {matchedGame.length > 0 && (
        <>
          <h2>최근 게임 정보</h2>
          <div>
            {matchedGame.map((game) => (
              <MatchedGame key={game.info.gameId} gameData={game} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
