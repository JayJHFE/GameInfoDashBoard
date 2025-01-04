"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import CharacterLi from "../components/character_li/character_li";
import styles from "./mainPage.module.css";

import AramChampionTier from "../components/aramChampionTier/aramChampionTier";
import RandomChampionCard from "../components/randomChampionCard/randomChampionCard";
import SearchingZone from "../components/serchingZone/searchingZone";

interface Champion {
  tags: Array<string>;
  id: string;
  info: {
    magic: number;
    [key: string]: string | number | object;
  };
  key: string;
  name: string;
  image: string;
}

interface ChampionData {
  [key: string]: Champion;
}

interface PickData {
  checkNormal: string;
  lane: string;
  damageType: string;
}

export default function MainClient() {
  const [, setData] = useState<{ freeChampionIds: number[] } | null>(null);
  const [allChampionData, setAllChampionData] = useState<ChampionData>({});
  const [freeChampions, setFreeChampions] = useState<
    { name: string; tags: string; image: string; key: string; id: string }[]
  >([]);
  const [aramChamps, setaramChamps] = useState<
    { name: string; tier: string }[]
  >([]);
  const [cellCount, setCellCount] = useState(25); // 슬라이드 개수
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 인덱스
  const [isHorizontal, setIsHorizontal] = useState(true); // 방향
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [pickData, setPickData] = useState<PickData>({
    checkNormal: "normal",
    lane: "top",
    damageType: "",
  });
  const [isSearch, setIsSearch] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(288); // Carousel 반지름 계산
  const theta = 360 / cellCount; // 각도 계산

  const initializeCarousel = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      //   const cellSize = isHorizontal
      //     ? carousel.offsetWidth
      //     : carousel.offsetHeight;

      //   const newRadius = Math.max(
      //     Math.round(cellSize / 2 / Math.sin(Math.PI / cellCount)),
      //     300 // 최소 반지름 제한
      //   );
      //   setRadius(newRadius);
      const cellSize = carousel.offsetWidth || 300; // 기본 크기 보장
      const newRadius = Math.min(
        Math.max(Math.round(cellSize / 2 / Math.sin(Math.PI / cellCount)), 300), // 최소 반지름 제한
        600 // 최대 반지름 제한
      );
      // const newRadius = Math.min(
      //   Math.max(Math.round(cellSize / 2 / Math.sin(Math.PI / cellCount)), 200), // 최소 반지름 제한
      //   400 // 최대 반지름 제한
      // );
      setRadius(newRadius);

      const cells = Array.from(carousel.children); // Carousel Cell
      cells.forEach((cell, index) => {
        if (index < cellCount) {
          const cellAngle = theta * index;
          (cell as HTMLElement).style.transform = `rotate${
            isHorizontal ? "Y" : "X"
          }(${cellAngle}deg) translateZ(${newRadius}px)`;
          (cell as HTMLElement).style.opacity = "1";
        } else {
          (cell as HTMLElement).style.opacity = "0";
          (cell as HTMLElement).style.transform = "none";
        }
      });
      carousel.style.transform = `translateZ(${-newRadius}px) rotateY(0deg)`;
    }
  };

  // Carousel 회전
  const rotateCarousel = () => {
    const carousel = carouselRef.current;
    const angle = theta * selectedIndex * -1;
    if (carousel) {
      carousel.style.transform = `translateZ(${-radius}px) rotate${
        isHorizontal ? "Y" : "X"
      }(${angle}deg)`;
    }
  };
  // const rotateCarousel = () => {
  //     const carousel = carouselRef.current;
  //     if (carousel) {
  //       const angle = theta * selectedIndex * -1;
  //       carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
  //     }
  //   };

  // 초기화
  useLayoutEffect(() => {
    if (isCarouselVisible) {
      initializeCarousel();
    }
  }, [cellCount, isCarouselVisible]);

  // 선택된 인덱스 변경 시 회전
  useEffect(() => {
    if (isCarouselVisible) {
      rotateCarousel();
    }
  }, [selectedIndex]);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % cellCount);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/loadRotationChamp");
        const result = await response.json();
        setCellCount(result.freeChampionIds.length);
        setData(result);

        const champResponse = await fetch("/LeagueofLegendData/champion.json");
        const championDatajson: { data: ChampionData } =
          await champResponse.json();
        const championData = championDatajson.data;
        setAllChampionData(championData);

        // console.log(championData);

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

  // useEffect(() => {
  //   console.log(aramChamps);
  //   console.log(freeChampions, "freechampions");
  // }, [aramChamps]);

  return (
    <>
      <div>
        {!isCarouselVisible ? (
          <div>
            <h2>이번주 로테이션 챔피언</h2>
            <div className={styles.beforeCarousel}>
              <button
                onClick={() => {
                  setIsCarouselVisible(true);
                }}
              >
                열기
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.carouselContainer}>
            <div className={styles.scene}>
              <div
                className={styles.carousel}
                ref={carouselRef}
                style={{
                  transition: "transform 1s ease-in-out",
                }}
              >
                {freeChampions.map((freechampion, index) => (
                  <CharacterLi
                    key={freechampion.key}
                    champion={freechampion}
                    isSelected={index === selectedIndex}
                  />
                ))}
              </div>
              {/* <div className={characterStyles2.carouselOption}>
              <p>
              </p>
              </div> */}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <button onClick={handlePrev}>◀︎</button>
              <button onClick={handleNext}>►</button>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
        <AramChampionTier
          allChampionData={allChampionData}
          aramChamps={aramChamps}
        />
        <div className={styles.serachingZoneContainer}>
          <SearchingZone
            pickData={pickData}
            setPickData={setPickData}
            setIsSearch={setIsSearch}
          />
          <RandomChampionCard
            allChampionData={allChampionData}
            pickData={pickData}
            isSearch={isSearch}
          />
        </div>
      </div>
    </>
  );
}
