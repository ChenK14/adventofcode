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

  const map = getNumbOfToiletPapers2(lines)
  return Array.from(map.keys()).reduce((acc, curr) => {
    const neighborsCount = map.get(curr).size
    return acc += neighborsCount < 4 ? 1 : 0
  }, 0)
}


const removeTpFromArray = (matrix, positions) => {
  positions.forEach(val => {
    const [row, col] = val.split(',').map(val => Number(val))
    matrix[row][col] = 'x'
  });
}
// const solvePuzzle2 = (lines, testing) => {
//   if (!testing) {
//     lines = getLinesFromPath("day4/input.txt")
//   }

//   const matrix = lines.map(row => row.split(''))
//   let removedTpCount = 0
//   while (true) {
//     const tps = getNumbOfToiletPapers(matrix)
//     removeTpFromArray(matrix, tps)
//     removedTpCount += tps.size
//     if (tps.size === 0) {
//       break;
//     }
//   }
//   return removedTpCount
// }

// const solvePuzzle2 = (lines, testing) => {
//   if (!testing) {
//     lines = getLinesFromPath("day4/input.txt")
//   }

//   const map = getNumbOfToiletPapers2(lines)
//   for (const key of map.keys()) {
//     const neighbors = map.get(key)
//     if (neighbors.size < 4) {
//       for (const neighbor of neighbors) {
//         map.get(neighbor).delete(key)
//       }
//       // neighbors.clear()
//     }
//   }
//   return [...map.values()].filter(neighbors => neighbors.size < 4).length

// }


const getNeighborMap = (matrix) => {
  const tbMap = new Map() // each is a set of neighbors
  for (let row = 0; row < matrix.length; row++) {
    const isInBound = (newRow, newCol) => newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[row].length
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === '@') {
        const mapKey = `${row},${col}`
        tbMap.set(mapKey, new Set())
        for (let dir = 0; dir < directions.length; dir++) {
          const { rowShift, colShift } = directions[dir]
          const checkRow = row + rowShift
          const checkCol = col + colShift
          if (isInBound(checkRow, checkCol) && matrix[checkRow][checkCol] === '@') {
            tbMap.get(mapKey).add(`${checkRow},${checkCol}`)
          }
        }
      }
    }
  }
  return tbMap
}


const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day4/input.txt")
  }

  const map = getNeighborMap(lines)
  const removed = new Set()
  
  // Recursively try to remove a node and cascade to its neighbors
  const tryRemove = (key) => {
    // Already processed this node, skip to avoid infinite recursion
    if (removed.has(key)) return
    
    const neighbors = map.get(key)
    
    // Node has 4+ neighbors, can't be removed
    if (neighbors.size >= 4) return
    
    // Mark as removed
    removed.add(key)
    
    // For each neighbor: remove this node from their neighbor set,
    // then check if that neighbor can now be removed (their count dropped)
    for (const neighbor of neighbors) {
      map.get(neighbor).delete(key)
      tryRemove(neighbor)  // Cascade: neighbor might now have < 4
    }
  }
  
  // Try to remove every node as a starting point
  for (const key of map.keys()) {
    tryRemove(key)
  }
  
  return removed.size
}
module.exports = { solvePuzzle1, solvePuzzle2 }
