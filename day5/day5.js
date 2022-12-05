const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  const testInput = [
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2",
  ];
  const testStacks = ["NZ", "DCM", "P"];

  const input = data.split("\n").splice(10);
  part1(stacks, input);

  console.log("\x1b[94m Part 1 Answer: \x1b[0m", part1(stacks, input));
  //console.log("\x1b[96m Part 2 Answer: \x1b[0m", part2(data));
});

const stacks = [
  "CQB",
  "ZWQR",
  "VLRMB",
  "WTVHZC",
  "GVNBHZD",
  "QVFJCPNH",
  "SZWRTGD",
  "PZWBNMGC",
  "PFQWMBJN",
];

const moveCrate = (string, stackArrays) => {
  const stringAsArray = string.split(" ");
  const numberToMove = parseInt(stringAsArray[1]);
  const moveFrom = parseInt(stringAsArray[3]);
  const moveTo = parseInt(stringAsArray[5]);

  for (let i = 1; i <= numberToMove; i++) {
    stackArrays[moveTo - 1].unshift(stackArrays[moveFrom - 1].shift());
  }
};

const moveCrate9001 = (string, stackArrays) => {
  const stringAsArray = string.split(" ");
  const numberToMove = parseInt(stringAsArray[1]);
  const moveFrom = parseInt(stringAsArray[3]);
  const moveTo = parseInt(stringAsArray[5]);

  stackArrays[moveTo - 1].unshift(
    ...stackArrays[moveFrom - 1].splice(0, numberToMove)
  );
};

const part1 = (stacks, input) => {
  let topCrates = "";
  const stackArrays = stacks.map((e) => e.split(""));
  for (const instruction of input) {
    //part 1
    moveCrate(instruction, stackArrays);
    //part 2
    //moveCrate9001(instruction, stackArrays);
  }
  //return data;

  for (const stack of stackArrays) {
    topCrates += stack[0];
  }
  return topCrates;
};

const part2 = (data) => {
  return data;
};
