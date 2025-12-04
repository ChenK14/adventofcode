const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day4/input.txt")


const directions = [
  { rowShift: 0, colShift: 1 }, //right
  { rowShift: 0, colShift: -1 }, // left
  { rowShift: 1, colShift: 0 }, // down
  { rowShift: -1, colShift: 0 }, // up
  { rowShift: 1, colShift: -1 }, // down left
  { rowShift: 1, colShift: 1 }, // down right
  { rowShift: -1, colShift: -1 }, //up left
  { rowShift: -1, colShift: 1 }, //up right
]


const getNumbOfToiletPapers = (matrix) => {
  const toiletPapers = new Set()
  for (let row = 0; row < matrix.length; row++) {
    const isInBound = (newRow, newCol) => newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[row].length
    for (let col = 0; col < matrix[row].length; col++) {


      if (matrix[row][col] === '@') {
        let tp = 0
        for (let dir = 0; dir < directions.length; dir++) {
          const { rowShift, colShift } = directions[dir]
          const checkRow = row + rowShift
          const checkCol = col + colShift
          if (isInBound(checkRow, checkCol) && matrix[checkRow][checkCol] === '@') {
            if (++tp === 4) {
              break;
            }
          }
        }
        if (tp < 4) {
          toiletPapers.add(`${row},${col}`)
        }
      }
    }
  }

  return toiletPapers
}


const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day4/input.txt")
  }

  const tps = getNumbOfToiletPapers(lines)
  return tps.size
}


const removeTpFromArray = (matrix, positions) => {
  const shouldMark = (row, col) => positions.has(`${row},${col}`)

  return matrix.map((row, rowIdx) =>
    [...row]
      .map((cell, colIdx) => shouldMark(rowIdx, colIdx) ? 'x' : cell)
      .join('')
  )
}
const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day4/input.txt")
  }
  let removedTpCount = 0
  while (true) {
    const tps = getNumbOfToiletPapers(lines)
    lines = removeTpFromArray(lines, tps)
    removedTpCount += tps.size

    if (tps.size === 0) {
      break;
    }
  }


  return removedTpCount
}

module.exports = { solvePuzzle1, solvePuzzle2 }
