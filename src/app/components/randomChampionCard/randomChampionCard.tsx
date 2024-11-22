import { useEffect, useState } from "react";
import cardStyles from "./randomChampionCard.module.css";

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

interface PickData {
  checkNormal: string;
  lane: string;
  damageType: string;
}

interface ChampionData {
  [key: string]: Champion;
}
interface AramChampionTierProps {
  allChampionData: ChampionData;
  pickData: PickData;
  isSearch: boolean;
}
interface RandomTraits {
    role: string;
    type: string;
  }

export default function RandomChampionCard({
  allChampionData,
  pickData,
  isSearch,
}: AramChampionTierProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [randomChampion, setRandomChampion] = useState<Champion | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [lane, setLane] = useState<string | null>(null);
  const [traits, setTraits] = useState<RandomTraits | null>(null);
  useEffect(() => {
    if (pickData.lane === "top") setLane("탑");
    else if (pickData.lane === "jg") setLane("정글");
    else if (pickData.lane === "mid") setLane("미드");
    else if (pickData.lane === "adc") setLane("원딜");
    else if (pickData.lane === "sup") setLane("서폿");
  }, [pickData.lane]);

    const generateRandomTraits = () => {
        // 랜덤 값 생성
        const roles = ["딜", "탱"];
        const types = ["AD", "AP"];

        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        const randomType = types[Math.floor(Math.random() * types.length)];

        // 상태 업데이트
        setTraits({
        role: randomRole,
        type: randomType,
        });
    };


  const handleCardClick = async () => {
    if (!isFlipped) {
      //   setImageUrl(null);
      //   const tmpRandomChampion =
      //     allChampionData[
      //       Object.keys(allChampionData)[
      //         Math.floor(Math.random() * Object.keys(allChampionData).length)
      //       ]
      //     ];
      //   setRandomChampion(tmpRandomChampion);
      //   const image = new Image();
      //   image.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${tmpRandomChampion.id}_0.jpg`;
      //   image.onload = () => {
      //     setImageUrl(image.src); // 이미지 URL 상태 업데이트
      //     setIsFlipped(true); // 카드 플립
      //   };


      if (pickData.checkNormal === "normal") {
        const filteredChampions = Object.values(allChampionData).filter(
          (champion) => {
            console.log(pickData.lane, "Lane filtering");

            // Lane 필터링
            const laneMatch =
              (pickData.lane === "top" &&
                champion.tags.some((tag) => tag !== "Support" && (tag === "Fighter" || tag === "Tank"))) ||
              (pickData.lane === "jg" &&
                champion.tags.some((tag) => tag !== "Support")) ||
              (pickData.lane === "mid" &&
                champion.tags.some((tag) => tag !== "Support" && tag !== "Tank")) ||
              (pickData.lane === "adc" &&
                champion.tags.includes("Marksman")) ||
              (pickData.lane === "sup" &&
                champion.tags.some(
                    (tag) =>
                        tag !== "Marksman" &&
                        tag !== "Fighter" &&
                        tag !== "Assassin" &&
                        (tag === "Support" || tag === "Tank" || tag === "Mage")
                ));

            // Damage Type 필터링
            const damageTypeMatch =
              (pickData.damageType === "AD" && champion.info.magic <= 6) || // AD 조건
              (pickData.damageType === "AP" && champion.info.magic >= 7);   // AP 조건

            return laneMatch && damageTypeMatch;
          }
        );

        console.log(filteredChampions, "Filtered Champions");

        // 필터링된 챔피언에서 랜덤으로 선택
        if (filteredChampions.length > 0) {
          const tmpRandomChampion =
            filteredChampions[
              Math.floor(Math.random() * filteredChampions.length)
            ];
          setRandomChampion(tmpRandomChampion);

          // 이미지 로드 처리
          const image = new Image();
          image.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${tmpRandomChampion.id}_0.jpg`;
          image.onload = () => {
            setImageUrl(image.src); // 이미지 URL 상태 업데이트
            setIsFlipped(true); // 카드 플립
          };
        } else {
          console.log("No champions match the criteria.");
        }
      } else {
        setImageUrl(null);
        const tmpRandomChampion =
          allChampionData[
            Object.keys(allChampionData)[
              Math.floor(Math.random() * Object.keys(allChampionData).length)
            ]
          ];
        setRandomChampion(tmpRandomChampion);
        const image = new Image();
        image.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${tmpRandomChampion.id}_0.jpg`;
        image.onload = () => {
          setImageUrl(image.src); // 이미지 URL 상태 업데이트
          setIsFlipped(true); // 카드 플립
        }
        generateRandomTraits();
      }

      // 조건에 맞는 챔피언 필터링
    //   if (pickData.checkNormal === "normal") {
    //     let filteredChampions = Object.values(allChampionData).filter(
    //       (champion) => {
    //         console.log(pickData.lane, "오승현 찌질이");
    //         if (pickData.lane === "top") {
    //           return champion.tags.some(
    //             (tag) =>
    //               tag !== "Support" && (tag === "Fighter" || tag === "Tank")
    //           );
    //         } else if (pickData.lane === "jg") {
    //           return champion.tags.some((tag) => tag !== "Support");
    //         } else if (pickData.lane === "mid") {
    //           return champion.tags.some(
    //             (tag) => tag !== "Support" && tag !== "Tank"
    //           );
    //         } else if (pickData.lane === "adc") {
    //           return champion.tags.some((tag) => tag === "Marksman");
    //         } else if (pickData.lane === "sup") {
    //           return champion.tags.some(
    //             (tag) =>
    //               tag !== "Marksman" &&
    //               tag !== "Fighter" &&
    //               tag !== "Assassin" &&
    //               (tag === "Support" || tag === "Tank" || tag === "Mage")
    //           );
    //         }
    //       }
    //     );
    //     // dmageType으로 한번 더 필터링
    //     if (pickData.damageType === "ad") {
    //       filteredChampions = filteredChampions.filter((champion) =>
    //         champion.info.magic < 7
    //       );
    //     } else if (pickData.damageType === "ap") {
    //       filteredChampions = filteredChampions.filter((champion) =>
    //         champion.info.magic > 6
    //       );
    //     }

    //     console.log(filteredChampions);

    //     // 필터링된 챔피언에서 랜덤으로 선택
    //     if (filteredChampions.length > 0) {
    //       const tmpRandomChampion =
    //         filteredChampions[
    //           Math.floor(Math.random() * filteredChampions.length)
    //         ];
    //       setRandomChampion(tmpRandomChampion);

    //       // 이미지 로드 처리
    //       const image = new Image();
    //       image.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${tmpRandomChampion.id}_0.jpg`;
    //       image.onload = () => {
    //         setImageUrl(image.src); // 이미지 URL 상태 업데이트
    //         setIsFlipped(true); // 카드 플립
    //       };
    //     }
    //   } else {
    //   }
      // checkNormal이 "normal"이면 lane과 damageType이 ""이 아닌지 검사
    }
    await new Promise((resolve) => {
      setIsFlipped(!isFlipped);
      resolve(null);
    });
  };
  console.log(allChampionData);
  // allChampionData에서 랜덤으로 챔피언을 한개 뽑아서 표기

  return (
    <>
      {isSearch ? (
        <div style={{display:"flex", flexDirection:"row"}}>
          <div className={`${cardStyles.scene} ${cardStyles.scene_card}`}>
            <div
              className={`${cardStyles.card} ${
                isFlipped ? cardStyles.is_flipped : ""
              }`}
              onClick={handleCardClick}
            >
              <div
                className={`${cardStyles.card_face} ${cardStyles.card_face_front}`}
              ></div>
              {/* <img className={`${cardStyles.card_face} ${cardStyles.card_face_back}`} style={{backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${randomChampion?.id}_0.jpg")`, width:"100%", height:"100%", objectFit:"contain"}}></img> */}
              {/* <div className={`${cardStyles.card_face} ${cardStyles.card_face_back}`} style={{backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${randomChampion?.id}_0.jpg")`, backgroundSize: "contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}> */}
              <div
                className={`${cardStyles.card_face} ${cardStyles.card_face_back}`}
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <p
                  style={{
                    position: "absolute",
                    top: "46%",
                    left: "5%",
                    fontSize: "13px",
                  }}
                >
                  {randomChampion?.name}
                </p>
              </div>
            </div>
          </div>
          {isFlipped && pickData.checkNormal === "normal" && (
            <div>
                <p>{lane} {traits?.type} {traits?.role} {randomChampion?.name}</p>
                <p>추천 룬</p>
                <p>추천 아이템</p>
            </div>
          )}
          {isFlipped && pickData.checkNormal === "unNormal" && (
            <div>
                <p>{lane} {traits?.type} {traits?.role} {randomChampion?.name}</p>
                <p>추천 룬</p>
                <p>추천 아이템</p>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
