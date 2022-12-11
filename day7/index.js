const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  part1(data);
});

const part1 = (data) => {
  const dataArray = data.split("\n");

  /**
   * record folder and size
   * sizes = {'/': number, '/a/': number}
   */
  const sizes = {};

  /**
   * use directories array to determine current directory tree
   * ['/', '/a/']
   */
  const directories = [];

  for (let i = 0; i < dataArray.length; i++) {
    const [, cmd, arg] = dataArray[i].split(" ");
    if (cmd === "cd") {
      if (arg === "..") {
        //remove current directory from directory array
        directories.length > 0 && directories.pop();
      } else {
        //get currentWorkingDirectory and add to directories array
        const currentWorkingDirectory =
          directories.length === 0 ? arg : `${directories.at(-1)}${arg}/`;
        directories.push(currentWorkingDirectory);
      }
    }

    if (cmd === "ls") {
      //start looping over files and calculate sizes
      //ignore empty dirs, we will count them when we cd to them (or not count them at all if we dont cd)
      for (i++; i < dataArray.length; i++) {
        const firstPosition = dataArray[i].split(" ")[0];
        const secondPosition = dataArray[i].split(" ")[1];

        //there are only two things that can happen in sub loop
        //1. add size to all current directories in tree (stored in first position)
        //2. cd to break out of loop
        if (!isNaN(firstPosition)) {
          //add size to all directories in current tree
          for (const directory of directories) {
            sizes[directory] =
              (sizes[directory] ?? 0) + parseInt(firstPosition);
          }
        } else if (secondPosition === "cd") {
          //when we hit cd, go back one iteration and break out of sub loop
          i--;
          break;
        }
      }
    }
  }

  //part 1
  const sizeValues = Object.values(sizes);

  const part1 = sizeValues.reduce((accumulator, currentValue) => {
    if (currentValue <= 100000) {
      return (accumulator += currentValue);
    } else return accumulator;
  }, 0);

  console.log("\x1b[94m Part 1 Answer: \x1b[0m", part1);

  //part 2
  const currentFreeSpace = 70000000 - Math.max(...sizeValues);
  const amountToDelete = 30000000 - currentFreeSpace;

  const sizeOfFolderToDelete = Math.min(
    ...sizeValues.filter((value) => value >= amountToDelete)
  );

  console.log("\x1b[96m Part 2 Answer: \x1b[0m", sizeOfFolderToDelete);
};
