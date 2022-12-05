const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  //test data
  const testInput = [
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2",
  ];
  const testStacks = ["NZ", "DCM", "P"];

  //real data
  const input = data.split("\n").splice(10);
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

  console.log(
    "\x1b[94m Part 1 Answer: \x1b[0m",
    part1and2(stacks, input, partIdentifier.PART_ONE)
  );
  console.log(
    "\x1b[96m Part 2 Answer: \x1b[0m",
    part1and2(stacks, input, partIdentifier.PART_TWO)
  );
});

const partIdentifier = {
  PART_ONE: "1",
  PART_TWO: "2",
};

const moveCrate = (string, stackArrays, partId) => {
  const stringAsArray = string.split(" ");
  const numberToMove = parseInt(stringAsArray[1]);
  const moveFrom = parseInt(stringAsArray[3]);
  const moveTo = parseInt(stringAsArray[5]);

  if (partId === partIdentifier.PART_ONE) {
    for (let i = 1; i <= numberToMove; i++) {
      stackArrays[moveTo - 1].unshift(stackArrays[moveFrom - 1].shift());
    }
  } else if (partId === partIdentifier.PART_TWO) {
    stackArrays[moveTo - 1].unshift(
      ...stackArrays[moveFrom - 1].splice(0, numberToMove)
    );
  }
};

const part1and2 = (stacks, input, partId) => {
  let topCrates = "";
  const stackArrays = stacks.map((e) => e.split(""));
  for (const instruction of input) {
    //part 1 (CrateMover 9000)
    partId === partIdentifier.PART_ONE
      ? moveCrate(instruction, [...stackArrays], partId)
      : //part 2 (CrateMover 9001)
        moveCrate(instruction, [...stackArrays], partId);
  }
  for (const stack of stackArrays) {
    topCrates += stack[0];
  }
  return topCrates;
};
