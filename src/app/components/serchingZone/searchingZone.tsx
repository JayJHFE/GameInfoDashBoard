import { useState } from "react";
import { Radio } from "antd";
import styles from "./searchingZone.module.css";
import { RadioChangeEvent } from "antd";

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

  const handleCheckNormal = (e: RadioChangeEvent) => {
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
      <h1>챔피언 추천기</h1>
      <div>
        <Radio.Group
          onChange={handleCheckNormal}
          value={checkNormal} // 현재 상태값에 따라 선택
          optionType="button"
          buttonStyle="solid"
        >
          <Radio.Button value="normal">정상픽</Radio.Button>
          <Radio.Button value="unNormal">즐겜픽</Radio.Button>
        </Radio.Group>
        {/* <input
          type="radio"
          name="checkingNormal"
          value="normal"
          onChange={handleCheckNormal}
          checked={checkNormal === "normal"}
        />
        <label>정상픽</label>

        <input
          type="radio"
          name="checkingNormal"
          value="unNormal"
          onChange={handleCheckNormal}
          checked={checkNormal === "unNormal"}
        />
        <label>즐겜픽</label> */}
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
              <input
                type="radio"
                name="damageType"
                value="AP"
                onChange={handleCheckDamageType}
              />
              <label>AP</label>

              <input
                type="radio"
                name="damageType"
                value="AD"
                onChange={handleCheckDamageType}
              />
              <label>AD</label>

              <input
                type="radio"
                name="damageType"
                value="none"
                onChange={handleCheckDamageType}
              />
              <label>랜덤</label>
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
