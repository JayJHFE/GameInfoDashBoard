"use client";
import { useEffect, useState } from "react";
import ChampionTopLi from "../components/championTop_li/championTop_li";

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
      console.log("Active Game Data:", activeGameData);
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
      {/* <img src="/summonerValleyminimap.jpg" alt="champion" /> */}
    </div>
  );
}
