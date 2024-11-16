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
  // const [data, setData] = useState<{ freeChampionIds: number[] } | null>(null);
  // const [allChampionData, setAllChampionData] = useState<ChampionData>({});
  // const [freeChampions, setFreeChampions] = useState<
  //   { name: string; tags: string; image: string; key: string; id: string }[]
  // >([]);
  // const [aramChamps, setaramChamps] = useState<
  //   { name: string; tier: string }[]
  // >([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/loadRotationChamp");
  //       const result = await response.json();
  //       setData(result);

  //       const champResponse = await fetch("/LeagueofLegendData/champion.json");
  //       const championDatajson: { data: ChampionData } =
  //         await champResponse.json();
  //       // json stringify로 데이터 변환
  //       // console.log(JSON.stringify(championDatajson));
  //       const championData = championDatajson.data;
  //       setAllChampionData(championData);

  //       console.log(championData);

  //       const matchedChampions = result.freeChampionIds
  //         .map((id: number) => {
  //           const matchedChampion = Object.values(championData).find(
  //             (champ: Champion) => {
  //               return champ.key === id.toString();
  //             }
  //           );

  //           return matchedChampion
  //             ? {
  //                 name: matchedChampion.name,
  //                 tags: matchedChampion.tags,
  //                 image: matchedChampion.image,
  //                 key: matchedChampion.key,
  //                 id: matchedChampion.id,
  //               }
  //             : null;
  //         })
  //         .filter(
  //           (
  //             champion: object
  //           ): champion is {
  //             name: string;
  //             tags: string;
  //             image: string;
  //             key: string;
  //             id: string;
  //           } => champion !== null
  //         );

  //       setFreeChampions(matchedChampions);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   async function fetchData2() {
  //     try {
  //       const response = await fetch("/api/scrapAramChamp");
  //       const data = await response.json();
  //       setaramChamps(data);
  //     } catch (error) {
  //       console.error("Error fetching champion tiers:", error);
  //     }
  //   }

  //   fetchData();
  //   fetchData2();
  // }, []);

  // useEffect(() => {
  //   console.log(aramChamps);
  // }, [aramChamps]);

  let carousel = document.querySelector(".carousel");
  let cells = carousel.querySelectorAll(".carousel__cell");
  let cellCount; // cellCount set from cells-range input value
  let selectedIndex = 0;
  let cellWidth = carousel.offsetWidth;
  let cellHeight = carousel.offsetHeight;
  let isHorizontal = true;
  let rotateFn = isHorizontal ? "rotateY" : "rotateX";
  let radius, theta;
  // console.log( cellWidth, cellHeight );

  function rotateCarousel() {
    let angle = theta * selectedIndex * -1;
    carousel.style.transform =
      "translateZ(" + -radius + "px) " + rotateFn + "(" + angle + "deg)";
  }

  let prevButton = document.querySelector(".previous-button");
  prevButton.addEventListener("click", function () {
    selectedIndex--;
    rotateCarousel();
  });

  let nextButton = document.querySelector(".next-button");
  nextButton.addEventListener("click", function () {
    selectedIndex++;
    rotateCarousel();
  });

  let cellsRange = document.querySelector(".cells-range");
  cellsRange.addEventListener("change", changeCarousel);
  cellsRange.addEventListener("input", changeCarousel);

  function changeCarousel() {
    cellCount = cellsRange.value;
    theta = 360 / cellCount;
    let cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount));
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (i < cellCount) {
        // visible cell
        cell.style.opacity = 1;
        let cellAngle = theta * i;
        cell.style.transform =
          rotateFn + "(" + cellAngle + "deg) translateZ(" + radius + "px)";
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = "none";
      }
    }

    rotateCarousel();
  }

  let orientationRadios = document.querySelectorAll(
    'input[name="orientation"]'
  );
  (function () {
    for (let i = 0; i < orientationRadios.length; i++) {
      let radio = orientationRadios[i];
      radio.addEventListener("change", onOrientationChange);
    }
  })();

  function onOrientationChange() {
    let checkedRadio = document.querySelector(
      'input[name="orientation"]:checked'
    );
    isHorizontal = checkedRadio.value == "horizontal";
    rotateFn = isHorizontal ? "rotateY" : "rotateX";
    changeCarousel();
  }

  // set initials
  onOrientationChange();

  return (
    <>
      {/* <div>
        <h1>로테이션 챔피언</h1>
        <ul className={characterStyles.ul_container}>
          {freeChampions.map((freechampion) => (
            <CharacterLi key={freechampion.key} champion={freechampion} />
          ))}
        </ul>
      </div>
      <AramChampionTier
        allChampionData={allChampionData}
        aramChamps={aramChamps}
      /> */}
      <div className={characterStyles.scene}>
        <div className={characterStyles.carousel}>
          <div className={characterStyles.carousel__cell}></div>
          <div className={characterStyles.carousel__cell}>2</div>
          <div className={characterStyles.carousel__cell}>3</div>
          <div className={characterStyles.carousel__cell}>4</div>
          <div className={characterStyles.carousel__cell}>5</div>
          <div className={characterStyles.carousel__cell}>6</div>
          <div className={characterStyles.carousel__cell}>7</div>
          <div className={characterStyles.carousel__cell}>8</div>
          <div className={characterStyles.carousel__cell}>9</div>
          <div className={characterStyles.carousel__cell}>10</div>
          <div className={characterStyles.carousel__cell}>11</div>
          <div className={characterStyles.carousel__cell}>12</div>
          <div className={characterStyles.carousel__cell}>13</div>
          <div className={characterStyles.carousel__cell}>14</div>
          <div className={characterStyles.carousel__cell}>15</div>
        </div>
      </div>

      <div className={characterStyles.carouselOption}>
        <p>
          <label>
            Cells
            <input
              className={characterStyles.carousel__cell}
              type="range"
              min="3"
              max="15"
              value="9"
            />
          </label>
        </p>
        <p>
          <button className="previous-button">Previous</button>
          <button className="next-button">Next</button>
        </p>
        <p>
          Orientation:
          <label>
            <input type="radio" name="orientation" value="horizontal" checked />
            horizontal
          </label>
          <label>
            <input type="radio" name="orientation" value="vertical" />
            vertical
          </label>
        </p>
      </div>
    </>
  );
}
