const getLinesFromPath = require("../index")

const parseInput = (lines) => {
  const shapes = []
  const regions = []
  let lineIndex = 0

  while (lineIndex < lines.length) {
    if (!lines[lineIndex]) { lineIndex++; continue }
    
    if (lines[lineIndex].includes('x')) break
    
    const shapeIndex = parseInt(lines[lineIndex].split(':')[0])
    lineIndex++

    const coords = []
    let row = 0
    while (lineIndex < lines.length && lines[lineIndex] && !lines[lineIndex].includes(':')) {
      for (let col = 0; col < lines[lineIndex].length; col++) {
        if (lines[lineIndex][col] === '#') {
          coords.push([row, col])
        }
      }
      row++
      lineIndex++
    }
    shapes[shapeIndex] = coords
  }

  while (lineIndex < lines.length) {
    if (!lines[lineIndex]) { lineIndex++; continue }
    const parts = lines[lineIndex].split(' ')
    const [width, height] = parts[0].replace(':', '').split('x').map(Number)
    const counts = parts.slice(1).map(Number)
    regions.push({ width, height, counts })
    lineIndex++
  }

  return { shapes, regions }
}

const normalize = (shape) => {
  const minRow = Math.min(...shape.map(([row]) => row))
  const minCol = Math.min(...shape.map(([, col]) => col))
  return shape
    .map(([row, col]) => [row - minRow, col - minCol])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
}

const rotateClockwise = (shape) => {
  const maxRow = Math.max(...shape.map(([row]) => row))
  const shapeHeight = maxRow + 1
  const rotated = shape.map(([row, col]) => [col, shapeHeight - 1 - row])
  return normalize(rotated)
}

const flipHorizontal = (shape) => {
  const maxCol = Math.max(...shape.map(([, col]) => col))
  const flipped = shape.map(([row, col]) => [row, maxCol - col])
  return normalize(flipped)
}

const shapeToString = (shape) => shape.map(([row, col]) => `${row},${col}`).join('|')

const getAllOrientations = (shape) => {
  const seen = new Set()
  const orientations = []

  let current = normalize(shape)
  for (let flipCount = 0; flipCount < 2; flipCount++) {
    for (let rotationCount = 0; rotationCount < 4; rotationCount++) {
      const key = shapeToString(current)
      if (!seen.has(key)) {
        seen.add(key)
        orientations.push(current)
      }
      current = rotateClockwise(current)
    }
    current = flipHorizontal(current)
  }

  return orientations
}

const canPlace = (grid, shape, startRow, startCol, gridHeight, gridWidth) => {
  for (const [deltaRow, deltaCol] of shape) {
    const row = startRow + deltaRow
    const col = startCol + deltaCol
    if (row < 0 || row >= gridHeight || col < 0 || col >= gridWidth || grid[row][col]) {
      return false
    }
  }
  return true
}

const place = (grid, shape, startRow, startCol, value) => {
  for (const [deltaRow, deltaCol] of shape) {
    grid[startRow + deltaRow][startCol + deltaCol] = value
  }
}

const backtrack = (grid, pieces, pieceIndex, gridHeight, gridWidth, emptyCells, cellsNeeded) => {
  if (pieceIndex === pieces.length) return true

  const remainingCellsNeeded = cellsNeeded[pieceIndex]
  if (emptyCells < remainingCellsNeeded) return false

  const orientations = pieces[pieceIndex]
  const pieceSize = orientations[0].length

  for (const shape of orientations) {
    for (let row = 0; row < gridHeight; row++) {
      for (let col = 0; col < gridWidth; col++) {
        if (!grid[row][col] && canPlace(grid, shape, row, col, gridHeight, gridWidth)) {
          place(grid, shape, row, col, true)
          if (backtrack(grid, pieces, pieceIndex + 1, gridHeight, gridWidth, emptyCells - pieceSize, cellsNeeded)) {
            return true
          }
          place(grid, shape, row, col, false)
        }
      }
    }
  }

  return false
}

const canFitRegion = (shapes, region) => {
  const { width, height, counts } = region

  const pieces = []
  for (let shapeIdx = 0; shapeIdx < counts.length; shapeIdx++) {
    const count = counts[shapeIdx]
    if (count === 0) continue
    
    const orientations = getAllOrientations(shapes[shapeIdx])
    for (let i = 0; i < count; i++) {
      pieces.push(orientations)
    }
  }

  if (pieces.length === 0) return true

  const totalCells = pieces.reduce((sum, orientations) => sum + orientations[0].length, 0)
  if (totalCells > width * height) return false

  pieces.sort((a, b) => b[0].length - a[0].length)

  const cellsNeeded = new Array(pieces.length)
  cellsNeeded[pieces.length - 1] = pieces[pieces.length - 1][0].length
  for (let i = pieces.length - 2; i >= 0; i--) {
    cellsNeeded[i] = cellsNeeded[i + 1] + pieces[i][0].length
  }

  const grid = Array.from({ length: height }, () => Array(width).fill(false))
  return backtrack(grid, pieces, 0, height, width, width * height, cellsNeeded)
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day12/input.txt")
  }

  const { shapes, regions } = parseInput(lines)
  let count = 0

  for (const region of regions) {
    if (canFitRegion(shapes, region)) {
      count++
    }
  }

  return count
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day12/input.txt")
  }
  return 0
}

module.exports = { solvePuzzle1, solvePuzzle2 }

module.exports = { solvePuzzle1, solvePuzzle2 }