import { useRef } from 'react';
import cardStyles from './randomChampionCard.module.css';

export default function RandomChampionCard() {
    const cardRef = useRef<HTMLDivElement>(null);
    const handleCardClick = () => {
        if (cardRef.current) {
            cardRef.current.classList.toggle(cardStyles.is_flipped);
        }
    };
    return (
        <>
            <div className={`${cardStyles.scene} ${cardStyles.scene_card}`} onClick={handleCardClick}>
                <div ref={cardRef}className={cardStyles.card}>
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_front}`}>front</div>
                    <div className={`${cardStyles.card_face} ${cardStyles.card_face_back}`}>back</div>
                </div>
            </div>
        </>
    )
}