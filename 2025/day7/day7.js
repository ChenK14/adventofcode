const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day7/input.txt")


const sendBeam = (matrix, currentRow, currentCol, indexesOfBeams) => {
  if (currentRow + 1 === matrix.length) {
    return 0
  }
  if (indexesOfBeams.has(`${currentRow},${currentCol}`)) {
    return 0
  }
  indexesOfBeams.add(`${currentRow},${currentCol}`)
  const nextRow = currentRow + 1
  if (matrix[nextRow][currentCol] === '^') {
    return 1 + sendBeam(matrix, nextRow, currentCol - 1, indexesOfBeams) + sendBeam(matrix, nextRow, currentCol + 1, indexesOfBeams)

  }
  return sendBeam(matrix, nextRow, currentCol, indexesOfBeams)
}



const getStartPoint = (input) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'S') return { row: i, col: j }
    }
  }
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day7/input.txt")
  }
  const { row, col } = getStartPoint(lines)

  return sendBeam(lines, row + 1, col, new Set())
}

const countTimelines = (matrix, currentRow, currentCol, cache) => {
  if (currentRow + 1 === matrix.length) {
    return 1
  }

  const key = `${currentRow},${currentCol}`
  if (cache.has(key)) {
    return cache.get(key)
  }

  const nextRow = currentRow + 1
  let result
  if (matrix[nextRow][currentCol] === '^') {
    result = countTimelines(matrix, nextRow, currentCol - 1, cache) + countTimelines(matrix, nextRow, currentCol + 1, cache)
  } else {
    result = countTimelines(matrix, nextRow, currentCol, cache)
  }

  cache.set(key, result)
  return result
}



const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day7/input.txt")
  }
  const { row, col } = getStartPoint(lines)
  return countTimelines(lines, row + 1, col, new Map())
}



module.exports = { solvePuzzle1, solvePuzzle2 }
