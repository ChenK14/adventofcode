const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day6/input.txt")

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day6/input.txt")
  }
  return 0
}

const puzzle1 = solvePuzzle1(lines)

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day6/input.txt")
  }
  return 0
}

const puzzle2 = solvePuzzle2(lines)

module.exports = { solvePuzzle1, solvePuzzle2 }
