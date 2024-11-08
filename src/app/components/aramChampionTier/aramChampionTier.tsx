interface Champion {
  tags: string;
  id: string;
  key: string;
  name: string;
  image: string;
}

interface ChampionData {
  [key: string]: Champion;
}
interface AramChampionTierProps {
  aramChamps: { name: string; tier: string }[];
  allChampionData: ChampionData;  // ChampionData 타입을 사용하여 allChampionData 선언
}
export default function AramChampionTier ({ aramChamps, allChampionData }: AramChampionTierProps ) {
    // console.log(aramChamps);
    console.log(allChampionData);
    // https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/Aatrox.png
    return <>
                <div>
                    오찌도찌
                </div>
           </>
}