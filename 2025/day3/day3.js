const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day3/input.txt")



const findLargestDigitInArray = (line, startingIndex = 0, removeFromEnd = 0) => {
  let largest = { val: -1, index: -1 }
  for (let i = startingIndex; i < line.length - removeFromEnd; i++) {
    if (line[i] > largest.val) {
      largest.val = line[i]
      largest.index = i
    }
  }
  return largest
}



const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day3/input.txt")
  }

  return lines.reduce((acc, curr) => {
    const largestJoltage = Number(findLargest(curr, 2))
    acc += largestJoltage
    return acc
  }, 0)



}

const findLargest = (line, requiredLength, prevIndex = -1) => {
  if (requiredLength === 0) {
    return ''
  }
  const newLine = line.substring(prevIndex + 1, line.length)
  const { val, index } = findLargestDigitInArray(newLine, 0, requiredLength - 1)
  return `${val}${findLargest(line, requiredLength - 1, prevIndex + index + 1)}`
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day3/input.txt")
  }

  return lines.reduce((acc, curr) => {
    const largestJoltage = Number(findLargest(curr, 12))
    acc += largestJoltage
    return acc
  }, 0)
}


module.exports = { solvePuzzle1, solvePuzzle2 }
