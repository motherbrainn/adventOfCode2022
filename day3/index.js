const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  console.log("Part 1 Answer: ", part1(data));
  console.log("Part 2 Answer: ", part2(data));
});

const letterValues = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
};

const isLowerCase = (letter) => {
  return letter === letter.toLowerCase() ? true : false;
};

const part1 = (data) => {
  let prioritySum = 0;
  for (const line of data.split("\n")) {
    const compartment1 = line.substring(0, line.length / 2);
    const compartment2 = line.substring(line.length / 2, line.length);

    for (const letter of compartment1) {
      if (compartment2.includes(letter)) {
        prioritySum += isLowerCase(letter)
          ? letterValues[letter]
          : letterValues[letter.toLowerCase()] + 26;
        break;
      }
    }
  }
  return prioritySum;
};

const part2 = (data) => {
  let prioritySum = 0;
  const rucksacksGrouped = buildArrayGroups(data.split("\n"));

  //find common letter
  for (const group of rucksacksGrouped) {
    for (const letter of group[0]) {
      if (group[1].includes(letter)) {
        //match found between group 0 and 1
        if (group[2].includes(letter)) {
          //match found between 0, 1, 2!
          prioritySum += isLowerCase(letter)
            ? letterValues[letter]
            : letterValues[letter.toLowerCase()] + 26;
          break;
        }
      }
    }
  }
  return prioritySum;
};

const buildArrayGroups = (array) => {
  const arrayCopy = [...array];
  const groupedArrays = [];

  do {
    groupedArrays.push(arrayCopy.splice(0, 3));
  } while (arrayCopy.length >= 3);

  return groupedArrays;
};
