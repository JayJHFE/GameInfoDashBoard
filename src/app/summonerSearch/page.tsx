"use client";
import { useEffect, useState } from "react";

export default function SummonerSearch() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(""); // 오류 메시지를 초기화
  };

  const handleSearch = async () => {
    // 아이디 #태그 형식인지 확인
    // const regex = /^[\w가-힣]+#[\w가-힣]+$/; // 한글 포함
    // const regex = /^[\w가-힣]+#.+$/;
    const regex = /^[^\s#]+#[^\s].+$/;

    if (!regex.test(inputValue)) {
      setError("아이디와 태그는 '아이디 #태그' 형식으로 입력해주세요.");
      return;
    }

    // 입력값 분리
    const [id, tag] = inputValue.split("#");

    try {
      // 인코딩된 URL 생성
      // const encodedId = encodeURIComponent(id);
      // const encodedTag = encodeURIComponent(tag);
      // const encodedId = id;
      // const encodedTag = tag;

      const requestUrl = `/api/searchUserNickName/${id}/${tag}`;
      // const requestUrl = `/api/searchUserNickName/${encodedId}/${encodedTag}`;
      console.log("Request URL:", requestUrl);

      const response = await fetch(requestUrl, { method: "GET" });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching summoner data:", error);
      setError("소환사 정보를 가져오는 중 오류가 발생했습니다.");
    }
  };

  // useEffect(() => {
  //   console.log(inputValue);
  // }, [inputValue]);

  return (
    <div>
      <h1>Summoner Search</h1>
      <div>
        <h2>아이디를 입력해주세요</h2>
        <input
          type="text"
          placeholder="아이디 #태그"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <h3>검색 결과:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
