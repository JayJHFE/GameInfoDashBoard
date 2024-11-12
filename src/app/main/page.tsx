// "use client";

// import { useEffect, useState } from "react";
// import CharacterLi from "../components/character_li/character_li";
// import characterStyles from './character_ul.module.css';

// interface Champion {
//   tags: string;
//   id: string;
//   key: string;
//   name: string;
//   image: string;
// }

// interface ChampionData {
//   [key: string]: Champion;
// }

// export default function MainClient() {
//   const [data, setData] = useState<{ freeChampionIds: number[] } | null>(null);
//   const [freeChampions, setFreeChampions] = useState<
//     { name: string; tags: string; image: string; key: string; id: string; }[]
//   >([]);
//   const [tiers, setTiers] = useState<{ name: string; tier: string }[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("/api/loadRotationChamp");
//         const result = await response.json();
//         setData(result);

//         const champResponse = await fetch("/LeagueofLegendData/champion.json");
//         const championDatajson: { data: ChampionData } = await champResponse.json();
//         const championData = championDatajson.data;
//         console.log(championData);

//         const matchedChampions = result.freeChampionIds.map((id: number) => {
//           const matchedChampion = Object.values(championData).find((champ: Champion) => {
//             return champ.key === id.toString();
//           });

//           return matchedChampion
//             ? {
//                 name: matchedChampion.name,
//                 tags: matchedChampion.tags,
//                 image: matchedChampion.image,
//                 key: matchedChampion.key,
//                 id: matchedChampion.id,
//               }
//             : null;
//         }).filter((champion : object) => champion !== null);
//         console.log(matchedChampions);
//         setFreeChampions(matchedChampions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     async function fetchData2() {
//       const response = await fetch("/api/fetchAramChampionTier");
//       const data = await response.json();
//       setTiers(data);
//     }

//     fetchData();
//     fetchData2();

//   }, []);

//   useEffect(() => {
//     console.log(tiers);
//   }, [tiers]);

//   return (
//     <div>
//       {/* <h1>이번주 무료 챔피언</h1> */}
//       <h1>옵션 추가</h1>
//       <ul className={characterStyles.ul_container}>
//         {freeChampions.map((freechampion) => (
//           <CharacterLi key={freechampion.key} champion={freechampion}/>
//           // <li key={index}>
//           //   <h3>{champion.name}</h3>
//           //   {/* <p>Tags: {champion.tags}</p>
//           //   <img src={champion.image} alt={`${champion.name} 이미지`} />
//           //   <p>Key: {champion.key}</p> */}
//           // </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import CharacterLi from "../components/character_li/character_li";
import characterStyles from "./character_ul.module.css";
import AramChampionTier from "../components/aramChampionTier/aramChampionTier";

interface Champion {
  tags: string;
  id: string;
  key: string;
  name: string;
  image: string;
}

interface ChampionData {
  [key: string]: Champion;
}

export default function MainClient() {
  const [data, setData] = useState<{ freeChampionIds: number[] } | null>(null);
  const [allChampionData, setAllChampionData] = useState<ChampionData>({});
  const [freeChampions, setFreeChampions] = useState<
    { name: string; tags: string; image: string; key: string; id: string }[]
  >([]);
  const [aramChamps, setaramChamps] = useState<
    { name: string; tier: string }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/loadRotationChamp");
        const result = await response.json();
        setData(result);

        const champResponse = await fetch("/LeagueofLegendData/champion.json");
        const championDatajson: { data: ChampionData } =
          await champResponse.json();
        // json stringify로 데이터 변환
        // console.log(JSON.stringify(championDatajson));
        const championData = championDatajson.data;
        setAllChampionData(championData);

        console.log(championData);

        const matchedChampions = result.freeChampionIds
          .map((id: number) => {
            const matchedChampion = Object.values(championData).find(
              (champ: Champion) => {
                return champ.key === id.toString();
              }
            );

            return matchedChampion
              ? {
                  name: matchedChampion.name,
                  tags: matchedChampion.tags,
                  image: matchedChampion.image,
                  key: matchedChampion.key,
                  id: matchedChampion.id,
                }
              : null;
          })
          .filter(
            (
              champion: object
            ): champion is {
              name: string;
              tags: string;
              image: string;
              key: string;
              id: string;
            } => champion !== null
          );

        setFreeChampions(matchedChampions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchData2() {
      try {
        const response = await fetch("/api/scrapAramChamp");
        const data = await response.json();
        setaramChamps(data);
      } catch (error) {
        console.error("Error fetching champion tiers:", error);
      }
    }

    fetchData();
    fetchData2();
  }, []);

  useEffect(() => {
    console.log(aramChamps);
  }, [aramChamps]);

  return (
    <>
      <div>
        <h1>옵션 추가</h1>
        <ul className={characterStyles.ul_container}>
          {freeChampions.map((freechampion) => (
            <CharacterLi key={freechampion.key} champion={freechampion} />
          ))}
        </ul>
      </div>
      <AramChampionTier
        allChampionData={allChampionData}
        aramChamps={aramChamps}
      />
    </>
  );
}
