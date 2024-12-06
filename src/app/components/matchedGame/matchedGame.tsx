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
interface GameData {
    info : InfoData;
    metatdata : {[key: string]: string | number | object;};
}
interface MatchedGameProps {
    gameData: GameData;
}

export default function MatchedGame(gameData : MatchedGameProps) {
    return (
        <div>
            <h1>Matched Game</h1>
        </div>
    );
}