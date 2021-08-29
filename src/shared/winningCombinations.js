export const allSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const winnigCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export const checkWinnigCombination = (squaresComb) => {
  let isWinning = false;
  let winComb;
  for (const combination of winnigCombinations) {
    if (
      squaresComb.includes(combination[0]) &&
      squaresComb.includes(combination[1]) &&
      squaresComb.includes(combination[2])
    ) {
      isWinning = true;
      winComb = isWinning && combination.join('');
      break;
    }
  }
  return { isWinning, winComb };
};

export const checkIsDraw = (empty, player1, player2, isPlayer1Move) => {
  const possibleWinComb = winnigCombinations.map((item) => {
    if (
      (player1.includes(item[0]) &&
        player2.includes(item[1]) &&
        empty.includes(item[2])) ||
      (player1.includes(item[0]) &&
        empty.includes(item[1]) &&
        player2.includes(item[2])) ||
      (empty.includes(item[0]) &&
        player1.includes(item[1]) &&
        player2.includes(item[2])) ||
      (player2.includes(item[0]) &&
        player1.includes(item[1]) &&
        empty.includes(item[2])) ||
      (player2.includes(item[0]) &&
        empty.includes(item[1]) &&
        player1.includes(item[2])) ||
      (empty.includes(item[0]) &&
        player2.includes(item[1]) &&
        player1.includes(item[2])) ||
      (!empty.includes(item[0]) &&
        !empty.includes(item[1]) &&
        !empty.includes(item[2])) ||
      (player1.includes(item[0]) &&
        player1.includes(item[1]) &&
        !isPlayer1Move) ||
      (player1.includes(item[0]) &&
        player1.includes(item[2]) &&
        !isPlayer1Move) ||
      (player1.includes(item[1]) &&
        player1.includes(item[2]) &&
        !isPlayer1Move) ||
      (player2.includes(item[0]) &&
        player2.includes(item[1]) &&
        isPlayer1Move) ||
      (player2.includes(item[0]) &&
        player2.includes(item[2]) &&
        isPlayer1Move) ||
      (player2.includes(item[1]) && player2.includes(item[2]) && isPlayer1Move)
    ) {
      return null;
    }
    return item;
  });
  const filteredWinComb = possibleWinComb.filter((item) => item !== null);

  return filteredWinComb.length === 0 ? true : false;
};
