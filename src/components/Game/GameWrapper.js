import { useCallback, useState } from 'react';
import GameField from './GameField';
import GameResults from './GameResults';
import GameStart from './GameStart';

const PENDING = 'pending',
  STARTED = 'started',
  FINISHED = 'finished';

const GameWrapper = () => {
  const [gameState, setGameState] = useState(PENDING);
  const [scores, setScores] = useState([0, 0]);
  const [gameResult, setGameResult] = useState(null);
  const [playerNames, setPlayerNames] = useState({
    player1: 'Player 1',
    player2: 'Player 2',
  });

  const startGameHandler = (player1, player2) => {
    setGameState(STARTED);
    const updatedPlayerNames = { ...playerNames, player1, player2 };
    setPlayerNames(updatedPlayerNames);
  };

  const finishGame = useCallback((result) => {
    setGameState(FINISHED);
    setGameResult(result);
  }, []);

  const pickNewPlayers = () => {
    setGameState(PENDING);
    setScores([0, 0]);
  };
  const startNewRound = () => {
    setGameState(STARTED);
    setScores((curState) => {
      const updatedScores = [...curState];
      gameResult.includes(playerNames.player1) && updatedScores[0]++;
      gameResult.includes(playerNames.player2) && updatedScores[1]++;
      return updatedScores;
    });
  };

  return (
    <section className="game-wrapper">
      {gameState === PENDING && <GameStart started={startGameHandler} />}
      {gameState === FINISHED && (
        <GameResults
          newPlayers={pickNewPlayers}
          newRound={startNewRound}
          result={gameResult}
        />
      )}
      <GameField names={playerNames} finish={finishGame} />
      <div>
        <h2>Score</h2>
        <ul className="game-wrapper__score-list">
          <li>
            {playerNames.player1}: {scores[0]}
          </li>
          <li>
            {playerNames.player2}: {scores[1]}
          </li>
        </ul>
      </div>
    </section>
  );
};
export default GameWrapper;
