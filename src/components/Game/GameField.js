import { useEffect, useState } from 'react';
import {
  allSquares,
  checkIsDraw,
  checkWinnigCombination,
} from '../../shared/winningCombinations';
import Modal from '../UI/Modal';

const GameField = (props) => {
  const { names, finish } = props;
  const [player1Moves, setPlayer1Moves] = useState([]);
  const [player2Moves, setPlayer2Moves] = useState([]);
  const [isPlayer1Move, setIsPlayer1Move] = useState(true);
  const [winState, setWinState] = useState(null);
  const [isError, setIsError] = useState(false);
  const player1Symbol = 'cross';
  const player2Symbol = 'nought';
  const currentSymbol = isPlayer1Move ? player1Symbol : player2Symbol;
  const { isWinning: isPlayer1Won, winComb: player1Comb } =
    checkWinnigCombination(player1Moves);
  const { isWinning: isPlayer2Won, winComb: player2Comb } =
    checkWinnigCombination(player2Moves);
  const winComb = player1Comb || player2Comb;
  const usedSquares = player1Moves.concat(player2Moves);
  const emptySquares = [...allSquares];
  usedSquares.forEach((usedSq) => {
    const index = emptySquares.indexOf(usedSq);
    index >= 0 && emptySquares.splice(index, 1);
  });
  const isDraw = checkIsDraw(
    emptySquares,
    player1Moves,
    player2Moves,
    isPlayer1Move
  );

  let winlineClass = 'win-line ';
  switch (winComb) {
    case '123':
      winlineClass += 'comb1';
      break;
    case '456':
      winlineClass += 'comb2';
      break;
    case '789':
      winlineClass += 'comb3';
      break;
    case '147':
      winlineClass += 'comb4';
      break;
    case '258':
      winlineClass += 'comb5';
      break;
    case '369':
      winlineClass += 'comb6';
      break;
    case '159':
      winlineClass += 'comb7';
      break;
    case '357':
      winlineClass += 'comb8';
      break;
    default:
      break;
  }

  const player1Move = (id) => {
    setPlayer1Moves((curState) => {
      const updatedState = [...curState];
      updatedState.push(id);
      return updatedState;
    });
  };
  const player2Move = (id) => {
    setPlayer2Moves((curState) => {
      const updatedState = [...curState];
      updatedState.push(id);
      return updatedState;
    });
  };

  const closeErrorHandler = () => setIsError(false);

  const clickSquareHandler = (id) => {
    const currentSquare = document.getElementById('square' + id);
    if (
      currentSquare.className.includes('cross') ||
      currentSquare.className.includes('nought')
    ) {
      setIsError(true);
      return;
    }
    currentSquare.classList.add(`square-item__${currentSymbol}`);
    if (isPlayer1Move) {
      player1Move(id);
      setIsPlayer1Move(false);
    } else {
      player2Move(id);
      setIsPlayer1Move(true);
    }
  };

  useEffect(() => {
    isPlayer1Won && setWinState(`${names.player1} is a winner`);
    isPlayer2Won && setWinState(`${names.player2} is a winner`);
    (isDraw || usedSquares.length === 9) && setWinState('You have a draw');
  }, [isPlayer1Won, usedSquares, isPlayer2Won, names, isDraw]);

  useEffect(() => {
    let timer;
    if (winState) {
      timer = setTimeout(() => {
        finish(winState);
        for (let i = 1; i < 10; i++) {
          const square = document.getElementById('square' + i);
          square.className = 'square-item';
        }
        setPlayer1Moves([]);
        setPlayer2Moves([]);
        setIsPlayer1Move(true);
        setWinState(null);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [winState, finish]);

  const squares = [];
  for (let i = 1; i <= allSquares.length; i++) {
    squares.push(
      <li
        key={i}
        id={'square' + i}
        className="square-item"
        onClick={clickSquareHandler.bind(null, i)}
      ></li>
    );
  }

  return (
    <>
      {isError && (
        <Modal close={closeErrorHandler}>
          <h3>You need to pick an empty square to make a move</h3>
          <button className="btn" onClick={closeErrorHandler}>
            OK
          </button>
        </Modal>
      )}
      <div className="game-wrapper__game-field">
        <ul>{squares}</ul>
        <div className={winlineClass} />
        <p>{isPlayer1Move ? names.player1 : names.player2}'s move</p>
      </div>
    </>
  );
};
export default GameField;
