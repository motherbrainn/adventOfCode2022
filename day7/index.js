const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  console.log("\x1b[94m Part 1 Answer: \x1b[0m", part1(data));
  // console.log("\x1b[96m Part 2 Answer: \x1b[0m", part1and2(data, 14));
});

const part1 = (data) => {
  return data;
};
