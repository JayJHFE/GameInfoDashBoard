import styles from "./searchingZone.module.css";

export default function SearchingZone() {
    return (
        <div className={styles.searchingZoneInnerContainer}>
            <h1>Searching Zone</h1>
            <div>
                <label>Normal</label>
                <input type="radio" name="checkingNormal" value="normal" />
                <label>UnNormal</label>
                <input type="radio" name="checkingNormal" value="unNormal" />
            </div>
            <select>
                <option value="top">탑</option>
                <option value="jg">정글</option>
                <option value="mid">미드</option>
                <option value="adc">원딜</option>
                <option value="sup">서폿</option>
            </select>
            <select>
                <option value="top">탑</option>
                <option value="jg">정글</option>
                <option value="mid">미드</option>
                <option value="adc">원딜</option>
                <option value="sup">서폿</option>
            </select>
        </div>
    )
}