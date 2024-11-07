// "use client";
// import { useEffect, useState } from "react";

// interface Champion {
//   id: string;
//   key: string;
//   name: string;
// }

// interface ChampionData {
//   [key: string]: Champion;
// }

// export default function MainClient() {
//   const [data, setData] = useState(null);
//   const [freeChampions, setFreeChampions] = useState([]);

//   useEffect(() => {
//     async function RotationChamp() {
//       try {
//         const response = await fetch("/api/loadRotationChamp");
//         const result = await response.json();
//         setData(result); // 상태에 저장

//         const champResponse = await fetch("/LeagueofLegendData/champion.json");
//         const championData = await champResponse.json();

//         const matchedChampions = result.freeChampionIds.map(id => {
//           const matchedChampion = Object.values(championData.data).find(
//             (champ: Champion) => champ.key === id.toString()
//           );
//           return matchedChampion ? matchedChampion.name : null;
//         }).filter(Boolean); // null 값 제거

//         setFreeChampions(matchedChampions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }


//     RotationChamp();
//   }, []);

//   return (
//     <div>
//       <h1>Data from API Route:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";

// 챔피언 데이터 타입 정의
interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
}

interface ChampionData {
  [key: string]: Champion;
}

export default function MainClient() {
  const [data, setData] = useState<{ freeChampionIds: number[] } | null>(null);
  const [freeChampions, setFreeChampions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // API 호출하여 로테이션 챔피언 ID 가져오기
        const response = await fetch("/api/loadRotationChamp");
        const result = await response.json();
        setData(result);

        // json 파일 호출 후 챔피언 데이터 가져오기
        const champResponse = await fetch("/LeagueofLegendData/champion.json");
        const championDatajson: { data: ChampionData } = await champResponse.json();
        const championData = championDatajson.data;

        // 로테이션 챔피언값과 챔피언 데이터를 비교하여 매칭된 챔피언 이름 배열 생성
        const matchedChampions = result.freeChampionIds.map((id: number) => {
          const matchedChampion = Object.values(championData).find((champ: Champion) => {
            return champ.key === id.toString();
          });

          if (!matchedChampion) {
            console.log(`Id값에 맞는 챔피언이 없습니다: ${id}`);
          } else {
            console.log(`챔피언을 찾았습니다: ${matchedChampion.name}, 아이디: ${id}`);
          }

          return matchedChampion ? matchedChampion.name : null;
        });
        setFreeChampions(matchedChampions); // 매칭된 챔피언 이름 배열을 상태에 저장


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Free Champion Rotation:</h1>
      {data && <pre>{freeChampions}</pre>}
      {/* <h2>Free Champions by Name:</h2> */}
      {/* <ul>
        {freeChampions.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul> */}
    </div>
  );
}
