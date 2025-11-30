const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day1/input.txt")

// run line by line, each line separate by '   ' item[0] goes to leftArr, item[1] goes to rightArr.
// both array are sorted
// distancesArr is Math.abs(leftArr[i]-rightArr[i])
// sum distanceArr

const isLevelSafe = (report) => {
  let levelSafe = true
  let increasing = false

  for (let levelNumber = 1; levelNumber < report.length; levelNumber++) {
    const currLevel = parseInt(report[levelNumber])
    const prevLevel = parseInt(report[levelNumber - 1])

    if (currLevel === prevLevel) {
      levelSafe = false
      break
    }

    if (levelNumber === 1) {
      const currLevel = parseInt(report[levelNumber])
      increasing = currLevel > prevLevel
    }

    const isInRightOrder = increasing ? currLevel > prevLevel : prevLevel > currLevel
    const isDifferenceUpToThree = increasing
      ? currLevel <= prevLevel + 3
      : prevLevel <= currLevel + 3

    if (!(isInRightOrder && isDifferenceUpToThree)) {
      levelSafe = false
      break
    }
  }

  return levelSafe
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day2/input.txt")
  }
  const reports = []
  for (let i = 0; i < lines.length; i++) {
    const levels = lines[i].split(" ")
    reports.push(levels)
  }

  // we need to go over every levels, in each floor we need to figure out if it's decreasing or increasing
  // we need to verify that the differences are up to 3

  let safeSum = 0
  for (let reportsNumber = 0; reportsNumber < reports.length; reportsNumber++) {
    const report = reports[reportsNumber]
    if (isLevelSafe(report)) {
      safeSum++
    }
  }
  return safeSum
}

const puzzle1 = solvePuzzle1(lines)

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day2/input.txt")
  }
  const reports = []
  for (let i = 0; i < lines.length; i++) {
    const levels = lines[i].split(" ")
    reports.push(levels)
  }

  let safeSum = 0
  for (let reportsNumber = 0; reportsNumber < reports.length; reportsNumber++) {
    const report = reports[reportsNumber]
    for (let level = 0; level < report.length; level++) {
      const reportWithOutOneLevel = [
        ...report.slice(0, level),
        ...report.slice(level + 1, report.length),
      ]

      if (isLevelSafe(reportWithOutOneLevel)) {
        safeSum++
        break
      }
    }
  }
  return safeSum
}

const puzzle2 = solvePuzzle1(lines)

module.exports = { solvePuzzle1, solvePuzzle2 }
