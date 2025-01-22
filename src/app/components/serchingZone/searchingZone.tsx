import { useState } from "react";
import { Radio, RadioChangeEvent, Select, Button } from "antd";
import { GiBrassEye } from "react-icons/gi";
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
  const [damageType, setDamageType] = useState("AD");
  const [selectedValue, setSelectedValue] = useState("탑");

  const handleCheckNormal = (e: RadioChangeEvent) => {
    setCheckNormal(e.target.value);
    setPickData({
      ...pickData,
      checkNormal: e.target.value,
    });
  };
  const hadnleCheckLane = (value: string) => {
    setSelectedValue(value);
    setPickData({
      ...pickData,
      lane: value,
    });
  };
  const handleCheckDamageType = (e: RadioChangeEvent) => {
    setDamageType(e.target.value);
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
        alert("오승현찌질이");
      }
    } else {
      if (pickData.lane !== "") {
        setIsSearch(true);
      } else {
        alert("오승현찌질이");
      }
    }
  };
  const options = [
    { label: "탑", value: "top" },
    { label: "정글", value: "jg" },
    { label: "미드", value: "mid" },
    { label: "원딜", value: "adc" },
    { label: "서폿", value: "sup" },
  ];
  return (
    <div className={styles.searchingZoneOuterContainer}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GiBrassEye size={25} style={{ marginRight: "10px" }} />
        <h1>챔피언 추천기</h1>
      </div>
      <div>
        <Radio.Group
          onChange={handleCheckNormal}
          value={checkNormal} // 현재 상태값에 따라 선택
          optionType="button"
          buttonStyle="solid"
          className={styles.radioGroup}
        >
          <Radio.Button value="normal" className={styles.radioTwoButton}>
            정상픽
          </Radio.Button>
          <Radio.Button value="unNormal" className={styles.radioTwoButton}>
            즐겜픽
          </Radio.Button>
        </Radio.Group>
      </div>
      <Select
        value={selectedValue}
        // onChange={handleProvinceChange}
        onChange={(value) => hadnleCheckLane(value)}
        // onChange={hadnleCheckLane}
        options={options.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        className={styles.selectAntd}
      />
      {checkNormal === "normal" ? (
        <>
          <div className={styles.searchingZoneInnerContainer}>
            <div style={{ marginBottom: "20px" }}>
              <Radio.Group
                onChange={handleCheckDamageType}
                value={damageType} // 현재 상태값에 따라 선택
                optionType="button"
                buttonStyle="solid"
                className={styles.radioGroup}
              >
                <Radio.Button value="AD" className={styles.radioThreeButton}>
                  AD
                </Radio.Button>
                <Radio.Button value="AP" className={styles.radioThreeButton}>
                  AP
                </Radio.Button>
                <Radio.Button
                  style={{ fontSize: "13px" }}
                  value="none"
                  className={styles.radioThreeButton}
                >
                  랜덤
                </Radio.Button>
              </Radio.Group>
            </div>
            <Button
              color="default"
              variant="outlined"
              onClick={startSearch}
              className={styles.buttonAntd}
            >
              검 색
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button
            color="default"
            variant="outlined"
            onClick={startSearch}
            className={styles.buttonAntd}
          >
            돌리기
          </Button>
        </>
      )}
    </div>
  );
}
