// "use client";
// import { useEffect, useState } from "react";

// export default function MainClient() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     console.log("Fetching data from custom API route...");
//     fetch("/api/loadRotationChamp") // 절대 경로로 설정
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("Data fetched from API route:", result);
//         setData(result);
//       })
//       .catch((error) => console.error("Error fetching data on client:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Data from API Route:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
"use client"; // 클라이언트 컴포넌트로 전환

type MainProps = {
  data: any;
};

export default function Main({ data }: MainProps) {
  console.log("Data in Main component:", data); // 클라이언트 콘솔에서 데이터 확인

  return (
    <div>
      <h1>오찌도찌</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
