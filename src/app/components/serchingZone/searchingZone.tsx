import { useState } from "react";
import styles from "./searchingZone.module.css";

interface PickData {
  checkNormal: string;
  lane: string;
  damageType: string;
}

interface PickDataProps {
  pickData: PickData;
  setPickData: React.Dispatch<React.SetStateAction<PickData>>;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchingZone({
  pickData,
  setPickData,
  setIsSearch,
}: PickDataProps) {
  const [checkNormal, setCheckNormal] = useState("normal");
  const handleCheckNormal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNormal(e.target.value);
    setPickData({
      ...pickData,
      checkNormal: e.target.value,
    });
  };
  const hadnleCheckLane = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPickData({
      ...pickData,
      lane: e.target.value,
    });
  };
  const handleCheckDamageType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickData({
      ...pickData,
      damageType: e.target.value,
    });
  };
  const startSearch = () => {
    console.log(pickData);
    if (pickData.checkNormal === "normal") {
      // pickData의 lane과 damageType이 ""이 아닌지 검사
      if (pickData.lane !== "" && pickData.damageType !== "") {
        setIsSearch(true);
      } else {
        alert("오찌도찌새끼");
      }
    } else {
      if (pickData.lane !== "") {
        setIsSearch(true);
      } else {
        alert("오찌도찌새끼");
      }
    }
  };
  return (
    <div className={styles.searchingZoneOuterContainer}>
      <h1>Searching Zone</h1>
      <div>
        <label>정상픽</label>
        <input
          type="radio"
          name="checkingNormal"
          value="normal"
          onChange={handleCheckNormal}
          checked={checkNormal === "normal"}
        />
        <label>즐겜픽</label>
        <input
          type="radio"
          name="checkingNormal"
          value="unNormal"
          onChange={handleCheckNormal}
          checked={checkNormal === "unNormal"}
        />
      </div>
      <select onChange={hadnleCheckLane}>
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
              <input
                type="radio"
                name="damageType"
                value="AP"
                onChange={handleCheckDamageType}
              />
              <label>AD</label>
              <input
                type="radio"
                name="damageType"
                value="AD"
                onChange={handleCheckDamageType}
              />
            </div>
            <button onClick={startSearch}>검색하기</button>
          </div>
        </>
      ) : (
        <>
          <button onClick={startSearch}>돌리기</button>
        </>
      )}
    </div>
  );
}
