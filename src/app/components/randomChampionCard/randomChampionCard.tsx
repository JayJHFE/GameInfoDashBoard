import { useRef, useState } from 'react';
import cardStyles from './randomChampionCard.module.css';

export default function RandomChampionCard() {
    const [isFlipped, setIsFlipped] = useState(false);
    // const cardRef = useRef<HTMLDivElement>(null);
    // const handleCardClick = () => {
    //     if (cardRef.current) {
    //         cardRef.current.classList.toggle(cardStyles.is_flipped);
    //     }
    // };
    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };
    return (
        <>
            <div className={`${cardStyles.scene} ${cardStyles.scene_card}`}>
                <div className={`${cardStyles.card} ${isFlipped ? cardStyles.is_flipped : ''}`} onClick={handleCardClick}>
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_front}`}></div>
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_back}`}></div>
                </div>
            </div>
        </>
    )
}