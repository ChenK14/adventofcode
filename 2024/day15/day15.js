const getLinesFromPath = require('../index')

const dirMap = {
  '>': [0, 1],
  '^': [-1, 0],
  v: [1, 0],
  '<': [0, -1],
}
const solvePuzzle2 = (lines, testing = false) => {
  if (!testing) {
        lines = getLinesFromPath('day15/input.txt')
      }
  // Parse input
  const inputString = Array.isArray(lines) ? lines.join('\n') : lines

  // Parse input
  let [gridRaw, movements] = inputString.split('\n\n')
  movements = movements.replace(/\n/g, '').split('')

  // Create Bound2D class for collision detection
  class Bound2D {
    constructor(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width || 0
      this.height = height || 0
    }

    doesCollide(bound) {
      return this.x < bound.x + bound.width && this.x + this.width > bound.x && this.y < bound.y + bound.height && this.y + this.height > bound.y
    }
  }

  // Parse grid
  let grid = gridRaw.split('\n').map((row) => row.split(''))

  // Find player position
  let playerPos = { x: 0, y: 0 }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '@') {
        playerPos = { x: j * 2, y: i, bound: new Bound2D(j, i, 1, 1) }
        break
      }
    }
  }

  // Find boxes
  let boxes = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'O') {
        boxes.push({
          x: x * 2,
          y,
          bound: new Bound2D(x * 2, y, 2, 1),
          id: boxes.length,
        })
      }
    }
  }

  // Find walls
  let walls = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '#') {
        walls.push({ x: x * 2, y, bound: new Bound2D(x * 2, y, 2, 1) })
      }
    }
  }

  // Directions mapping
  const directions = {
    '^': { x: 0, y: -1 },
    v: { x: 0, y: 1 },
    '<': { x: -1, y: 0 },
    '>': { x: 1, y: 0 },
  }

  // Move through instructions
  for (const mov of movements) {
    const newPosition = {
      x: playerPos.x + directions[mov].x,
      y: playerPos.y + directions[mov].y,
      bound: new Bound2D(playerPos.x + directions[mov].x, playerPos.y + directions[mov].y, 1, 1),
    }

    // Check wall collisions
    let doesWallsCollide = walls.some((wall) => wall.bound.doesCollide(newPosition.bound))
    if (doesWallsCollide) continue

    // Check box collisions
    let collidedBox = boxes.find((box) => box.bound.doesCollide(newPosition.bound))

    let drafts = []
    let finalized = []
    let moveOK = true

    // If no box collision, just move player
    if (!collidedBox) {
      playerPos = newPosition
      continue
    }

    // Prepare to push box
    drafts.push({
      x: collidedBox.x + directions[mov].x,
      y: collidedBox.y + directions[mov].y,
      bound: new Bound2D(collidedBox.x + directions[mov].x, collidedBox.y + directions[mov].y, 2, 1),
      id: collidedBox.id,
    })

    // Check if pushing boxes is possible
    while (drafts.length > 0) {
      const draft = drafts.shift()

      // Check wall collisions for pushed box
      let doesCollideWall = walls.some((wall) => wall.bound.doesCollide(draft.bound))
      if (doesCollideWall) {
        moveOK = false
        break
      }

      // Check box collisions when pushing
      let collidingBoxes = boxes.filter((box) => box.bound.doesCollide(draft.bound) && box.id !== draft.id)

      // Add colliding boxes to drafts
      for (const box of collidingBoxes) {
        drafts.push({
          x: box.x + directions[mov].x,
          y: box.y + directions[mov].y,
          bound: new Bound2D(box.x + directions[mov].x, box.y + directions[mov].y, 2, 1),
          id: box.id,
        })
      }

      // Finalize the move
      finalized.push(draft)
    }

    // If move is possible, update positions
    if (moveOK) {
      playerPos = newPosition
      for (const final of finalized) {
        const boxIndex = boxes.findIndex((box) => box.id === final.id)
        if (boxIndex !== -1) {
          boxes[boxIndex] = final
        }
      }
    }
  }

  // Calculate final score
  let score = boxes.reduce((acc, box) => {
    return acc + box.bound.y * 100 + box.bound.x
  }, 0)

  return score
}

// const solvePuzzle2 = (lines, testing) => {
//   if (!testing) {
//     lines = getLinesFromPath('day15/input.txt')
//   }

//   // const { instructions, robotLocation, matrix } = parseInput(lines)

//   // const transformedMatrix = transformMatrix(matrix)

//   const transformedMatrix = [
//     '####################',
//     '##[]..[]......[][]##',
//     '##[]........@..[].##',
//     '##..........[][][]##',
//     '##...........[][].##',
//     '##..##[]..[]......##',
//     '##...[]...[]..[]..##',
//     '##.....[]..[].[][]##',
//     '##........[]......##',
//     '####################'
//   ].map((row) => row.split(''))

//   const instructions = ['v']

//   const transformRobotLocation = findRobotLocation(transformedMatrix)

//   console.log('BEFORE:', printMatrix(transformedMatrix))

//   moveAccordingToInstructions2(transformedMatrix, transformRobotLocation, instructions)

//   console.log('AFTER: ', printMatrix(transformedMatrix))
// }

// const getBoxesFromMatrix2 = (matrix) => {
//   const boxes = []
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {
//       switch (matrix[i][j]) {
//         case '[':
//           boxes.push({ row: i, col: j })
//           break
//       }
//     }
//   }
//   return boxes
// }

// const switchPlaces2 = (matrix, { newRow, newCol }, { oldRow, oldCol }) => {
//   const tempValue = matrix[newRow][newCol]
//   matrix[newRow][newCol] = matrix[oldRow][oldCol]
//   matrix[oldRow][oldCol] = tempValue
// }

// const isValidPush2 = (matrix, box, instruction) => {
//   const { row: boxRow, col: boxCol } = box
//   const newRow = boxRow + dirMap[instruction][0]
//   const newCol = boxCol + dirMap[instruction][1]
//   if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
//     switch (matrix[newRow][newCol]) {
//       case '.':
//         return true
//       case '#':
//         return false
//       case '[':
//         return isValidPush2(matrix, { row: newRow, col: newCol }, instruction) && isValidPush2(matrix, { row: newRow, col: newCol + 1 }, instruction)
//       case ']':
//         return isValidPush2(matrix, { row: newRow, col: newCol }, instruction) && isValidPush2(matrix, { row: newRow, col: newCol - 1 }, instruction)
//     }
//   } else {
//     return false
//   }
// }

// const pushBox2 = (matrix, box, instruction) => {
//   const { row: oldRow, col: oldCol } = box
//   const current = matrix[oldRow][oldCol]

//   const newRow = oldRow + dirMap[instruction][0]
//   const newCol = oldCol + dirMap[instruction][1]

//   console.log(`Attempting to push from (${oldRow},${oldCol}) to (${newRow},${newCol})`)
//   console.log(`Current piece: ${matrix[oldRow][oldCol]}, Target space: ${matrix[newRow][newCol]}`)
//   if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
//     switch (matrix[newRow][newCol]) {
//       case '.':
//         switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//         return
//       case '[':
//         pushBox2(matrix, { row: newRow, col: newCol }, instruction)
//         switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//         if (current !== '[') {
//           pushBox2(matrix, { row: newRow, col: newCol + 1 }, instruction)
//           switchPlaces2(matrix, { newRow, newCol: newCol + 1 }, { oldRow, oldCol: oldCol + 1 })
//         }
//         return
//       case ']':
//         pushBox2(matrix, { row: newRow, col: newCol }, instruction)
//         switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//         if (current !== ']') {
//           console.log('GOT HERE')
//           pushBox2(matrix, { row: newRow, col: newCol - 1 }, instruction)
//           switchPlaces2(matrix, { newRow, newCol: newCol - 1 }, { oldRow, oldCol: oldCol - 1 })
//         }
//         return
//     }
//   }
// }

// const pushBox2Horizontal = (matrix, box, instruction) => {
//   let boxLeftSide = {}
//   let boxRightSide = {}
//   const isMovingRight = instruction === '>'

//   if (isMovingRight) {
//     boxLeftSide = { ...box }
//     boxRightSide = { ...box, col: box.col + 1 }
//   } else {
//     boxLeftSide = { ...box, col: box.col - 1 }
//     boxRightSide = { ...box }
//   }
//   const newRow = box.row
//   const newCol = isMovingRight ? boxRightSide.col + 1 : boxLeftSide.col - 1
//   if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
//     switch (matrix[newRow][newCol]) {
//       case '.':
//         const middlePosition = isMovingRight ? { ...boxRightSide } : { ...boxLeftSide }
//         const oldPosition = isMovingRight ? { ...boxLeftSide } : { ...boxRightSide }
//         switchPlaces2(matrix, { newRow, newCol }, { oldRow: middlePosition.row, oldCol: middlePosition.col })
//         switchPlaces2(matrix, { newRow: middlePosition.row, newCol: middlePosition.col }, { oldRow: oldPosition.row, oldCol: oldPosition.col })
//         return
//       case '[': // moving right
//         pushBox2Horizontal(matrix, { row: newRow, col: newCol }, instruction)
//         switchPlaces2(matrix, { newRow, newCol }, { oldRow: boxRightSide.row, oldCol: boxRightSide.col })
//         switchPlaces2(matrix, { newRow: boxRightSide.row, newCol: boxRightSide.col }, { oldRow: boxLeftSide.row, oldCol: boxLeftSide.col })
//         return
//       case ']': // moving left
//         pushBox2Horizontal(matrix, { row: newRow, col: newCol }, instruction)
//         switchPlaces2(matrix, { newRow, newCol }, { oldRow: boxLeftSide.row, oldCol: boxLeftSide.col })
//         switchPlaces2(matrix, { newRow: boxLeftSide.row, newCol: boxLeftSide.col }, { oldRow: boxRightSide.row, oldCol: boxRightSide.col })
//         return
//     }
//   }
// }
// const isValidPush2Horizontal = (matrix, box, instruction) => {
//   let boxLeftSide = {}
//   let boxRightSide = {}
//   const isMovingRight = instruction === '>'

//   if (isMovingRight) {
//     boxLeftSide = { ...box }
//     boxRightSide = { ...box, col: box.col + 1 }
//   } else {
//     boxLeftSide = { ...box, col: box.col - 1 }
//     boxRightSide = { ...box }
//   }
//   const newRow = box.row
//   const newCol = isMovingRight ? boxRightSide.col + 1 : boxLeftSide.col - 1
//   if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
//     switch (matrix[newRow][newCol]) {
//       case '.':
//         return true
//       case '#':
//         return false
//       case '[':
//         return isValidPush2Horizontal(matrix, { row: newRow, col: newCol }, instruction)
//       case ']':
//         return isValidPush2Horizontal(matrix, { row: newRow, col: newCol }, instruction)
//     }
//   } else {
//     return false
//   }
// }

// const moveAccordingToInstructions2 = (matrix, robotLocation, instructions) => {
//   let currRobotLocation = robotLocation

//   for (let i = 0; i < instructions.length; i++) {
//     const instruction = instructions[i]
//     const { row: oldRow, col: oldCol } = currRobotLocation
//     const newRow = oldRow + dirMap[instruction][0]
//     const newCol = oldCol + dirMap[instruction][1]
//     if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
//       switch (matrix[newRow][newCol]) {
//         case '.':
//           switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//           currRobotLocation = { row: newRow, col: newCol }
//           break
//         case '#':
//           break
//         case '[':
//           const boxLeftSide = { row: newRow, col: newCol }
//           if (dirMap[instruction][0] === 0) {
//             // horizontal
//             if (isValidPush2Horizontal(matrix, boxLeftSide, instruction)) {
//               pushBox2Horizontal(matrix, boxLeftSide, instruction)
//               switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//               currRobotLocation = { row: newRow, col: newCol }
//             }
//           } else {
//             if (
//               isValidPush2(matrix, boxLeftSide, instruction) &&
//               isValidPush2(matrix, { row: boxLeftSide.row, col: boxLeftSide.col + 1 }, instruction)
//             ) {
//               pushBox2(matrix, boxLeftSide, instruction)
//               console.log('so far pushed good')
//               pushBox2(matrix, { row: boxLeftSide.row, col: boxLeftSide.col + 1 }, instruction)
//               switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//               currRobotLocation = { row: newRow, col: newCol }
//             }
//           }
//           break
//         case ']':
//           const boxRightSide = { row: newRow, col: newCol }
//           if (dirMap[instruction][0] === 0) {
//             // horizontal
//             if (isValidPush2Horizontal(matrix, boxRightSide, instruction)) {
//               pushBox2Horizontal(matrix, boxRightSide, instruction)
//               switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//               currRobotLocation = { row: newRow, col: newCol }
//             }
//           } else {
//             if (
//               isValidPush2(matrix, boxRightSide, instruction) &&
//               isValidPush2(matrix, { row: boxRightSide.row, col: boxRightSide.col - 1 }, instruction)
//             ) {
//               pushBox2(matrix, boxRightSide, instruction)
//               pushBox2(matrix, { row: boxRightSide.row, col: boxRightSide.col - 1 }, instruction)
//               switchPlaces2(matrix, { newRow, newCol }, { oldRow, oldCol })
//               currRobotLocation = { row: newRow, col: newCol }
//             }
//           }
//           break
//       }
//     }
//   }
// }
const parseInput = (input) => {
  const instructions = []
  const robotLocation = {}
  const matrix = []

  let mapParsed = false

  for (let i = 0; i < input.length; i++) {
    const line = input[i]

    if (line === '') {
      mapParsed = true
      continue
    }

    if (!mapParsed) {
      matrix.push(line.split(''))
    }

    if (mapParsed) {
      instructions.push(...line.split(''))
    }
  }

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] === '@') {
        robotLocation.row = r
        robotLocation.col = c
        break
      }
    }
  }

  return { instructions, robotLocation, matrix }
}

const switchPlaces = (matrix, { newRow, newCol }, { oldRow, oldCol }) => {
  const tempValue = matrix[newRow][newCol]
  matrix[newRow][newCol] = matrix[oldRow][oldCol]
  matrix[oldRow][oldCol] = tempValue
}

const isValidPush = (matrix, box, instruction) => {
  const { row: boxRow, col: boxCol } = box
  const newRow = boxRow + dirMap[instruction][0]
  const newCol = boxCol + dirMap[instruction][1]
  if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
    switch (matrix[newRow][newCol]) {
      case '.':
        return true
      case '#':
        return false
      case 'O':
        return isValidPush(matrix, { row: newRow, col: newCol }, instruction)
    }
  } else {
    return false
  }
}

const pushBox = (matrix, box, instruction) => {
  const { row: oldRow, col: oldCol } = box

  const newRow = oldRow + dirMap[instruction][0]
  const newCol = oldCol + dirMap[instruction][1]
  if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
    switch (matrix[newRow][newCol]) {
      case '.':
        switchPlaces(matrix, { newRow, newCol }, { oldRow, oldCol })
        return
      case 'O':
        pushBox(matrix, { row: newRow, col: newCol }, instruction)
        switchPlaces(matrix, { newRow, newCol }, { oldRow, oldCol })
        return
    }
  }
}
const moveAccordingToInstructions = (matrix, robotLocation, instructions) => {
  let currRobotLocation = robotLocation

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]
    const { row: oldRow, col: oldCol } = currRobotLocation
    const newRow = oldRow + dirMap[instruction][0]
    const newCol = oldCol + dirMap[instruction][1]
    if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[newRow].length) {
      switch (matrix[newRow][newCol]) {
        case '.':
          switchPlaces(matrix, { newRow, newCol }, { oldRow, oldCol })
          currRobotLocation = { row: newRow, col: newCol }
          break
        case '#':
          break
        case 'O':
          const box = { row: newRow, col: newCol }
          if (isValidPush(matrix, box, instruction)) {
            pushBox(matrix, box, instruction)
            switchPlaces(matrix, { newRow, newCol }, { oldRow, oldCol })
            currRobotLocation = { row: newRow, col: newCol }
          }
          break
      }
    }
  }
}

const getBoxesFromMatrix = (matrix) => {
  const boxes = []
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      switch (matrix[i][j]) {
        case 'O':
          boxes.push({ row: i, col: j })
          break
      }
    }
  }
  return boxes
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day15/input.txt')
  }

  const { instructions, robotLocation, matrix } = parseInput(lines)
  console.log(printMatrix(matrix))

  // console.log({ instructions, walls, boxes, robotLocation, matrix })
  moveAccordingToInstructions(matrix, robotLocation, instructions)

  console.log(printMatrix(matrix))

  const boxes = getBoxesFromMatrix(matrix)

  return boxes.reduce((acc, box) => {
    acc += 100 * box.row + box.col
    return acc
  }, 0)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
