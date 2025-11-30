const getLinesFromPath = require('../index')

const getTrailheadsFromMatrix = (matrix) => {
  const trailheads = []

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === '0') {
        trailheads.push({ row, col })
      }
    }
  }

  return trailheads
}

const getTrailheadScore = ({ row, col }, matrix) => {
  const foundNinesSet = new Set()
  exploreTheMap(row + 1, col, matrix, 0, foundNinesSet)
  exploreTheMap(row, col + 1, matrix, 0, foundNinesSet)
  exploreTheMap(row - 1, col, matrix, 0, foundNinesSet)
  exploreTheMap(row, col - 1, matrix, 0, foundNinesSet)
  return foundNinesSet.size
}

const exploreTheMap = (row, col, matrix, currentValue, foundNinesSet) => {
  if (row < 0 || row === matrix.length || col < 0 || col === matrix[row].length || matrix[row][col] !== `${parseInt(currentValue) + 1}`) {
    return
  }
  const newValue = matrix[row][col]
  if (newValue === '9') {
    foundNinesSet.add(`${row},${col}`)
    return
  }
  exploreTheMap(row + 1, col, matrix, newValue, foundNinesSet)
  exploreTheMap(row, col + 1, matrix, newValue, foundNinesSet)
  exploreTheMap(row - 1, col, matrix, newValue, foundNinesSet)
  exploreTheMap(row, col - 1, matrix, newValue, foundNinesSet)
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day10/input.txt')
  }
  // get all startingPositions.

  const trailheads = getTrailheadsFromMatrix(lines) // [{row, col}]
  console.log(trailheads)
  let trailheadScoreSum = 0
  for (let i = 0; i < trailheads.length; i++) {
    const trailheadScore = getTrailheadScore(trailheads[i], lines)
    if (trailheadScore > 0) {
      trailheadScoreSum += trailheadScore
    }
  }

  return trailheadScoreSum
  // for each starting position calculate how many 9's it can reach
  // keep each 9 row and col in a set, so that even if the same 9 is reached in two ways it counts as 1.
  // sum all the scores for each starting point
}

const getTrailheadScoreWithRating = ({ row, col }, matrix) => {
  const foundNinesSet = new Set()
  const ratingArr = []
  exploreTheMapWithRating(row + 1, col, matrix, 0, foundNinesSet, ratingArr)
  exploreTheMapWithRating(row, col + 1, matrix, 0, foundNinesSet, ratingArr)
  exploreTheMapWithRating(row - 1, col, matrix, 0, foundNinesSet, ratingArr)
  exploreTheMapWithRating(row, col - 1, matrix, 0, foundNinesSet, ratingArr)
  return ratingArr.length
}

const exploreTheMapWithRating = (row, col, matrix, currentValue, foundNinesSet, trailsRating) => {
  if (row < 0 || row === matrix.length || col < 0 || col === matrix[row].length || matrix[row][col] !== `${parseInt(currentValue) + 1}`) {
    return
  }
  const newValue = matrix[row][col]
  if (newValue === '9') {
    trailsRating.push(1)
    foundNinesSet.add(`${row},${col}`)
    return
  }
  exploreTheMapWithRating(row + 1, col, matrix, newValue, foundNinesSet, trailsRating)
  exploreTheMapWithRating(row, col + 1, matrix, newValue, foundNinesSet, trailsRating)
  exploreTheMapWithRating(row - 1, col, matrix, newValue, foundNinesSet, trailsRating)
  exploreTheMapWithRating(row, col - 1, matrix, newValue, foundNinesSet, trailsRating)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day10/input.txt')
  }

  if (!testing) {
    lines = getLinesFromPath('day10/input.txt')
  }
  // get all startingPositions.

  const trailheads = getTrailheadsFromMatrix(lines) // [{row, col}]
  console.log(trailheads)
  let trailheadScoreSum = 0
  for (let i = 0; i < trailheads.length; i++) {
    const trailheadScore = getTrailheadScoreWithRating(trailheads[i], lines)
    if (trailheadScore > 0) {
      trailheadScoreSum += trailheadScore
    }
  }

  return trailheadScoreSum
  // for each starting position calculate how many 9's it can reach
  // keep each 9 row and col in a set, so that even if the same 9 is reached in two ways it counts as 1.
  // sum all the scores for each starting point
}

module.exports = { solvePuzzle1, solvePuzzle2 }
