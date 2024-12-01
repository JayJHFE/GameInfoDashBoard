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
  tokensEarned: unknown; // 정확한 타입을 알아야 수정 가능
}

export default function SummonerSearch() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [, setResult] = useState(null);
  const [userChampionTier, setUserChampionTier] = useState<ChampionInfo[]>([]);
  const [allChampionData, setAllChampionData] = useState<any>(null);
  const [matchedChampion, setMatchedChampion] = useState<Champion[] | null>(
    null
  ); // 일치하는 챔피언 데이터

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(""); // 오류 메시지를 초기화
  };

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

      // const { championId: fetchedId } = userChampionTierData;
      // console.log(userChampionTierData, "오찌기도지기");
      // if (allChampionData && fetchedId) {
      //   const matched = (Object.values(allChampionData) as Champion[]).find(
      //     (champion) => champion.key === fetchedId
      //   );
      //   if (matched) {
      //     console.log("오찌도찌");
      //     setMatchedChampion(matched); // 일치하는 챔피언 데이터를 상태로 저장
      //   } else {
      //     console.log("오찌도찌2");
      //     setMatchedChampion(null); // 일치하는 데이터가 없을 경우 초기화
      //   }
      // }

      if (allChampionData && userChampionTierData.length > 0) {
        // 배열에서 매칭되는 championId를 순회하면서 찾기
        const matchedChampionIds = userChampionTierData.map(
          (item: ChampionInfo) => item.championId.toString()
        );
        console.log("Champion IDs from Second API:", matchedChampionIds);

        const matched = (Object.values(allChampionData) as Champion[]).filter(
          (champion) => matchedChampionIds.includes(champion.key)
        );

        if (matched) {
          console.log("Matched Champion:", matched); // 매칭된 챔피언 출력
          setMatchedChampion(matched); // 상태 업데이트
        } else {
          console.log("No matched champion found.");
          setMatchedChampion(null); // 초기화
        }
      }
    } catch (error) {
      console.error("Error fetching summoner data:", error);
      setError("소환사 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  // 페이지가 처음 렌더링될 때 JSON 데이터를 호출
  useEffect(() => {
    const fetchJsonData = async () => {
      try {
        const champResponse = await fetch("/LeagueofLegendData/champion.json");
        const championDatajson: { data: ChampionData } =
          await champResponse.json();
        const championData = championDatajson.data;
        setAllChampionData(championData); // 데이터를 상태로 저장
        console.log("JSON Data Loaded:", championData);
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    };

    fetchJsonData();
  }, []);

  useEffect(() => {
    console.log("All Champion Data:", allChampionData);
  }, [allChampionData]);

  useEffect(() => {
    if (matchedChampion) {
      console.log("Matched Champion:", matchedChampion);
    } else {
      console.log("No matched champion found.");
    }
  }, [matchedChampion]);

  // Champion 데이터를 ChampionInfo로 변환하는 함수
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
      {matchedChampion?.map((champion) => {
        // `userChampionTierData`에서 해당 챔피언에 대한 정보를 찾기
        const correspondingChampionInfo = userChampionTier?.find(
          (tierchampion) => tierchampion.championId.toString() === champion.key
        );

        return (
          <ChampionTopLi
            key={champion.key}
            championRankData={
              correspondingChampionInfo || {
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
              }
            }
            championData={champion}
          />
        );
      })}
    </div>
  );
}
