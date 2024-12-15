interface Participant {
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
  info: InfoData;
  metatdata: { [key: string]: string | number | object };
}

export default function MatchedGame(gameData: MatchedGameProps) {
  return (
    <div>
      {gameData.info.participants.map((participant, index) => (
        <div key={index}>
          {/* <p>Participant ID: {participant.id}</p> */}
          {/* <p>Participant Name: {participant.name}</p> */}
          {/* 필요한 데이터를 추가로 표시 */}
        </div>
      ))}
      <h1>Matched Game</h1>
    </div>
  );
}
