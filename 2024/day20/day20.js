const getLinesFromPath = require('../index')

const solvePuzzle1 = (lines, testing, valueLookingForInShortcuts) => {
  if (!testing) {
    lines = getLinesFromPath('day20/input.txt')
  }
  const { start, end, walls, mazeSize } = parseInput(lines)

  const shortestPath = getShortestPath(mazeSize, walls, start, end)
  const standardLength = shortestPath.length - 1

  const shortcutsSavings = {}
  const wallsArray = Array.from(walls)

  for (let i = 0; i < wallsArray.length; i++) {
    const wallToRemove = wallsArray[i]
    const tempWalls = new Set(wallsArray)
    tempWalls.delete(wallToRemove)

    const pathLength = getShortestPath(mazeSize, tempWalls, start, end).length - 1
    if (pathLength === Infinity) continue

    const savings = standardLength - pathLength
    if (savings > 0) {
      shortcutsSavings[savings] = (shortcutsSavings[savings] || 0) + 1
    }
  }

  return testing
    ? shortcutsSavings[valueLookingForInShortcuts] || 0
    : Object.entries(shortcutsSavings).reduce((acc, [savings, count]) => {
        if (Number(savings) >= valueLookingForInShortcuts) {
          return acc + count
        }
        return acc
      }, 0)
}

const dirMap = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const getShortestPath = (mazeSize, walls, startPosition, endPosition, maxAllowedLength = Infinity) => {
  const isValid = (position) => {
    const { row, col } = position
    return row >= 0 && row < mazeSize.row && col >= 0 && col < mazeSize.col && !walls.has(`${row},${col}`)
  }

  const visited = new Set()
  const queue = [[startPosition, 0]]

  while (queue.length > 0) {
    const [position, distance] = queue.shift()

    if (distance >= maxAllowedLength) {
      return { length: Infinity }
    }

    if (position.row === endPosition.row && position.col === endPosition.col) {
      return { length: distance }
    }

    const positionKey = `${position.row},${position.col}`
    if (visited.has(positionKey)) continue
    visited.add(positionKey)

    for (const [dRow, dCol] of dirMap) {
      const nextPosition = { row: position.row + dRow, col: position.col + dCol }
      if (isValid(nextPosition) && !visited.has(`${nextPosition.row},${nextPosition.col}`)) {
        queue.push([nextPosition, distance + 1])
      }
    }
  }

  return { length: Infinity }
}

const parseInput = (input) => {
  const walls = new Set()
  const mazeSize = { row: input.length, col: input[0].length }
  const start = {}
  const end = {}

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      const value = input[row][col]
      switch (value) {
        case '#':
          walls.add(`${row},${col}`)
          break
        case 'S':
          start.row = row
          start.col = col
          break
        case 'E':
          end.row = row
          end.col = col
          break
      }
    }
  }
  return { walls, mazeSize, start, end }
}

const solvePuzzle2 = (lines, testing, valueLookingForInShortcuts) => {
  if (!testing) {
    lines = getLinesFromPath('day20/input.txt')
  }
  const { start, end, walls, mazeSize } = parseInput(lines)
  // console.log({ start, end, walls, mazeSize })
  const shortestPath = getShortestPath(mazeSize, walls, start, end)
  const standardLength = shortestPath.length - 1

  const distancesFromStart = calculateDistancesToAllPoints(mazeSize, walls, start)
  const distancesToEnd = calculateDistancesToAllPoints(mazeSize, walls, end)

  const shortcutsSavings = {}

  for (const [startPosStr, distFromStart] of Object.entries(distancesFromStart)) {
    const [startRow, startCol] = startPosStr.split(',').map(Number)

    const reachablePoints = findReachablePointsIgnoringWalls({ row: startRow, col: startCol }, mazeSize, 20)

    for (const [endPos, cheatLength] of reachablePoints) {
      const distToEnd = distancesToEnd[endPos]
      if (distToEnd === undefined) continue

      const totalDist = distFromStart + cheatLength + distToEnd
      const savings = standardLength - totalDist
      const roundedSavings = Math.floor(savings / 2) * 2

      if (roundedSavings >= valueLookingForInShortcuts) {
        shortcutsSavings[roundedSavings] = (shortcutsSavings[roundedSavings] || 0) + 1
      }
    }
  }

  return testing
    ? shortcutsSavings[valueLookingForInShortcuts] || 0
    : Object.entries(shortcutsSavings).reduce((acc, [savings, count]) => {
        if (Number(savings) >= valueLookingForInShortcuts) {
          return acc + count
        }
        return acc
      }, 0)
}

const findReachablePointsIgnoringWalls = (start, mazeSize, maxSteps) => {
  const reachablePoints = new Map()
  const queue = [[start, 0]]
  const visited = new Set()

  while (queue.length > 0) {
    const [pos, steps] = queue.shift()
    const posKey = `${pos.row},${pos.col}`

    if (steps > maxSteps) continue
    if (visited.has(posKey)) continue
    visited.add(posKey)

    reachablePoints.set(posKey, steps)

    if (steps < maxSteps) {
      for (const [dRow, dCol] of dirMap) {
        const nextRow = pos.row + dRow
        const nextCol = pos.col + dCol

        if (nextRow >= 0 && nextRow < mazeSize.row && nextCol >= 0 && nextCol < mazeSize.col) {
          queue.push([{ row: nextRow, col: nextCol }, steps + 1])
        }
      }
    }
  }

  return reachablePoints
}

const calculateDistancesToAllPoints = (mazeSize, walls, start) => {
  const distances = {}
  const queue = [[start, 0]]
  distances[`${start.row},${start.col}`] = 0

  while (queue.length > 0) {
    const [pos, dist] = queue.shift()

    for (const [dRow, dCol] of dirMap) {
      const nextRow = pos.row + dRow
      const nextCol = pos.col + dCol
      const nextPos = `${nextRow},${nextCol}`

      if (
        nextRow >= 0 &&
        nextRow < mazeSize.row &&
        nextCol >= 0 &&
        nextCol < mazeSize.col &&
        !walls.has(nextPos) &&
        distances[nextPos] === undefined
      ) {
        distances[nextPos] = dist + 1
        queue.push([{ row: nextRow, col: nextCol }, dist + 1])
      }
    }
  }

  return distances
}
module.exports = { solvePuzzle1, solvePuzzle2 }
