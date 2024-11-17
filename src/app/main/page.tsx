// "use client";

// import { useEffect, useRef, useState } from "react";
// import CharacterLi from "../components/character_li/character_li";
// import characterStyles2 from "../components/character_li/character_li.module.css";
// import characterStyles from "./character_ul.module.css";

// import AramChampionTier from "../components/aramChampionTier/aramChampionTier";

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
//   const [, setData] = useState<{ freeChampionIds: number[] } | null>(null);
//   const [allChampionData, setAllChampionData] = useState<ChampionData>({});
//   const [freeChampions, setFreeChampions] = useState<
//     { name: string; tags: string; image: string; key: string; id: string }[]
//   >([]);
//   const [aramChamps, setaramChamps] = useState<
//     { name: string; tier: string }[]
//   >([]);
//   const [cellCount, setCellCount] = useState(25); // 슬라이드 개수
//   const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 인덱스
//   const [isHorizontal, setIsHorizontal] = useState(true); // 방향
//   const carouselRef = useRef<HTMLDivElement>(null); // Carousel 요소 참조
//   const [radius, setRadius] = useState(0); // Carousel 반지름 계산
//   const theta = 360 / cellCount; // 각도 계산

//   const rotateCarousel = () => {
//     const carousel = carouselRef.current;
//     const angle = theta * selectedIndex * -1;
//     if (carousel) {
//       // scale을 명시적으로 설정
//       carousel.style.transform = `translateZ(${-radius}px) rotate${
//         isHorizontal ? "Y" : "X"
//       }(${angle}deg) scale(1)`;
//     }
//   };
//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (carousel) {
//       const cellSize = isHorizontal
//         ? carousel.offsetWidth
//         : carousel.offsetHeight;

//       const newRadius = Math.max(
//         Math.round(cellSize / 2 / Math.sin(Math.PI / cellCount)), // 안정적인 반지름 계산
//         300 // 최소 반지름 제한
//       );
//       setRadius(newRadius);

//       const cells = Array.from(carousel.children); // Carousel Cell
//       cells.forEach((cell, index) => {
//         if (index < cellCount) {
//           const cellAngle = theta * index;
//           (cell as HTMLElement).style.transform = `rotate${
//             isHorizontal ? "Y" : "X"
//           }(${cellAngle}deg) translateZ(${newRadius}px)`;
//           (cell as HTMLElement).style.opacity = "1";
//         } else {
//           cell.style.opacity = 0;
//           cell.style.transform = "none";
//         }
//       });
//     }

//     rotateCarousel(); // 초기 회전
//   }, [cellCount, isHorizontal, selectedIndex, radius]);

//   const handlePrev = () => {
//     setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
//   };

//   const handleNext = () => {
//     setSelectedIndex((prev) => (prev + 1) % cellCount);
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("/api/loadRotationChamp");
//         const result = await response.json();
//         setData(result);

//         const champResponse = await fetch("/LeagueofLegendData/champion.json");
//         const championDatajson: { data: ChampionData } =
//           await champResponse.json();
//         // json stringify로 데이터 변환
//         // console.log(JSON.stringify(championDatajson));
//         const championData = championDatajson.data;
//         setAllChampionData(championData);

//         console.log(championData);

//         const matchedChampions = result.freeChampionIds
//           .map((id: number) => {
//             const matchedChampion = Object.values(championData).find(
//               (champ: Champion) => {
//                 return champ.key === id.toString();
//               }
//             );

//             return matchedChampion
//               ? {
//                   name: matchedChampion.name,
//                   tags: matchedChampion.tags,
//                   image: matchedChampion.image,
//                   key: matchedChampion.key,
//                   id: matchedChampion.id,
//                 }
//               : null;
//           })
//           .filter(
//             (
//               champion: object
//             ): champion is {
//               name: string;
//               tags: string;
//               image: string;
//               key: string;
//               id: string;
//             } => champion !== null
//           );

//         setFreeChampions(matchedChampions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     async function fetchData2() {
//       try {
//         const response = await fetch("/api/scrapAramChamp");
//         const data = await response.json();
//         setaramChamps(data);
//       } catch (error) {
//         console.error("Error fetching champion tiers:", error);
//       }
//     }

//     fetchData();
//     fetchData2();
//   }, []);

//   useEffect(() => {
//     console.log(aramChamps);
//     console.log(freeChampions, "freechampions");
//   }, [aramChamps]);

//   return (
//     <>
//       <div>
//         <h1>로테이션 챔피언</h1>
//         {/* <ul className={characterStyles.ul_container}>
//           {freeChampions.map((freechampion) => (
//             <CharacterLi key={freechampion.key} champion={freechampion} />
//           ))}
//         </ul> */}
//         <div className={characterStyles2.scene}>
//           <div
//             className={characterStyles2.carousel}
//             ref={carouselRef}
//             style={{
//               transition: "transform 1s ease-in-out",
//             }}
//           >
//             {freeChampions.map((freechampion) => (
//               <CharacterLi key={freechampion.key} champion={freechampion} />
//             ))}
//           </div>
//         </div>

//         <div className={characterStyles2.carouselOption}>
//           {/* <p>
//             <label>
//               Cells:
//               <input
//                 type="range"
//                 min="3"
//                 max="25"
//                 value={cellCount}
//                 onChange={(e) => setCellCount(Number(e.target.value))}
//               />
//             </label>
//           </p> */}
//           <p>
//             <button onClick={handlePrev}>Previous</button>
//             <button onClick={handleNext}>Next</button>
//           </p>
//           {/* <p>
//             Orientation:
//             <label>
//               <input
//                 type="radio"
//                 name="orientation"
//                 value="horizontal"
//                 checked={isHorizontal}
//                 onChange={() => setIsHorizontal(true)}
//               />
//               Horizontal
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="orientation"
//                 value="vertical"
//                 checked={!isHorizontal}
//                 onChange={() => setIsHorizontal(false)}
//               />
//               Vertical
//             </label>
//           </p> */}
//         </div>
//       </div>
//       <AramChampionTier
//         allChampionData={allChampionData}
//         aramChamps={aramChamps}
//       />
//     </>
//   );
// }

// 2222222222222222222222 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2

// "use client";

// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import CharacterLi from "../components/character_li/character_li";
// import characterStyles2 from "../components/character_li/character_li.module.css";
// import characterStyles from "./character_ul.module.css";

// import AramChampionTier from "../components/aramChampionTier/aramChampionTier";

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
//   const [, setData] = useState<{ freeChampionIds: number[] } | null>(null);
//   const [allChampionData, setAllChampionData] = useState<ChampionData>({});
//   const [freeChampions, setFreeChampions] = useState<
//     { name: string; tags: string; image: string; key: string; id: string }[]
//   >([]);
//   const [aramChamps, setaramChamps] = useState<
//     { name: string; tier: string }[]
//   >([]);
//   const [cellCount, setCellCount] = useState(25); // 슬라이드 개수
//   const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 인덱스
//   const [isHorizontal, setIsHorizontal] = useState(true); // 방향
//   const [isCarouselVisible, setIsCarouselVisible] = useState(false); // 캐러셀 표시 여부
//   const carouselRef = useRef<HTMLDivElement>(null); // Carousel 요소 참조
//   const [radius, setRadius] = useState(0); // Carousel 반지름 계산
//   const theta = 360 / cellCount; // 각도 계산

//   // DOM 크기 측정 및 초기화
//   const initializeCarousel = () => {
//     const carousel = carouselRef.current;
//     if (carousel) {
//       const cellSize = isHorizontal
//         ? carousel.offsetWidth
//         : carousel.offsetHeight;

//       const newRadius = Math.max(
//         Math.round(cellSize / 2 / Math.sin(Math.PI / cellCount)),
//         300 // 최소 반지름 제한
//       );
//       setRadius(newRadius);

//       const cells = Array.from(carousel.children); // Carousel Cell
//       cells.forEach((cell, index) => {
//         if (index < cellCount) {
//           const cellAngle = theta * index;
//           (cell as HTMLElement).style.transform = `rotate${
//             isHorizontal ? "Y" : "X"
//           }(${cellAngle}deg) translateZ(${newRadius}px)`;
//           (cell as HTMLElement).style.opacity = "1";
//         } else {
//           (cell as HTMLElement).style.opacity = "0";
//           (cell as HTMLElement).style.transform = "none";
//         }
//       });
//     }
//   };

//   // Carousel 회전
//   const rotateCarousel = () => {
//     const carousel = carouselRef.current;
//     const angle = theta * selectedIndex * -1;
//     if (carousel) {
//       carousel.style.transform = `translateZ(${-radius}px) rotate${
//         isHorizontal ? "Y" : "X"
//       }(${angle}deg)`;
//     }
//   };

//   // 초기화
//   useLayoutEffect(() => {
//     if (isCarouselVisible) {
//       initializeCarousel();
//     }
//   }, [cellCount, isHorizontal, isCarouselVisible]);

//   // 선택된 인덱스 변경 시 회전
//   useEffect(() => {
//     if (isCarouselVisible) {
//       rotateCarousel();
//     }
//   }, [selectedIndex]);

//   const handlePrev = () => {
//     setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
//   };

//   const handleNext = () => {
//     setSelectedIndex((prev) => (prev + 1) % cellCount);
//   };

//   // 데이터 Fetching
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("/api/loadRotationChamp");
//         const result = await response.json();
//         setData(result);

//         const champResponse = await fetch("/LeagueofLegendData/champion.json");
//         const championDatajson: { data: ChampionData } =
//           await champResponse.json();
//         const championData = championDatajson.data;
//         setAllChampionData(championData);

//         const matchedChampions = result.freeChampionIds
//           .map((id: number) => {
//             const matchedChampion = Object.values(championData).find(
//               (champ: Champion) => champ.key === id.toString()
//             );

//             return matchedChampion
//               ? {
//                   name: matchedChampion.name,
//                   tags: matchedChampion.tags,
//                   image: matchedChampion.image,
//                   key: matchedChampion.key,
//                   id: matchedChampion.id,
//                 }
//               : null;
//           })
//           .filter(
//             (
//               champion: object
//             ): champion is {
//               name: string;
//               tags: string;
//               image: string;
//               key: string;
//               id: string;
//             } => champion !== null
//           );

//         setFreeChampions(matchedChampions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     async function fetchData2() {
//       try {
//         const response = await fetch("/api/scrapAramChamp");
//         const data = await response.json();
//         setaramChamps(data);
//       } catch (error) {
//         console.error("Error fetching champion tiers:", error);
//       }
//     }

//     fetchData();
//     fetchData2();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>로테이션 챔피언</h1>

//         {!isCarouselVisible ? (
//           <div>
//             <h2>캐러셀을 보려면 버튼을 누르세요</h2>
//             <button
//               onClick={() => {
//                 setIsCarouselVisible(true);
//               }}
//             >
//               보기
//             </button>
//           </div>
//         ) : (
//           <div className={characterStyles2.scene}>
//             <div
//               className={characterStyles2.carousel}
//               ref={carouselRef}
//               style={{
//                 transition: "transform 1s ease-in-out", // 부드러운 회전
//               }}
//             >
//               {freeChampions.map((freechampion) => (
//                 <CharacterLi key={freechampion.key} champion={freechampion} />
//               ))}
//             </div>
//             <div className={characterStyles2.carouselOption}>
//               <p>
//                 <button onClick={handlePrev}>Previous</button>
//                 <button onClick={handleNext}>Next</button>
//               </p>
//               <p>
//                 Orientation:
//                 <label>
//                   <input
//                     type="radio"
//                     name="orientation"
//                     value="horizontal"
//                     checked={isHorizontal}
//                     onChange={() => setIsHorizontal(true)}
//                   />
//                   Horizontal
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="orientation"
//                     value="vertical"
//                     checked={!isHorizontal}
//                     onChange={() => setIsHorizontal(false)}
//                   />
//                   Vertical
//                 </label>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//       <AramChampionTier
//         allChampionData={allChampionData}
//         aramChamps={aramChamps}
//       />
//     </>
//   );
// }

// 33333333333333333333333333333333333333333

// "use client";

// import { useEffect, useRef, useState, useLayoutEffect } from "react";
// import CharacterLi from "../components/character_li/character_li";
// import characterStyles2 from "../components/character_li/character_li.module.css";
// import characterStyles from "./character_ul.module.css";

// import AramChampionTier from "../components/aramChampionTier/aramChampionTier";

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
//   const [, setData] = useState<{ freeChampionIds: number[] } | null>(null);
//   const [allChampionData, setAllChampionData] = useState<ChampionData>({});
//   const [freeChampions, setFreeChampions] = useState<
//     { name: string; tags: string; image: string; key: string; id: string }[]
//   >([]);
//   const [aramChamps, setaramChamps] = useState<
//     { name: string; tier: string }[]
//   >([]);
//   const [cellCount, setCellCount] = useState(25); // 슬라이드 개수
//   const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 인덱스
//   const [isHorizontal, setIsHorizontal] = useState(true); // 방향
//   const [isCarouselVisible, setIsCarouselVisible] = useState(false);
//   const carouselRef = useRef<HTMLDivElement>(null); // Carousel 요소 참조
//   const [radius, setRadius] = useState(0); // Carousel 반지름 계산
//   const theta = 360 / cellCount; // 각도 계산

//   const initializeCarousel = () => {
//     const carousel = carouselRef.current;
//     if (carousel) {
//       const cellSize = isHorizontal
//         ? carousel.offsetWidth
//         : carousel.offsetHeight;

//       const newRadius = Math.max(
//         Math.round(cellSize / 2 / Math.sin(Math.PI / cellCount)),
//         300 // 최소 반지름 제한
//       );
//       setRadius(newRadius);

//       const cells = Array.from(carousel.children); // Carousel Cell
//       cells.forEach((cell, index) => {
//         if (index < cellCount) {
//           const cellAngle = theta * index;
//           (cell as HTMLElement).style.transform = `rotate${
//             isHorizontal ? "Y" : "X"
//           }(${cellAngle}deg) translateZ(${newRadius}px)`;
//           (cell as HTMLElement).style.opacity = "1";
//         } else {
//           (cell as HTMLElement).style.opacity = "0";
//           (cell as HTMLElement).style.transform = "none";
//         }
//       });
//     }
//   };

//   // Carousel 회전
//   const rotateCarousel = () => {
//     const carousel = carouselRef.current;
//     const angle = theta * selectedIndex * -1;
//     if (carousel) {
//       carousel.style.transform = `translateZ(${-radius}px) rotate${
//         isHorizontal ? "Y" : "X"
//       }(${angle}deg)`;
//     }
//   };

//   // 초기화
//   useLayoutEffect(() => {
//     if (isCarouselVisible) {
//       initializeCarousel();
//     }
//   }, [cellCount, isHorizontal, isCarouselVisible]);

//   // 선택된 인덱스 변경 시 회전
//   useEffect(() => {
//     if (isCarouselVisible) {
//       rotateCarousel();
//     }
//   }, [selectedIndex]);

//   const handlePrev = () => {
//     setSelectedIndex((prev) => (prev - 1 + cellCount) % cellCount);
//   };

//   const handleNext = () => {
//     setSelectedIndex((prev) => (prev + 1) % cellCount);
//   };

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch("/api/loadRotationChamp");
//         const result = await response.json();
//         setData(result);

//         const champResponse = await fetch("/LeagueofLegendData/champion.json");
//         const championDatajson: { data: ChampionData } =
//           await champResponse.json();
//         // json stringify로 데이터 변환
//         // console.log(JSON.stringify(championDatajson));
//         const championData = championDatajson.data;
//         setAllChampionData(championData);

//         console.log(championData);

//         const matchedChampions = result.freeChampionIds
//           .map((id: number) => {
//             const matchedChampion = Object.values(championData).find(
//               (champ: Champion) => {
//                 return champ.key === id.toString();
//               }
//             );

//             return matchedChampion
//               ? {
//                   name: matchedChampion.name,
//                   tags: matchedChampion.tags,
//                   image: matchedChampion.image,
//                   key: matchedChampion.key,
//                   id: matchedChampion.id,
//                 }
//               : null;
//           })
//           .filter(
//             (
//               champion: object
//             ): champion is {
//               name: string;
//               tags: string;
//               image: string;
//               key: string;
//               id: string;
//             } => champion !== null
//           );

//         setFreeChampions(matchedChampions);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     async function fetchData2() {
//       try {
//         const response = await fetch("/api/scrapAramChamp");
//         const data = await response.json();
//         setaramChamps(data);
//       } catch (error) {
//         console.error("Error fetching champion tiers:", error);
//       }
//     }

//     fetchData();
//     fetchData2();
//   }, []);

//   useEffect(() => {
//     console.log(aramChamps);
//     console.log(freeChampions, "freechampions");
//   }, [aramChamps]);

//   return (
//     <>
//       <div>
//         <h1>로테이션 챔피언</h1>
//         {/* <ul className={characterStyles.ul_container}>
//           {freeChampions.map((freechampion) => (
//             <CharacterLi key={freechampion.key} champion={freechampion} />
//           ))}
//         </ul> */}
//         {!isCarouselVisible ? (
//           <div>
//             <h2>캐러셀을 보려면 버튼을 누르세요</h2>
//             <button
//               onClick={() => {
//                 setIsCarouselVisible(true);
//               }}
//             >
//               보기
//             </button>
//           </div>
//         ) : (
//           <div className={characterStyles2.scene}>
//             <div
//               className={characterStyles2.carousel}
//               ref={carouselRef}
//               style={{
//                 transition: "transform 1s ease-in-out",
//               }}
//             >
//               {freeChampions.map((freechampion) => (
//                 <CharacterLi key={freechampion.key} champion={freechampion} />
//               ))}
//             </div>
//             <div className={characterStyles2.carouselOption}>
//               <p>
//                 <button onClick={handlePrev}>Previous</button>
//                 <button onClick={handleNext}>Next</button>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//       <AramChampionTier
//         allChampionData={allChampionData}
//         aramChamps={aramChamps}
//       />
//     </>
//   );
// }
