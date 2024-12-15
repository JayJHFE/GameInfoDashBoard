interface Participant {
  championName: string;
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
}

export default function MatchedGame(gameData: MatchedGameProps) {
  console.log(gameData.gameData);
  return (
    <div>
      {gameData.gameData.info.participants.map((participants, index) => (
        <div key={index}>
          {typeof participants.puuid === "string" ? participants.puuid : ""}
        </div>
      ))}
      <h1>Matched Game</h1>
    </div>
  );
}
