const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day1/input.txt")

// run line by line, each line separate by '   ' item[0] goes to leftArr, item[1] goes to rightArr.
// both array are sorted
// distancesArr is Math.abs(leftArr[i]-rightArr[i])
// sum distanceArr

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day1/input.txt")
  }
  let leftArr = []
  let rightArr = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split("   ")
    leftArr.push(line[0])
    rightArr.push(line[1])
  }

  leftArr.sort()
  rightArr.sort()

  let distanceSum = 0
  for (let i = 0; i < leftArr.length; i++) {
    distanceSum += Math.abs(leftArr[i] - rightArr[i])
  }
  return distanceSum
}

const puzzle1 = solvePuzzle1(lines)

const solvePuzzle2 = (lines, testing) => {
  // for each number in the left side, count how many times it appears
  // for each time it appears multiply (3 appears twice=> 3 * 2)
  if (!testing) {
    lines = getLinesFromPath("day1/input.txt")
  }
  let leftArr = []
  let rightArr = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split("   ")
    leftArr.push(parseInt(line[0]))
    rightArr.push(parseInt(line[1]))
  }


  leftArr.sort()
  rightArr.sort()

  let similarityScore = 0
  for (let i = 0; i < leftArr.length; i++) {
    let multiFactor = 0
    for (let j = 0; j < rightArr.length; j++) {
      if (rightArr[j] < leftArr[i]) {
        continue
      }
      if (leftArr[i] === rightArr[j]) {
        multiFactor++
      }
      if (rightArr[j] > leftArr[i]) {
        break
      }
    }
    similarityScore += leftArr[i] * multiFactor
  }

  return similarityScore
}

const puzzle2 = solvePuzzle1(lines)

module.exports = { solvePuzzle1, solvePuzzle2 }
