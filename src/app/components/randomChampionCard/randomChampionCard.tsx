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

interface ChampionData {
    [key: string]: Champion;
  }
interface AramChampionTierProps {
    allChampionData: ChampionData; // ChampionData 타입을 사용하여 allChampionData 선언
}



export default function RandomChampionCard(allChampionData: AramChampionTierProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [randomChampion, setRandomChampion] = useState<Champion | null>(null);
    const handleCardClick = async () => {
        if (!isFlipped) {
            const tmpRandomChampion =
                allChampionData.allChampionData[
                    Object.keys(allChampionData.allChampionData)[
                        Math.floor(Math.random() * Object.keys(allChampionData.allChampionData).length)
                    ]
                ];
            setRandomChampion(tmpRandomChampion);
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
            <div className={`${cardStyles.scene} ${cardStyles.scene_card}`}>
                <div className={`${cardStyles.card} ${isFlipped ? cardStyles.is_flipped : ''}`} onClick={handleCardClick}>
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_front}`}></div>
                    {/* <img className={`${cardStyles.card_face} ${cardStyles.card_face_back}`} style={{backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${randomChampion?.id}_0.jpg")`, width:"100%", height:"100%", objectFit:"contain"}}></img> */}
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_back}`} style={{backgroundImage: `url("https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${randomChampion?.id}_0.jpg")`, backgroundSize: "contain", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}>
                        <p style={{position:"absolute", top: "46%", left:"5%", fontSize:"13px"}}>{randomChampion?.name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}