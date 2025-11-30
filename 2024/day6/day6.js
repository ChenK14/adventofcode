const getLinesFromPath = require('../index')

const UP = '^'
const RIGHT = '>'
const DOWN = 'V'
const LEFT = '<'

const getGuardPositionFromMatrix = (matrix) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const current = matrix[row][col]
      if (current === UP || current === RIGHT || current === DOWN || current === LEFT) {
        return { row, col }
      }
    }
  }
}
const getPotentialWallsFromMatrix = (matrix) => {
  const potentialWalls = []
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const current = matrix[row][col]
      if (current === '.') {
        potentialWalls.push({ row, col })
      }
    }
  }
  return potentialWalls
}

const directions = {
  '^': { moveTo: [-1, 0], nextPosition: RIGHT },
  '>': { moveTo: [0, 1], nextPosition: DOWN },
  V: { moveTo: [1, 0], nextPosition: LEFT },
  '<': { moveTo: [0, -1], nextPosition: UP },
}

const solveMatrixBFS = (matrix, startRow, startCol, startDirection) => {
  const queue = []
  // Push the initial state: row, col, direction
  queue.push({ row: startRow, col: startCol, dir: startDirection })

  while (queue.length > 0) {
    const { row, col, dir } = queue.shift()
    const { moveTo, nextPosition } = directions[dir]
    const [dr, dc] = moveTo

    // Compute the next cell based on the current direction
    const newRow = row + dr
    const newCol = col + dc

    // Check boundaries: if we can't move outside the matrix
    if (newRow < 0 || newRow >= matrix.length || newCol < 0 || newCol >= matrix[0].length) {
      // Mark current cell as visited at boundary and do not enqueue further.
      matrix[row][col] = 'X'
      continue
    }

    // If there's a wall in the direction we're heading, turn direction
    if (matrix[newRow][newCol] === '#') {
      // Change direction in current cell
      matrix[row][col] = nextPosition
      // Re-enqueue the same cell with the turned direction
      queue.push({ row, col, dir: nextPosition })
    } else {
      // If it's open (not a wall), we move forward
      // Mark the current cell as visited
      matrix[row][col] = 'X'
      // Place the direction in the next cell
      matrix[newRow][newCol] = dir
      // Enqueue the new position
      queue.push({ row: newRow, col: newCol, dir })
    }
  }

  // When the queue empties, we are done
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day5/input.txt')
  }

  const guardInitPosition = getGuardPositionFromMatrix(lines) // {row:x,col:y}

  const matrix = lines.map((row) => row.split(''))

  solveMatrixBFS(matrix, guardInitPosition.row, guardInitPosition.col, matrix[guardInitPosition.row][guardInitPosition.col])

  return matrix.reduce((rowAcc, row) => {
    const rowSum = row.reduce((colAcc, col) => {
      if (col === 'X') {
        colAcc += 1
      }
      return colAcc
    }, 0)
    return (rowAcc += rowSum)
  }, 0)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day5/input.txt')
  }

  const guardInitPosition = getGuardPositionFromMatrix(lines) // {row:x,col:y}
  const potentialWalls = getPotentialWallsFromMatrix(lines)

  const matrix = lines.map((row) => row.split(''))

  const sum = potentialWalls.reduce((acc, potentialWall) => {
    const { row, col } = potentialWall
    const tempMatrix = lines.map((row) => row.split(''))

    tempMatrix[row][col] = '#'

    const numOfLoops = findLoopsInMatrix(
      tempMatrix,
      guardInitPosition.row,
      guardInitPosition.col,
      tempMatrix[guardInitPosition.row][guardInitPosition.col],
    )
    return (acc += numOfLoops)
  }, 0)
  return sum
}

module.exports = { solvePuzzle1, solvePuzzle2 }

const findLoopsInMatrix = (matrix, startRow, startCol, startDirection) => {
  const queue = []
  queue.push({ row: startRow, col: startCol, dir: startDirection })
  const visited = {}

  while (queue.length > 0) {
    const { row, col, dir } = queue.shift()
    const stateKey = `${row},${col},${dir}`

    // Check if we've seen this state before
    if (visited[stateKey]) {
      // We have a loop
      return 1
    }
    visited[stateKey] = 1

    const { moveTo, nextPosition } = directions[dir]
    const [dr, dc] = moveTo
    const newRow = row + dr
    const newCol = col + dc

    // Check boundaries
    if (newRow < 0 || newRow >= matrix.length || newCol < 0 || newCol >= matrix[0].length) {
      // Outside boundary: just end this path
      continue
    }

    // If next cell is a wall, turn direction and enqueue new direction for current cell
    if (matrix[newRow][newCol] === '#') {
      queue.push({ row, col, dir: nextPosition })
    } else {
      // Move forward to the next cell
      queue.push({ row: newRow, col: newCol, dir })
    }
  }

  // No loop detected if we finish processing all reachable states
  return 0
}
