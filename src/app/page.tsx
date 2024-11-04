// import Main from "./main/page";
// // import axiosFetch from "./api/loadRotationChamp";
// import { fetchFetch } from "./api/loadRotationChamp";

// export default async function HomePage() {
//   const data = await fetchFetch("https://lol/platform/v3/champion-rotations");
//   // const data = await axiosFetch("https://lol/platform/v3/champion-rotations");
//   console.log(data);

//   return (
//     <div>
//       <Main data={data} />
//     </div>
//   );
// }

// app/page.tsx
import Main from "./main/page"; // 클라이언트 컴포넌트 사용

export default async function HomePage() {
  const response = await fetch("http://localhost:3000/api/loadRotationChamp", {
    cache: "no-store", // 최신 데이터를 가져오도록 설정 (선택 사항)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data = await response.json();

  return (
    <div>
      <Main data={data} />
    </div>
  );
}
