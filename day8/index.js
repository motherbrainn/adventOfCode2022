const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  const table = buildTable(data);
  console.log("part 1: ", part1(table));
  console.log("part2: ", part2(table));
});
const buildTable = (data) => {
  const table = [];
  const row = [];
  const trees = data.split("");
  for (const [i, tree] of trees.entries()) {
    row.push({ height: +tree, visibleX: false, visibleY: false });
    if (tree === "\n" || i + 1 === trees.length) {
      tree === "\n" && row.pop();
      table.push([...row]);
      row.length = 0;
    }
  }

  //set y visibility
  table[0].forEach((e) => (e.visibleY = true));
  table[table.length - 1].forEach((e) => (e.visibleY = true));

  //set x visibility
  table.forEach((e) => (e[0].visibleX = true));
  table.forEach((e) => (e[table.length - 1].visibleY = true));

  return table;
};

const part1 = (table) => {
  //x visibility in left to right direction
  table.forEach((row) => {
    let highestTree = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i].height > highestTree) {
        row[i].visibleX = true;
        highestTree = row[i].height;
      }
    }
  });

  //x visibility in right to left direction
  table.forEach((row) => {
    let highestTree = 0;
    for (let i = row.length - 1; i >= 0; i--) {
      if (row[i].height > highestTree) {
        row[i].visibleX = true;
        highestTree = row[i].height;
      }
    }
  });

  //y visibility in top to bottom direction
  for (let i = 0; i < table.length; i++) {
    let highestTree = 0;
    for (let j = 0; j < table[i].length; j++) {
      if (table[j][i].height > highestTree) {
        table[j][i].visibleY = true;
        highestTree = table[j][i].height;
      }
    }
  }

  //y visibility in backwards direction
  for (let i = table.length - 1; i >= 0; i--) {
    let highestTree = 0;
    for (let j = table.length - 1; j >= 0; j--) {
      if (table[j][i].height > highestTree) {
        table[j][i].visibleY = true;
        highestTree = table[j][i].height;
      }
    }
  }

  const part1Total = table.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue.reduce((accumulator, currentValue) => {
      if (currentValue.visibleX === true || currentValue.visibleY === true) {
        return (accumulator += 1);
      } else return accumulator;
    }, 0));
  }, 0);

  return part1Total;
};

const part2 = (table) => {
  const scenicScores = [];
  //loop over every row
  for (let rowIndex in table) {
    rowIndex = +rowIndex;
    //loop over every tree in row
    for (let treeIndex in table[rowIndex]) {
      treeIndex = +treeIndex;

      //build arrays to check current tree height against
      const leftToRight = createSubArrayLeftToRight(treeIndex, table[rowIndex]);
      const rightToLeft = createSubArrayRightToLeft(treeIndex, table[rowIndex]);
      const topToBottom = createSubArrayTopToBottom(treeIndex, rowIndex, table);
      const bottomToTop = createSubArrayBottomToTop(treeIndex, rowIndex, table);

      let scores = [];
      const currentTreeHeight = table[rowIndex][treeIndex].height;

      scores.push(
        viewingDistanceForTree(currentTreeHeight, leftToRight),
        viewingDistanceForTree(currentTreeHeight, rightToLeft),
        viewingDistanceForTree(currentTreeHeight, topToBottom),
        viewingDistanceForTree(currentTreeHeight, bottomToTop)
      );

      //remove 0 values and multiply scores to get scenic score per tree
      scenicScores.push(
        scores
          .filter((e) => e !== 0)
          .reduce((accumulator, currentValue) => (currentValue *= accumulator))
      );
    }
  }
  //return highest scenic score
  return Math.max(...scenicScores);
};

//functions to create arrays to check current tree against
const createSubArrayLeftToRight = (startingTreeIndex, row) => {
  return row.slice(startingTreeIndex + 1);
};

const createSubArrayRightToLeft = (startingTreeIndex, row) => {
  let subArray = [];
  for (let i = startingTreeIndex - 1; i >= 0; i--) {
    i >= 0 && subArray.push(row[i]);
  }
  return subArray;
};

const createSubArrayTopToBottom = (treeIndex, startingRowIndex, table) => {
  const maxY = Math.max(...table.map((e, index) => index));
  let subArray = [];
  for (let i = startingRowIndex + 1; i < +maxY + 1; i++) {
    subArray.push(table[i][treeIndex]);
  }
  return subArray;
};

const createSubArrayBottomToTop = (treeIndex, startingRowIndex, table) => {
  let subArray = [];
  for (let i = startingRowIndex - 1; i >= 0; i--) {
    subArray.push(table[i][treeIndex]);
  }
  return subArray;
};

//determine viewing distance for tree and array
const viewingDistanceForTree = (tree, array) => {
  //if length is 0 we are are at an edge
  if (array.length === 0) {
    return 0;
  }
  let score = 0;
  for (const arrayTree of array) {
    if (tree > arrayTree.height) {
      score += 1;
    } else {
      score += 1;
      break;
    }
  }
  return score;
};
