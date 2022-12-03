const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  if (err) throw err;

  //part 1 answer
  const part1Answer = sumGameResults(data);
  console.log("Part 1 Answer: ", part1Answer);

  //part 2 answer
  const part2Answer = sumGameResultsPart2(data);
  console.log("Part 2 Answer: ", part2Answer);
});

const TIE = "tie";
const PLAYER_WIN = "playerWin";
const PLAYER_LOSS = "playerLoss";

const playerMap = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomeMap = {
  X: PLAYER_LOSS,
  Y: TIE,
  Z: PLAYER_WIN,
};

const outcomes = {
  AX: TIE,
  AY: PLAYER_WIN,
  AZ: PLAYER_LOSS,
  BX: PLAYER_LOSS,
  BY: TIE,
  BZ: PLAYER_WIN,
  CX: PLAYER_WIN,
  CY: PLAYER_LOSS,
  CZ: TIE,
};

const sumGameResults = (input) => {
  const inputAsString = input.toString();
  //[ [ 'B', 'X' ], [ 'C', 'Y' ], [ 'A', 'X' ], [ 'B', 'X' ] ]
  const inputAsArray = inputAsString.split("\n").map((e) => e.split(" "));
  // [ 8, 1, 6 ]
  const gameResults = inputAsArray.map((e) => {
    const playersPlay = e[1];
    const opponentsPlay = e[0];
    const playerBaseScore = playerMap[playersPlay];

    let score = playerBaseScore;
    const outcome = outcomes[opponentsPlay + playersPlay];

    if (outcome === PLAYER_WIN) {
      score += 6;
    } else if (outcome === TIE) {
      score += 3;
    }
    return score;
  });
  //sum individual game results
  return gameResults.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
};

//use to know what to throw in which scenario
const cheatMap = {
  AY: "X",
  BY: "Y",
  CY: "Z",
  AX: "Z",
  BX: "X",
  CX: "Y",
  AZ: "Y",
  BZ: "Z",
  CZ: "X",
};

const sumGameResultsPart2 = (input) => {
  const inputAsString = input.toString();
  const inputAsArray = inputAsString.split("\n").map((e) => e.split(" "));

  const gameResults = inputAsArray.map((e) => {
    const opponentsPlay = e[0];
    const gameResult = e[1];
    const playersPlay = cheatMap[opponentsPlay + gameResult];

    let score = playerMap[playersPlay];
    if (outcomeMap[gameResult] === PLAYER_WIN) {
      score += 6;
    } else if (outcomeMap[gameResult] === TIE) {
      score += 3;
    }
    return score;
  });

  //sum individual game results
  return gameResults.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
};
