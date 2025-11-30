const getLinesFromPath = require("../index")

const getArrayOfIndicatorAsPoints = (matrix, indicator) => {
  let points = []
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === indicator) {
        points.push({ row, col })
      }
    }
  }
  return points
}

const xmasOrder = ["X", "M", "A", "S"]

const isValidPoint = (matrix, row, col) => matrix.length > row && row >= 0 && matrix[row].length > col && col >= 0

const findXmas = (matrix, row, col, XmasOrderIndex, direction) => {
  if (XmasOrderIndex === xmasOrder.length) {
    return 1
  }
  if (!isValidPoint(matrix, row, col) || matrix[row][col] !== xmasOrder[XmasOrderIndex]) {
    return 0
  }
  switch (direction) {
    case 0: // up
      return findXmas(matrix, row - 1, col, XmasOrderIndex + 1, direction)
      break
    case 1: //upright
      return findXmas(matrix, row - 1, col + 1, XmasOrderIndex + 1, direction)
      break
    case 2: //right
      return findXmas(matrix, row, col + 1, XmasOrderIndex + 1, direction)
      break
    case 3: // downright
      return findXmas(matrix, row + 1, col + 1, XmasOrderIndex + 1, direction)
      break
    case 4: //down
      return findXmas(matrix, row + 1, col, XmasOrderIndex + 1, direction)
      break
    case 5: //downleft
      return findXmas(matrix, row + 1, col - 1, XmasOrderIndex + 1, direction)
      break
    case 6: //left
      return findXmas(matrix, row, col - 1, XmasOrderIndex + 1, direction)
      break
    case 7: //upleft
      return findXmas(matrix, row - 1, col - 1, XmasOrderIndex + 1, direction)
      break
  }
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day4/input.txt")
  }

  const points = getArrayOfIndicatorAsPoints(lines, "X")
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    for (let direction = 0; direction < 8; direction++) {
      sum += findXmas(lines, points[i].row, points[i].col, 0, direction)
    }
  }

  return sum
}

const searchForXShapedMas = (matrix, points) => {
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    const row = points[i].row + 1
    const col = points[i].col + 1
    const upRight = matrix[row - 1][col + 1]
    const downLeft = matrix[row + 1][col - 1]
    const upLeft = matrix[row - 1][col - 1]
    const downRight = matrix[row + 1][col + 1]

    if ((upRight === "M" && downLeft === "S") || (downLeft === "M" && upRight === "S")) {
      sum += 0.5
    }

    if ((upLeft === "M" && downRight === "S") || (downRight === "M" && upLeft === "S")) {
      sum += 0.5
    }

    sum = Math.floor(sum)
  }
  return sum
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day4/input.txt")
  }
  const tempMatrix = lines.slice(1, -1).map((row) => row.slice(1, -1))

  const points = getArrayOfIndicatorAsPoints(tempMatrix, "A")

  return searchForXShapedMas(lines, points)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
