const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) return err;

  console.log(data);

  console.log("\x1b[94m Part 1 Answer: \x1b[0m", part1(data));
  //console.log("\x1b[96m Part 2 Answer: \x1b[0m", part2(data));
});

const part1 = (data) => {};
