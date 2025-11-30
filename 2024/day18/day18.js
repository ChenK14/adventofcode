const getLinesFromPath = require('../index')

const solvePuzzle1 = (lines, testing) => {
  let mazeSize = 7
  if (!testing) {
    lines = getLinesFromPath('day18/input.txt')
    mazeSize = 71
  }
  const walls = parseInput(lines, testing)
  // const matrix = Array.from({ length: mazeSize }, () => Array(mazeSize).fill('.'))
  // for (let i = 0; i < matrix.length; i++) {
  //   for (let j = 0; j < matrix[i].length; j++) {
  //     if (walls.has(`${i},${j}`)) {
  //       matrix[i][j] = '#'
  //     }
  //   }
  // }
  // console.log(walls)
  // console.table(matrix)
  const shortestPath = getShortestPath(mazeSize, walls, { row: 0, col: 0 }, { row: mazeSize - 1, col: mazeSize - 1 })
  // for (let i = 0; i < shortestPath.length; i++) {
  //   const { row, col } = shortestPath[i]
  //   matrix[row][col] = 'O'
  // }
  // console.table(matrix)
  return shortestPath.length - 1
}

const dirMap = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const getShortestPath = (mazeSize, walls, startPosition, endPosition) => {
  const isValid = (position) => {
    const { row, col } = position
    return row >= 0 && row < mazeSize && col >= 0 && col < mazeSize && !walls.has(`${row},${col}`)
  }
  const visited = new Set()
  const queue = [startPosition]
  const cameFrom = new Map()

  while (queue.length > 0) {
    const position = queue.shift()
    if (position.row === endPosition.row && position.col === endPosition.col) {
      const path = []
      let current = position
      while (cameFrom.has(`${current.row},${current.col}`)) {
        path.unshift(current)
        current = cameFrom.get(`${current.row},${current.col}`)
      }
      path.unshift(startPosition)
      return path
    }

    const positionKey = `${position.row},${position.col}`

    if (visited.has(positionKey)) {
      continue
    }
    visited.add(positionKey)

    for (const [dRow, dCol] of dirMap) {
      const nextPosition = { row: position.row + dRow, col: position.col + dCol }
      if (isValid(nextPosition) && !visited.has(`${nextPosition.row},${nextPosition.col}`)) {
        queue.push(nextPosition)
        cameFrom.set(`${nextPosition.row},${nextPosition.col}`, position)
      }
    }
  }
}

const parseInput = (input, testing) => {
  const walls = new Set()
  const limit = testing ? 12 : 1024
  for (let i = 0; i < input.length && i < limit; i++) {
    const splitted = input[i].split(',')
    walls.add(`${splitted[1]},${splitted[0]}`)
  }
  return walls
}
const getAllRemainingWalls = (input, testing) => {
  const walls = []
  const limit = testing ? 12 : 1024
  for (let i = limit; i < input.length; i++) {
    const splitted = input[i].split(',')
    walls.push(`${splitted[1]},${splitted[0]}`)
  }
  return walls
}
const solvePuzzle2 = (lines, testing) => {
  let mazeSize = 7
  if (!testing) {
    lines = getLinesFromPath('day18/input.txt')
    mazeSize = 71
  }

  const walls = parseInput(lines, testing)
  const remainingWalls = getAllRemainingWalls(lines, testing)
  for (let i = 0; i < remainingWalls.length; i++) {
    const wall = remainingWalls[i]
    walls.add(wall)
    const result = isThereAPath(mazeSize, walls, { row: 0, col: 0 }, { row: mazeSize - 1, col: mazeSize - 1 })
    if (!result) {
      return flip(wall)
    }
  }
}

const isThereAPath = (mazeSize, walls, startPosition, endPosition) => {
  const isValid = (position) => {
    const { row, col } = position
    return row >= 0 && row < mazeSize && col >= 0 && col < mazeSize && !walls.has(`${row},${col}`)
  }
  const visited = new Set()
  const queue = [startPosition]

  while (queue.length > 0) {
    const position = queue.shift()
    if (position.row === endPosition.row && position.col === endPosition.col) {
      return true
    }

    const positionKey = `${position.row},${position.col}`

    if (visited.has(positionKey)) {
      continue
    }
    visited.add(positionKey)

    for (const [dRow, dCol] of dirMap) {
      const nextPosition = { row: position.row + dRow, col: position.col + dCol }
      if (isValid(nextPosition) && !visited.has(`${nextPosition.row},${nextPosition.col}`)) {
        queue.push(nextPosition)
      }
    }
  }

  return false
}

const flip = (str) => {
  const [a, b] = str.split(',')
  return `${b},${a}`
}

module.exports = { solvePuzzle1, solvePuzzle2 }
