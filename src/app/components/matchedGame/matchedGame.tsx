interface Participant {
  championName: string;
  puuid: string;
  [key: string]: string | number | boolean | object;
}
interface InfoData {
  endOfGameResult: string;
  gameMode: string;
  gameDuration: number;
  gameId: number;
  participants: Participant[];
}
interface MatchedGameProps {
  gameData: {
    info: InfoData;
    metatdata: { [key: string]: string | number | object };
  };
  puuidSearched: string;
}

export default function MatchedGame({
  gameData,
  puuidSearched,
}: MatchedGameProps) {
  console.log(gameData);
  console.log(puuidSearched);
  return (
    <div>
      {gameData.info.participants.map((participants, index) => (
        <div key={index}>
          {puuidSearched === participants.puuid ? (
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${participants?.championName}.png`}
              alt={participants.championName}
            />
          ) : (
            ""
          )}
        </div>
      ))}
      <h1>Matched Game</h1>
    </div>
  );
}
