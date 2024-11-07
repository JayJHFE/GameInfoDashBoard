"use client";

import { useEffect, useState } from "react";
import CharacterLi from "../components/character_li/character_li";
import characterStyles from './character_ul.module.css';

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
  const [freeChampions, setFreeChampions] = useState<
    { name: string; tags: string; image: string; key: string; id: string; }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/loadRotationChamp");
        const result = await response.json();
        setData(result);

        const champResponse = await fetch("/LeagueofLegendData/champion.json");
        const championDatajson: { data: ChampionData } = await champResponse.json();
        const championData = championDatajson.data;
        console.log(championData);

        const matchedChampions = result.freeChampionIds.map((id: number) => {
          const matchedChampion = Object.values(championData).find((champ: Champion) => {
            return champ.key === id.toString();
          });

          return matchedChampion
            ? {
                name: matchedChampion.name,
                tags: matchedChampion.tags,
                image: matchedChampion.image,
                key: matchedChampion.key,
                id: matchedChampion.id,
              }
            : null;
        }).filter((champion : object) => champion !== null);
        console.log(matchedChampions);
        setFreeChampions(matchedChampions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>이번주 무료 챔피언</h1>
      <ul className={characterStyles.ul_container}>
        {freeChampions.map((freechampion) => (
          <CharacterLi key={freechampion.key} champion={freechampion}/>
          // <li key={index}>
          //   <h3>{champion.name}</h3>
          //   {/* <p>Tags: {champion.tags}</p>
          //   <img src={champion.image} alt={`${champion.name} 이미지`} />
          //   <p>Key: {champion.key}</p> */}
          // </li>
        ))}
      </ul>
    </div>
  );
}
