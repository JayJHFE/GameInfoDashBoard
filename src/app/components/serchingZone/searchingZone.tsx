import { useState } from "react";
import styles from "./searchingZone.module.css";

interface PickData {
    checkNormal: string;
    lane : string;
}


interface PickDataProps {
    pickData: PickData;
    setPickData: React.Dispatch<React.SetStateAction<PickData>>;
}

export default function SearchingZone({pickData, setPickData}: PickDataProps) {
    const [checkNormal, setCheckNormal] = useState("");
    const handleCheckNormal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckNormal(e.target.value);
    }
    return (
        <div className={styles.searchingZoneOuterContainer}>
         <h1>Searching Zone</h1>
            <div>
                <label>정상픽</label>
                <input type="radio" name="checkingNormal" value="normal" onChange={handleCheckNormal} />
                <label>즐겜픽</label>
                <input type="radio" name="checkingNormal" value="unNormal" onChange={handleCheckNormal}/>
            </div>
            <select>
                <option value="top">탑</option>
                <option value="jg">정글</option>
                <option value="mid">미드</option>
                <option value="adc">원딜</option>
                <option value="sup">서폿</option>
            </select>
            {checkNormal === "normal" ? (
                <>
                    <div className={styles.searchingZoneInnerContainer}>
                        <div>
                            <label>AP</label>
                            <input type="radio" name="damageType" value="AP" />
                            <label>AD</label>
                            <input type="radio" name="damageType" value="AD" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <button>돌리기</button>
                </>
            )}
        </div>
    )
}