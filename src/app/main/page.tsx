"use client";
import { useEffect, useState } from "react";

export default function MainClient() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Fetching data from custom API route...");
    fetch("/api/loadRotationChamp") // 절대 경로로 설정
      .then((response) => response.json())
      .then((result) => {
        console.log("Data fetched from API route:", result);
        setData(result);
      })
      .catch((error) => console.error("Error fetching data on client:", error));
  }, []);
  console.log(data);
  return (
    <div>
      <h1>Data from API Route:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
// "use client";

// export default function Main() {
//   return (
//     <div>
//       <h1>오찌도찌</h1>
//     </div>
//   );
// }
