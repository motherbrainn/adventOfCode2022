const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  if (err) throw err;

  console.log(findMax(data.toString()));
});

const findMax = (string) => {
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

  return Math.max(...totals);
};
