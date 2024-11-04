import HomePageClient from "./HomePageClient";
import { loadRotationChamp } from "../app/api/loadRotationChamp";

export default async function HomePage() {
  const data = await loadRotationChamp("https://api.example.com/data");

  return <HomePageClient data={data} />;
}
