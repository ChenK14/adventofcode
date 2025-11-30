const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day9/input.txt")

// get array return the next number (after all the calculation)
const getLinePrediction = (lineOfValues) => {
  if (lineOfValues.every((value) => value === 0)) return 0
  let innerLineOfValues = []
  for (let i = 0; i < lineOfValues.length - 1; i++) {
    innerLineOfValues.push(lineOfValues[i + 1] - lineOfValues[i])
  }

  return getLinePrediction(innerLineOfValues) + lineOfValues[lineOfValues.length - 1]
}
const getLineHistory = (lineOfValues) => {
  if (lineOfValues.every((value) => value === 0)) return 0
  let innerLineOfValues = []
  for (let i = lineOfValues.length - 1; i > 0; i--) {
    innerLineOfValues.push(lineOfValues[i] - lineOfValues[i - 1])
  }

  return lineOfValues[0] - getLinePrediction(innerLineOfValues)
}

const getPredictionSummery = (lines) => {
  let linesValues = []
  for (let i = 0; i < lines.length; i++) {
    linesValues.push(lines[i].split(" ").map((value) => parseInt(value)))
  }
  let sumOfPredictions = 0
  for (let i = 0; i < linesValues.length; i++) {
    let linePrediction = getLinePrediction(linesValues[i])
    sumOfPredictions += linePrediction
  }
  return sumOfPredictions
}
const getHistorySummery = (lines) => {
  let linesValues = []
  for (let i = 0; i < lines.length; i++) {
    linesValues.push(lines[i].split(" ").map((value) => parseInt(value)))
  }
  let sumOfPredictions = 0
  for (let i = 0; i < linesValues.length; i++) {
    let linePrediction = getLineHistory(linesValues[i])
    sumOfPredictions += linePrediction
  }
  return sumOfPredictions
}

// console.log("day 9 challenge 1: ", getPredictionSummery(lines))
// console.log("day 9 challenge 2: ", getHistorySummery(lines))

module.exports = { getPredictionSummery, getHistorySummery }
