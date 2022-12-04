const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) return err;

  console.log("\x1b[94m Part 1 Answer: \x1b[0m", part1(data));
  console.log("\x1b[96m Part 2 Answer: \x1b[0m", part2(data));
});

const part1 = (data) => {
  let fullyContainedSum = 0;
  for (const element of data.split("\n").map((e) => e.split(","))) {
    let checkOpposite = true;
    const lowRange0 = parseInt(element[0].split("-")[0]);
    const highRange0 = parseInt(element[0].split("-")[1]);
    const lowRange1 = parseInt(element[1].split("-")[0]);
    const highRange1 = parseInt(element[1].split("-")[1]);

    if (lowRange0 >= lowRange1 && highRange0 <= highRange1) {
      //do not check opposite way if this already contains
      checkOpposite = false;
      fullyContainedSum += 1;
    }
    if (checkOpposite && lowRange1 >= lowRange0 && highRange1 <= highRange0) {
      fullyContainedSum += 1;
    }
  }
  return fullyContainedSum;
};

const between = (value, min, max) => {
  return value >= min && value <= max;
};

const part2 = (data) => {
  let overlap = 0;
  for (const element of data.split("\n").map((e) => e.split(","))) {
    const lowRange0 = parseInt(element[0].split("-")[0]);
    const highRange0 = parseInt(element[0].split("-")[1]);
    const lowRange1 = parseInt(element[1].split("-")[0]);
    const highRange1 = parseInt(element[1].split("-")[1]);

    if (
      between(lowRange0, lowRange1, highRange1) ||
      between(highRange0, lowRange1, highRange1) ||
      between(lowRange1, lowRange0, highRange0) ||
      between(highRange1, lowRange0, highRange0)
    ) {
      overlap += 1;
    }
  }
  return overlap;
};
