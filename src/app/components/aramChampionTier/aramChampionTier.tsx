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
    console.log(aramChamps);
    console.log(allChampionData);
    return <>
            <h2>정보 표기</h2>
              <ul>
                {aramChamps.map((aramChamp) => {
                  // allChampionData에서 name이 일치하는 챔피언을 찾기
                  const matchedChampion = Object.values(allChampionData).find(
                    (champion) => champion.id === aramChamp.name
                  );

                  if (!matchedChampion) {
                    console.warn(`No match found for ARAM champion: ${aramChamp.name}`);
                  }

                  return (
                    <li key={aramChamp.name}>
                      <img src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${matchedChampion?.id}.png`} />
                      <strong>{matchedChampion?.name}</strong> - Tier: {aramChamp.tier}
                    </li>
                  );
                })}
              </ul>
              {/* <ul>
              {aramChamps.map((aramChamp) => {
                // allChampionData에서 name이 일치하는 챔피언을 찾기
                const matchedChampion = Object.values(allChampionData).find(
                  (champion) => {
                    // console.log(`aramChamp.name: ${aramChamp.name}, champion.name: ${champion.name}`);
                    return champion.id === aramChamp.name;
                  }
                );

                // matchedChampion이 undefined인 경우와 아닌 경우를 확인
                if (!matchedChampion) {
                  console.warn(`No match found for ARAM champion: ${aramChamp.name}`);
                }

                return (
                  <li key={aramChamp.name}>
                    {matchedChampion && (
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${matchedChampion.id}.png`}
                        alt={matchedChampion.name}
                      />
                    )}
                    <strong>{aramChamp.name}</strong> - Tier: {aramChamp.tier}
                    {matchedChampion && <p>ID: {matchedChampion.id}</p>}
                  </li>
                );
              })}
            </ul> */}
           </>
}