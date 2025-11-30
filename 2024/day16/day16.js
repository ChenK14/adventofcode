const getLinesFromPath = require('../index')

const getSpecialLocations = (matrix) => {
  // This function remains the same
  const walls = new Set()
  const start = {}
  const end = {}

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const value = matrix[i][j]
      switch (value) {
        case '#':
          walls.add(`${i},${j}`)
          break
        case 'S':
          start.row = i
          start.col = j
          break
        case 'E':
          end.row = i
          end.col = j
          break
      }
    }
  }

  return { start, end, walls }
}

class PriorityQueue {
  constructor() {
    this.values = []
  }

  enqueue(item, priority) {
    this.values.push({ item, priority })
    this.sort()
  }

  dequeue() {
    return this.values.shift().item
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority)
  }

  isEmpty() {
    return this.values.length === 0
  }
}

const findShortestPath = (start, end, walls, initialDirection) => {
  // Create a priority queue for Dijkstra's algorithm
  const queue = new PriorityQueue()
  // Create a visited set to track states we've seen
  const visited = new Map()

  // Initial state: position, direction, and cost
  const initialState = {
    position: start,
    direction: initialDirection,
    cost: 0,
  }

  // Add initial state to queue
  queue.enqueue(initialState, 0)

  while (!queue.isEmpty()) {
    const current = queue.dequeue()
    const { position, direction, cost } = current

    // Create state key
    const stateKey = `${position.row},${position.col},${direction}`

    // Skip if we've seen this state with a lower cost
    if (visited.has(stateKey) && visited.get(stateKey) <= cost) {
      continue
    }

    // Update visited with current cost
    visited.set(stateKey, cost)

    // Check if we reached the end
    if (position.row === end.row && position.col === end.col) {
      return cost
    }

    // Generate all possible moves

    // 1. Move forward
    const [deltaRow, deltaCol] = dirMap[direction]
    const forwardPosition = {
      row: position.row + deltaRow,
      col: position.col + deltaCol,
    }

    if (!walls.has(`${forwardPosition.row},${forwardPosition.col}`)) {
      const newCost = cost + 1
      queue.enqueue(
        {
          position: forwardPosition,
          direction: direction,
          cost: newCost,
        },
        newCost,
      )
    }

    // 2. Rotate left and move
    const leftDir = rotation[direction].rotateLeft
    const [leftDeltaRow, leftDeltaCol] = dirMap[leftDir]
    const leftPosition = {
      row: position.row + leftDeltaRow,
      col: position.col + leftDeltaCol,
    }

    if (!walls.has(`${leftPosition.row},${leftPosition.col}`)) {
      const newCost = cost + 1001
      queue.enqueue(
        {
          position: leftPosition,
          direction: leftDir,
          cost: newCost,
        },
        newCost,
      )
    }

    // 3. Rotate right and move
    const rightDir = rotation[direction].rotateRight
    const [rightDeltaRow, rightDeltaCol] = dirMap[rightDir]
    const rightPosition = {
      row: position.row + rightDeltaRow,
      col: position.col + rightDeltaCol,
    }

    if (!walls.has(`${rightPosition.row},${rightPosition.col}`)) {
      const newCost = cost + 1001
      queue.enqueue(
        {
          position: rightPosition,
          direction: rightDir,
          cost: newCost,
        },
        newCost,
      )
    }

    // 4. Rotate 180 degrees and move
    const fullRotateDir = rotation[direction].rotate
    const [fullDeltaRow, fullDeltaCol] = dirMap[fullRotateDir]
    const fullRotatePosition = {
      row: position.row + fullDeltaRow,
      col: position.col + fullDeltaCol,
    }

    if (!walls.has(`${fullRotatePosition.row},${fullRotatePosition.col}`)) {
      const newCost = cost + 2001
      queue.enqueue(
        {
          position: fullRotatePosition,
          direction: fullRotateDir,
          cost: newCost,
        },
        newCost,
      )
    }
  }

  return Infinity // No path found
}

// dirMap and rotation objects remain the same
const dirMap = {
  Right: [0, 1],
  Up: [-1, 0],
  Down: [1, 0],
  Left: [0, -1],
}

const rotation = {
  Left: {
    rotateLeft: 'Down',
    rotateRight: 'Up',
    rotate: 'Right',
  },
  Right: {
    rotateLeft: 'Up',
    rotateRight: 'Down',
    rotate: 'Left',
  },
  Up: {
    rotateLeft: 'Left',
    rotateRight: 'Right',
    rotate: 'Down',
  },
  Down: {
    rotateLeft: 'Right',
    rotateRight: 'Left',
    rotate: 'Up',
  },
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day16/input.txt')
  }

  const matrix = lines.map((row) => row.split(''))
  const { start, end, walls } = getSpecialLocations(matrix)
  return findShortestPath(start, end, walls, 'Right')
}

const getShortestPath = (start, end, walls, initialDirection) => {
  const queue = new PriorityQueue()
  const visited = new Map()
  const optimalPaths = new Set()
  let minCost = Infinity

  // Store all paths that reach the end with minimal cost
  const optimalPathsToEnd = []

  const initialState = {
    position: start,
    direction: initialDirection,
    cost: 0,
    path: [`${start.row},${start.col}`], // Changed to array to maintain order
  }

  queue.enqueue(initialState, 0)

  while (!queue.isEmpty()) {
    const current = queue.dequeue()
    const { position, direction, cost, path } = current

    if (cost > minCost) continue

    const stateKey = `${position.row},${position.col},${direction}`

    // Modified visited check to allow multiple paths with same cost
    if (visited.has(stateKey) && visited.get(stateKey) < cost) {
      continue
    }

    visited.set(stateKey, cost)

    // If we reached the end
    if (position.row === end.row && position.col === end.col) {
      if (cost <= minCost) {
        if (cost < minCost) {
          minCost = cost
          optimalPathsToEnd.length = 0 // Clear previous paths if we found a better one
        }
        optimalPathsToEnd.push([...path]) // Store the complete path
      }
      continue
    }

    // Helper function to process moves
    const processMove = (newPosition, newDirection, newCost) => {
      const posKey = `${newPosition.row},${newPosition.col}`
      if (!walls.has(posKey)) {
        const newPath = [...path, posKey]
        queue.enqueue(
          {
            position: newPosition,
            direction: newDirection,
            cost: newCost,
            path: newPath,
          },
          newCost,
        )
      }
    }

    // 1. Move forward
    const [deltaRow, deltaCol] = dirMap[direction]
    processMove({ row: position.row + deltaRow, col: position.col + deltaCol }, direction, cost + 1)

    // 2. Rotate left and move
    const leftDir = rotation[direction].rotateLeft
    const [leftDeltaRow, leftDeltaCol] = dirMap[leftDir]
    processMove({ row: position.row + leftDeltaRow, col: position.col + leftDeltaCol }, leftDir, cost + 1001)

    // 3. Rotate right and move
    const rightDir = rotation[direction].rotateRight
    const [rightDeltaRow, rightDeltaCol] = dirMap[rightDir]
    processMove({ row: position.row + rightDeltaRow, col: position.col + rightDeltaCol }, rightDir, cost + 1001)

    // 4. Rotate 180 and move
    const fullRotateDir = rotation[direction].rotate
    const [fullDeltaRow, fullDeltaCol] = dirMap[fullRotateDir]
    processMove({ row: position.row + fullDeltaRow, col: position.col + fullDeltaCol }, fullRotateDir, cost + 2001)
  }

  // Combine all cells from optimal paths
  optimalPathsToEnd.forEach((path) => {
    path.forEach((cell) => optimalPaths.add(cell))
  })

  return optimalPaths.size
}
// Main solvePuzzle2 function
const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day16/input.txt')
  }

  const matrix = lines.map((row) => row.split(''))
  const { start, end, walls } = getSpecialLocations(matrix)
  return getShortestPath(start, end, walls, 'Right')
}

module.exports = { solvePuzzle1, solvePuzzle2 }

// OLD SOLUTION:
// const getSpecialLocations = (matrix) => {
//   const walls = new Set()
//   const start = {}
//   const end = {}

//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       const value = matrix[i][j]
//       switch (value) {
//         case '#':
//           walls.add(`${i},${j}`)
//           break
//         case 'S':
//           start.row = i
//           start.col = j
//           break
//         case 'E':
//           end.row = i
//           end.col = j
//           break
//       }
//     }
//   }

//   return { start, end, walls }
// }

// const findShortestPath = (currentPosition, end, walls, sumScore, direction, memo) => {
//   const stateKey = `${currentPosition.row},${currentPosition.col},${direction}`

//   // Check if the current state is a wall or has been visited with a better or equal score
//   if (walls.has(`${currentPosition.row},${currentPosition.col}`) || (memo[stateKey] !== undefined && memo[stateKey] <= sumScore)) {
//     return Infinity
//   }

//   // Check if the end position is reached
//   if (currentPosition.row === end.row && currentPosition.col === end.col) {
//     return sumScore
//   }

//   // Update memo with the current sumScore for this state
//   memo[stateKey] = sumScore

//   // Clone walls for this recursion branch to prevent interference
//   const newWalls = new Set(walls)
//   newWalls.add(`${currentPosition.row},${currentPosition.col}`)

//   // Calculate the new position if moving forward
//   const [deltaRow, deltaCol] = dirMap[direction]
//   const newPosition = {
//     row: currentPosition.row + deltaRow,
//     col: currentPosition.col + deltaCol,
//   }

//   // Determine new directions after rotation
//   const leftRotateDir = rotation[direction].rotateLeft
//   const rightRotateDir = rotation[direction].rotateRight
//   const fullRotateDir = rotation[direction].rotate

//   // Handle Move Forward
//   let moveForward = Infinity
//   if (!newWalls.has(`${newPosition.row},${newPosition.col}`)) {
//     moveForward = findShortestPath(newPosition, end, newWalls, sumScore + 1, direction, memo)
//   }

//   // Handle Rotate Left and Move
//   let rotateLeft = Infinity
//   const [leftDeltaRow, leftDeltaCol] = dirMap[leftRotateDir]
//   const leftNewPosition = {
//     row: currentPosition.row + leftDeltaRow,
//     col: currentPosition.col + leftDeltaCol,
//   }
//   if (!newWalls.has(`${leftNewPosition.row},${leftNewPosition.col}`)) {
//     rotateLeft = findShortestPath(
//       leftNewPosition,
//       end,
//       newWalls,
//       sumScore + 1001, // 1000 for rotation + 1 for movement
//       leftRotateDir,
//       memo,
//     )
//   }

//   // Handle Rotate Right and Move
//   let rotateRight = Infinity
//   const [rightDeltaRow, rightDeltaCol] = dirMap[rightRotateDir]
//   const rightNewPosition = {
//     row: currentPosition.row + rightDeltaRow,
//     col: currentPosition.col + rightDeltaCol,
//   }
//   if (!newWalls.has(`${rightNewPosition.row},${rightNewPosition.col}`)) {
//     rotateRight = findShortestPath(
//       rightNewPosition,
//       end,
//       newWalls,
//       sumScore + 1001, // 1000 for rotation + 1 for movement
//       rightRotateDir,
//       memo,
//     )
//   }

//   // Handle Rotate 180 Degrees and Move
//   let rotate180 = Infinity
//   const [fullDeltaRow, fullDeltaCol] = dirMap[fullRotateDir]
//   const fullNewPosition = {
//     row: currentPosition.row + fullDeltaRow,
//     col: currentPosition.col + fullDeltaCol,
//   }
//   if (!newWalls.has(`${fullNewPosition.row},${fullNewPosition.col}`)) {
//     rotate180 = findShortestPath(
//       fullNewPosition,
//       end,
//       newWalls,
//       sumScore + 2001, // 2000 for rotation + 1 for movement
//       fullRotateDir,
//       memo,
//     )
//   }

//   // Return the minimum score among all possible actions
//   return Math.min(moveForward, rotateLeft, rotateRight, rotate180)
// }

// const dirMap = {
//   Right: [0, 1],
//   Up: [-1, 0],
//   Down: [1, 0],
//   Left: [0, -1],
// }

// const rotation = {
//   Left: {
//     rotateLeft: 'Down',
//     rotateRight: 'Up',
//     rotate: 'Right',
//   },
//   Right: {
//     rotateLeft: 'Up',
//     rotateRight: 'Down',
//     rotate: 'Left',
//   },
//   Up: {
//     rotateLeft: 'Left',
//     rotateRight: 'Right',
//     rotate: 'Down',
//   },
//   Down: {
//     rotateLeft: 'Right',
//     rotateRight: 'Left',
//     rotate: 'Up',
//   },
// }

// const solvePuzzle1 = (lines, testing) => {
//   if (!testing) {
//     lines = getLinesFromPath('day16/input.txt')
//   }

//   const matrix = lines.map((row) => row.split(''))
//   const { start, end, walls } = getSpecialLocations(matrix)
//   return findShortestPath(start, end, walls, 0, 'Right', new Set(), {})
// }
