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
  allChampionData: ChampionData; // ChampionData 타입을 사용하여 allChampionData 선언
}

const exceptions: { [key: string]: string } = {
  Wukong: "MonkeyKing",
  Drmundo: "DrMundo",
  Twistedfate: "TwistedFate",
  Tahmkench: "TahmKench",
  Xinzhao: "XinZhao",
  Kogmaw: "KogMaw",
  Reksai: "RekSai",
  Jarvaniv: "JarvanIV",
  Leesin: "LeeSin",
  Renataglasc: "Renata",
  Ksante: "KSante",
  Masteryi: "MasterYi",
  Missfortune: "MissFortune",
  Nunuwillump: "Nunu",
  Aurelionsol: "AurelionSol",
};

export default function AramChampionTier({
  aramChamps,
  allChampionData,
}: AramChampionTierProps) {
  // console.log(allChampionData, "도찌");
  // console.log("allChampionData:", JSON.stringify(allChampionData, null, 2));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>칼바람 나락 챔피언 티어</h2>
      <div></div>
      <ul style={{ maxHeight: "50vh", overflowY: "auto", width: "20vw" }}>
        {aramChamps.map((aramChamp) => {
          // allChampionData에서 name이 일치하는 챔피언을 찾기
          const matchedChampion = Object.values(allChampionData).find(
            (champion) => {
              if (champion.id === aramChamp.name) {
                return champion;
              } else if (exceptions.hasOwnProperty(aramChamp.name)) {
                return champion.id === exceptions[aramChamp.name];
              }
            }
          );

          if (!matchedChampion) {
            console.log(`No match found for ARAM champion: ${aramChamp.name}`);
          }

          return (
            <li style={{ listStyle: "none" }} key={aramChamp.name}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${matchedChampion?.id}.png`}
              />
              <strong>{matchedChampion?.name}</strong> - Tier: {aramChamp.tier}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
