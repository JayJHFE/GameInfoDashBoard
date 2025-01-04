import { useEffect, useState } from "react";
import cardStyles from "./randomChampionCard.module.css";

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

interface PickData {
  checkNormal: string;
  lane: string;
  damageType: string;
}

interface ChampionData {
  [key: string]: Champion;
}

interface RuneData {
  [key: string]: any;
}
interface AramChampionTierProps {
  allChampionData: ChampionData;
  pickData: PickData;
  isSearch: boolean;
}
interface RandomTraits {
  role: string;
  type: string;
  rune: string;
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
  const [runeData, setRuneData] = useState<RuneData>({});

  useEffect(() => {
    if (pickData.lane === "top") setLane("탑");
    else if (pickData.lane === "jg") setLane("정글");
    else if (pickData.lane === "mid") setLane("미드");
    else if (pickData.lane === "adc") setLane("원딜");
    else if (pickData.lane === "sup") setLane("서폿");
  }, [pickData.lane]);

  useEffect(() => {
    async function fetchRuneData() {
      try {
        const runeResponse = await fetch("/LeagueofLegendData/runes.json");
        const runeDatajson: RuneData = await runeResponse.json();
        setRuneData(runeDatajson);
        console.log(runeDatajson, "Rune data loaded");
      } catch (error) {
        console.error("Error loading rune data:", error);
      }
    }
    fetchRuneData();
  }, []);

  const generateRandomTraits = () => {
    // 랜덤 값 생성
    const roles = ["딜", "탱"];
    const types = ["AD", "AP"];

    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];

    // 상태 업데이트
    setTraits((prevTraits) => ({
      role: randomRole,
      type: randomType,
      rune: prevTraits?.rune || "룬 없음",
    }));
  };

  const handleCardClick = async () => {
    if (!isFlipped) {
      if (pickData.checkNormal === "normal") {
        const filteredChampions = Object.values(allChampionData).filter(
          (champion) => {
            const laneMatch =
              (pickData.lane === "top" &&
                !champion.tags.includes("Support") &&
                (champion.tags.includes("Fighter") ||
                  champion.tags.includes("Tank"))) ||
              (pickData.lane === "jg" && !champion.tags.includes("Support")) ||
              (pickData.lane === "mid" &&
                !champion.tags.includes("Support") &&
                !champion.tags.includes("Tank")) ||
              (pickData.lane === "adc" && champion.tags.includes("Marksman")) ||
              (pickData.lane === "sup" &&
                !champion.tags.includes("Marksman") &&
                !champion.tags.includes("Fighter") &&
                !champion.tags.includes("Assassin") &&
                (champion.tags.includes("Support") ||
                  champion.tags.includes("Tank") ||
                  champion.tags.includes("Mage")));

            // 랜덤 타입 선택 (damageType이 "none"인 경우)
            let selectedDamageType = pickData.damageType;
            if (pickData.damageType === "none") {
              selectedDamageType = Math.random() < 0.5 ? "AD" : "AP"; // 50% 확률로 AD 또는 AP
            }

            // Damage Type 필터링
            const damageTypeMatch =
              (selectedDamageType === "AD" && champion.info.magic <= 6) || // AD 조건
              (selectedDamageType === "AP" && champion.info.magic >= 7);

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
        const randomIndex = Math.floor(Math.random() * 6); // 랜덤 인덱스 (0~5)
        const selectedRuneData = runeData[randomIndex]; // 랜덤 runeData

        if (selectedRuneData?.slots?.[0]?.runes) {
          const runes = selectedRuneData.slots[0].runes; // slot[0].runes
          const randomRuneIndex = Math.floor(Math.random() * runes.length); // runes 랜덤 인덱스
          const randomRune = runes[randomRuneIndex]; // 랜덤 룬

          // 랜덤 룬 데이터 업데이트
          setTraits((prevTraits) => ({
            role: prevTraits?.role || "",
            type: prevTraits?.type || "",
            rune: randomRune?.name,
          }));
        }
        console.log(traits, "Traits");
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
        };
        generateRandomTraits();
      }
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
        <div style={{ display: "flex", flexDirection: "row" }}>
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
          {runeData && isFlipped && pickData.checkNormal === "normal" && (
            <div>
              <p>
                {lane} {traits?.type} {traits?.role} {randomChampion?.name}
              </p>
              <p>추천 룬</p>
              <p>{traits?.rune}</p>
              {/* <p>추천 아이템</p> */}
            </div>
          )}
          {runeData && isFlipped && pickData.checkNormal === "unNormal" && (
            <div>
              <p>
                {lane} {traits?.type} {traits?.role} {randomChampion?.name}
              </p>
              <p>추천 룬</p>
              <p>{traits?.rune}</p>
              {/* <p>추천 아이템</p> */}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
