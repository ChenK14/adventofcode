const getLinesFromPath = require("../index");


const WORDS_TO_NUM = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const replaceWordsWithNumbers = (line) => {
  let newLine = line;
  for (const word in WORDS_TO_NUM) {
    newLine = newLine.replace(new RegExp(word, "g"), `${word.slice(0,1)}${WORDS_TO_NUM[word]}${word.slice(word.length-1,word.length)}`);
  }
  return newLine;
};

const outputCalculator = (inputFile) => {
  const filePath = path.join(__dirname, inputFile);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const lines = fileContent.split("\n");
  return lines;
};

const calculateLinesSummery = (
  lines,
  shouldReplaceWordsWithNumbers
) => {
  let linesSummery = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = parseInt((shouldReplaceWordsWithNumbers?replaceWordsWithNumbers(lines[i]):lines[i]).replace(/\D/g, ""));
    linesSummery += parseInt(`${`${line}`[0]}${line % 10}`);
  }
  return linesSummery;
};

// const lines = getLinesFromPath("day1/input.txt");

// console.log("challenge 1: ", calculateLinesSummery(lines, false));

// console.log("challenge 2: ", calculateLinesSummery(lines, true));
module.exports= calculateLinesSummery