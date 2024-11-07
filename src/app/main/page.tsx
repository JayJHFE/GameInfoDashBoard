"use client";
import { useEffect, useState } from "react";

export default function MainClient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/loadRotationChamp");
        const result = await response.json();

        setData(result); // 상태에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from API Route:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
