// "use client";
// interface ChampionInfo {
//   championId: number;
//   championLevel: number;
//   championPoints: number;
//   championPointsSinceLastLevel: number;
//   championPointsUntilNextLevel: number;
//   championSeasonMilestone: number;
//   lastPlayTime: number;
//   markRequiredForNextLevel: number;
//   milestoneGrades: string[];
//   nextSeasonMilestone: object;
//   puuid: string;
//   tokensEarned: unknown; // 정확한 타입을 알아야 수정 가능
// }

// interface Champion {
//   tags: Array<string>;
//   id: string;
//   info: {
//     magic: number;
//     [key: string]: number | string;
//   };
//   key: string;
//   name: string;
//   image: string;
// }

// interface ChampionData {
//   [key: string]: Champion;
// }

// import { useState } from "react";
// import ChampionTopLi from "../components/championTop_li/championTop_li";

// export default function SummonerSearch() {
//   const [inputValue, setInputValue] = useState("");
//   const [error, setError] = useState("");
//   const [result, setResult] = useState(null);

//   const [chamiponResult, setChampionResult] = useState<Champion[] | null>(null);
//   const [championData, setChampionData] = useState<ChampionData>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//     setError(""); // 오류 메시지를 초기화
//   };

//   const handleSearch = async () => {
//     // 아이디 #태그 형식인지 확인
//     // const regex = /^[\w가-힣]+#[\w가-힣]+$/; // 한글 포함
//     // const regex = /^[\w가-힣]+#.+$/;
//     const regex = /^[^\s#]+#[^\s].+$/;

//     if (!regex.test(inputValue)) {
//       setError("아이디와 태그는 '아이디 #태그' 형식으로 입력해주세요.");
//       return;
//     }

//     // 입력값 분리
//     const [id, tag] = inputValue.split("#");

//     let formattedTag = tag;

//     if (/^[가-힣]{2}$/.test(tag)) {
//       formattedTag = `${tag[0]} ${tag[1]}`;
//     }

//     try {
//       const requestUrl = `/api/searchUserNickName/${id}/${formattedTag}`;
//       const response = await fetch(requestUrl, { method: "GET" });

//       if (!response.ok) {
//         throw new Error(`API responded with status ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//       setResult(result);

//       const { puuid } = data;
//       if (!puuid) {
//         throw new Error("puuid not found in the response.");
//       }

//       // 첫 번째 API 결과가 성공적으로 도착한 후 두 번째 API 실행
//       const secondRequestUrl = `/api/searchTopChampion/${puuid}`;
//       console.log("Second Request URL:", secondRequestUrl);

//       const secondResponse = await fetch(secondRequestUrl, { method: "GET" });

//       if (!secondResponse.ok) {
//         throw new Error(
//           `Second API responded with status ${secondResponse.status}`
//         );
//       }

//       const secondData = await secondResponse.json();
//       setChampionResult(secondData);
//       console.log("Second API Data:", secondData);

//       // /LeagueofLegendData/champion.json" 에서 정보를 가져오기
//       const champResponse = await fetch("/LeagueofLegendData/champion.json");
//       const championDatajson: { data: ChampionData } =
//         await champResponse.json();
//       const championData = championDatajson.data;
//       setChampionData(championData);
//       console.log(championData);
//     } catch (error) {
//       console.error("Error fetching summoner data:", error);
//       setError("소환사 정보를 가져오는 중 오류가 발생했습니다.");
//     }
//   };

//   // useEffect(() => {
//   //   console.log(inputValue);
//   // }, [inputValue]);

//   return (
//     <div>
//       <h1>Summoner Search</h1>
//       <div>
//         <h2>아이디를 입력해주세요</h2>
//         <input
//           type="text"
//           placeholder="아이디 #태그"
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleSearch}>검색</button>
//       </div>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {chamiponResult && (
//         <div>
//           <h2>챔피언 승률</h2>
//           <ul>
//             {chamiponResult.map((championInfo) => (
//               // <li key={champion.championId}></li>
//               <ChampionTopLi
//                 key={championInfo.id}
//                 championRankData={championInfo}
//                 // championRankData={championInfo}
//                 championData={championData}
//               />
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import ChampionTopLi from "../components/championTop_li/championTop_li";

// interface ChampionInfo {
//   championId: number;
//   championLevel: number;
//   championPoints: number;
//   championPointsSinceLastLevel: number;
//   championPointsUntilNextLevel: number;
//   championSeasonMilestone: number;
//   lastPlayTime: number;
//   markRequiredForNextLevel: number;
//   milestoneGrades: string[];
//   nextSeasonMilestone: object;
//   puuid: string;
//   tokensEarned: unknown; // 정확한 타입을 알아야 수정 가능
// }

// interface Champion {
//   tags: Array<string>;
//   id: string;
//   info: {
//     magic: number;
//     [key: string]: number | string;
//   };
//   key: string;
//   name: string;
//   image: string;
// }

// interface ChampionData {
//   [key: string]: Champion;
// }

// export default function SummonerSearch() {
//   const [inputValue, setInputValue] = useState("");
//   const [error, setError] = useState("");
//   const [, setResult] = useState(null);

//   const [chamiponResult, setChampionResult] = useState<Champion[] | null>(null);
//   const [championData, setChampionData] = useState<ChampionData>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//     setError(""); // 오류 메시지를 초기화
//   };

//   const handleSearch = async () => {
//     const regex = /^[^\s#]+#[^\s].+$/;

//     if (!regex.test(inputValue)) {
//       setError("아이디와 태그는 '아이디 #태그' 형식으로 입력해주세요.");
//       return;
//     }

//     const [id, tag] = inputValue.split("#");

//     let formattedTag = tag;

//     if (/^[가-힣]{2}$/.test(tag)) {
//       formattedTag = `${tag[0]} ${tag[1]}`;
//     }

//     try {
//       const requestUrl = `/api/searchUserNickName/${id}/${formattedTag}`;
//       const response = await fetch(requestUrl, { method: "GET" });

//       if (!response.ok) {
//         throw new Error(`API responded with status ${response.status}`);
//       }

//       const data = await response.json();
//       setResult(data);

//       const { puuid } = data;
//       if (!puuid) {
//         throw new Error("puuid not found in the response.");
//       }

//       const secondRequestUrl = `/api/searchTopChampion/${puuid}`;
//       const secondResponse = await fetch(secondRequestUrl, { method: "GET" });

//       if (!secondResponse.ok) {
//         throw new Error(
//           `Second API responded with status ${secondResponse.status}`
//         );
//       }

//       const secondData: Champion[] = await secondResponse.json();
//       setChampionResult(secondData);

//       const champResponse = await fetch("/LeagueofLegendData/champion.json");
//       const championDatajson: { data: ChampionData } =
//         await champResponse.json();
//       setChampionData(championDatajson.data);
//     } catch (error) {
//       console.error("Error fetching summoner data:", error);
//       setError("소환사 정보를 가져오는 중 오류가 발생했습니다.");
//     }
//   };

//   // Champion 데이터를 ChampionInfo로 변환하는 함수
//   const mapChampionToChampionInfo = (champion: Champion): ChampionInfo => ({
//     championId: parseInt(champion.key),
//     championLevel: 0, // 기본값 설정 또는 적절한 데이터 삽입
//     championPoints: 0,
//     championPointsSinceLastLevel: 0,
//     championPointsUntilNextLevel: 0,
//     championSeasonMilestone: 0,
//     lastPlayTime: 0,
//     markRequiredForNextLevel: 0,
//     milestoneGrades: [],
//     nextSeasonMilestone: {},
//     puuid: "",
//     tokensEarned: null,
//   });

//   return (
//     <div>
//       <h1>Summoner Search</h1>
//       <div>
//         <h2>아이디를 입력해주세요</h2>
//         <input
//           type="text"
//           placeholder="아이디 #태그"
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleSearch}>검색</button>
//       </div>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {chamiponResult && (
//         <div>
//           <h2>챔피언 승률</h2>
//           <ul>
//             {chamiponResult.map((champion) => (
//               <ChampionTopLi
//                 key={champion.id}
//                 championRankData={mapChampionToChampionInfo(champion)}
//                 championData={championData}
//               />
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
interface Champion {
  tags: Array<string>;
  id: string;
  info: {
    magic: number;
    [key: string]: any;
  };
  key: string;
  name: string;
  image: string;
}

interface ChampionData {
  [key: string]: Champion;
}

export default function SummonerSearch() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [, setResult] = useState(null);
  const [allChampionData, setAllChampionData] = useState<any>(null);

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

      if (!secondResponse.ok) {
        throw new Error(
          `Second API responded with status ${secondResponse.status}`
        );
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
