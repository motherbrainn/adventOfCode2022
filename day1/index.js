const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  if (err) throw err;

  //part 1 answer
  const part1Answer = findGroupValues(data.toString());
  console.log("Part 1 Answer: ", Math.max(...part1Answer));

  //part 2 answer
  const part2Answer = findAndSumTopValues(part1Answer, 3);
  console.log("Part 2 Answer: ", part2Answer);
});

const findGroupValues = (string) => {
  //string as array including new lines
  const stringAsArray = string.split("\n");

  let sumOfGroup = 0;

  const totals = stringAsArray.reduce((previousValue, currentValue) => {
    if (currentValue.length > 0) {
      sumOfGroup += parseInt(currentValue);
    }
    if (currentValue.length === 0) {
      previousValue.push(sumOfGroup);
      sumOfGroup = 0;
    }
    return previousValue;
  }, []);

  return totals;
};

const findAndSumTopValues = (groupValues, numberOfValues) => {
  const groupValueCopy = [...groupValues];
  const topValues = [];
  for (let i = 0; i < numberOfValues; i++) {
    const indexOfCurrentMax = groupValueCopy.indexOf(
      Math.max(...groupValueCopy)
    );
    //push top value to top value array, remove top value from working array
    topValues.push(groupValueCopy.splice(indexOfCurrentMax, 1)[0]);
  }
  //sum values in top value array
  return topValues.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
};
