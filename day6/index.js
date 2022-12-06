const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  console.log("\x1b[94m Part 1 Answer: \x1b[0m", part1and2(data, 4));
  console.log("\x1b[96m Part 2 Answer: \x1b[0m", part1and2(data, 14));
});

const part1and2 = (data, packetSize) => {
  for (const letterIndex in data) {
    const i = parseInt(letterIndex);
    const group = data.slice(i, i + packetSize);

    // check for uniqueness within group
    if (new Set(group).size === group.length) {
      return i + packetSize;
    }
  }
};
