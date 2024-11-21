import { useState } from 'react';
import cardStyles from './randomChampionCard.module.css';
import { url } from 'inspector';


interface Champion {
    tags: string;
    id: string;
    key: string;
    name: string;
    image: string;
  }

  interface PickData {
    checkNormal: string;
    lane : string;
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



export default function RandomChampionCard({allChampionData, pickData, isSearch}: AramChampionTierProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [randomChampion, setRandomChampion] = useState<Champion | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const handleCardClick = async () => {
        if (!isFlipped) {
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

        }
        await new Promise((resolve) => {
            setIsFlipped(!isFlipped);
            resolve(null);
        });
    };
    console.log(allChampionData);
    // allChampionData에서 랜덤으로 챔피언을 한개 뽑아서 표기

    console.log(randomChampion);
    return (
        <>
        {isSearch ? (
            <div>
                <div className={`${cardStyles.scene} ${cardStyles.scene_card}`}>
                <div className={`${cardStyles.card} ${isFlipped ? cardStyles.is_flipped : ''}`} onClick={handleCardClick}>
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_front}`}></div>
                    {/* <img className={`${cardStyles.card_face} ${cardStyles.card_face_back}`} style={{backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${randomChampion?.id}_0.jpg")`, width:"100%", height:"100%", objectFit:"contain"}}></img> */}
                    {/* <div className={`${cardStyles.card_face} ${cardStyles.card_face_back}`} style={{backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${randomChampion?.id}_0.jpg")`, backgroundSize: "contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}> */}
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_back}`} style={{backgroundImage: imageUrl ? `url(${imageUrl})` : 'none', backgroundSize: "contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}>
                        <p style={{position:"absolute", top: "46%", left:"5%", fontSize:"13px"}}>{randomChampion?.name}</p>
                    </div>
                </div>
            </div>
            </div>
        ) : (
            <></>
        )}
        </>
    )
}