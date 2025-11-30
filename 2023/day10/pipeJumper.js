const getLinesFromPath = require("../index")

let lines = getLinesFromPath("day10/input.txt")

// Vertical Pipe ('|'):
// If coming from  ('up'), go  ('down'). // good symbols are- |, J, L
// If coming from  ('down'), go  ('up'). // good symbols are- |, F, 7

// Horizontal Pipe ('-'):
// If coming from  ('right'), go  ('left'). // good symbols are- -, F, L
// If coming from  ('left'), go  ('right'). // good symbols are- -, 7, J

// 90-degree Bends:
// For 'L':
// If coming from  ('up'), go  ('right'). // good symbols are- -, 7, J
// If coming from  ('right'), go  ('up'). // good symbols are- |, F, 7
// For 'J':
// If coming from  ('up'), go  ('left'). // good symbols are- -, F, L
// If coming from  ('left'), go  ('up'). // good symbols are- |, F, 7
// For '7':
// If coming from ('left'), go  ('down'). // good symbols are- |, J, L
// If coming from  ('down'), go  ('left'). // good symbols are- -, F, L
// For 'F':
// If coming from  ('down'), go  ('right'). // good symbols are- -, 7, J
// If coming from  ('down'), go  ('right'). // good symbols are- |, J, L
// Starting Position ('S'):
//   GO IN ALL 4 DIRECTIONS // good symbols are- |, J, L, -, F, 7

// let startIndex = [-1, -1]

// const instructionToValidSymbolsMap = {
//   up: new Set(["|", "F", "7"]),
//   down: new Set(["|", "J", "L"]),
//   left: new Set(["-", "F", "L"]),
//   right: new Set(["-", "7", "J"]),
// }
// const validSymbolsAndInstruction = {
//   // meaning is i got validSymbolsAndInstruction[i], i can go to validSymbolsAndInstruction[i].[up/down/left/right]
//   "|": {
//     up: ["|", "F", "7"],
//     down: ["|", "J", "L"],
//   },
//   "-": {
//     right: ["-", "7", "J"],
//     left: ["-", "F", "L"],
//   },
//   L: {
//     up: ["|", "F", "7"],
//     right: ["-", "7", "J"],
//   },
//   J: {
//     up: ["|", "F", "7"],
//     left: ["-", "F", "L"],
//   },
//   7: {
//     left: ["-", "F", "L"],
//     down: ["|", "J", "L"],
//   },
//   F: {
//     down: ["|", "J", "L"],
//     right: ["-", "7", "J"],
//   },
//   S: {
//     up: ["|", "F", "7"],
//     down: ["|", "J", "L"],
//     left: ["-", "F", "L"],
//     right: ["-", "7", "J"],
//   },
// }

// const areIndexsTheSame = (index1, index2) => {
//   return index1[0] === index2[0] && index1[1] === index2[1]
// }

// const isValidSymbol = (currentSymbol, nextSymbol, direction) => {
//   if (!instructionToValidSymbolsMap[direction]) {
//     return false // Invalid direction
//   }
//   return validSymbolsAndInstruction[currentSymbol][direction].has(nextSymbol)
// }
// // DIRECTION IS WHAT THE ONE BEFORE ME SENT WITH IT

// let lines = []

// const getFarthestPipeHelper = (currentIndex, direction, steps, visited = new Set()) => {
//   if (areIndexsTheSame(startIndex, currentIndex) && steps > 0) return steps
//   if (
//     visited.has(`${currentIndex[0]},${currentIndex[1]}`) ||
//     lines[currentIndex[0]][currentIndex[1]] === "."
//   )
//     return -1

//   const [currentRow, currentCol] = currentIndex
//   const canGoUp = currentRow - 1 > 0
//   const canGoDown = currentRow + 1 < lines.length
//   const canGoLeft = currentCol - 1 > 0
//   const canGoRight = currentCol + 1 < lines[currentRow].length

//   if (direction === "*") {
//     let possibleDirectionsAndIndexs = []
//     if (canGoUp && instructionToValidSymbolsMap.up.has(lines[currentRow - 1][currentCol]))
//       possibleDirectionsAndIndexs.push(["up", [currentRow - 1, currentCol]])
//     if (canGoDown && instructionToValidSymbolsMap.down.has(lines[currentRow + 1][currentCol]))
//       possibleDirectionsAndIndexs.push(["down", [currentRow + 1, currentCol]])
//     if (canGoLeft && instructionToValidSymbolsMap.left.has(lines[currentRow][currentCol - 1]))
//       possibleDirectionsAndIndexs.push(["left", [currentRow, currentCol - 1]])
//     if (canGoRight && instructionToValidSymbolsMap.right.has(lines[currentRow][currentCol + 1]))
//       possibleDirectionsAndIndexs.push(["right", [currentRow, currentCol + 1]])

//     for (let i = 0; i < possibleDirectionsAndIndexs.length; i++) {
//       const result = getFarthestPipeHelper(
//         possibleDirectionsAndIndexs[i][1],
//         possibleDirectionsAndIndexs[i][0],
//         steps + 1,
//       )
//       if (result !== -1) return result
//     }
//   } else {
//     visited.add(`${currentRow},${currentCol}`)
//     const currentSymbol = lines[currentRow][currentCol]

//     switch (currentSymbol) {
//       case "|":
//         if (direction === "up") {
//           if (
//             (canGoUp && isValidSymbol(currentSymbol, lines[currentRow + 1][currentCol]), direction)
//           ) {
//             return getFarthestPipeHelper([currentRow - 1, currentCol], "up", steps + 1, visited)
//           }
//         } else if (direction === "down") {
//           if (
//             (canGoDown && isValidSymbol(currentSymbol, lines[currentRow + 1][currentCol]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow + 1, currentCol], "down", steps + 1, visited)
//           }
//         }
//         break
//       case "-":
//         if (direction === "left") {
//           if (
//             (canGoLeft && isValidSymbol(currentSymbol, lines[currentRow][currentCol - 1]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow, currentCol - 1], "left", steps + 1, visited)
//           }
//         } else if (direction === "right") {
//           if (
//             (canGoRight && isValidSymbol(currentSymbol, lines[currentRow][currentCol + 1]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow, currentCol + 1], "right", steps + 1, visited)
//           }
//         }
//         break
//       case "L": // WE GOT HERE WITH DIRECTION LEFT OR DOWN
//         if (direction === "left") {
//           if (
//             (canGoUp && isValidSymbol(currentSymbol, lines[currentRow - 1][currentCol]), direction)
//           ) {
//             return getFarthestPipeHelper([currentRow - 1, currentCol], "up", steps + 1, visited)
//           }
//         } else if (direction === "down") {
//           if (
//             (canGoRight && isValidSymbol(currentSymbol, lines[currentRow][currentCol + 1]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow, currentCol + 1], "right", steps + 1, visited)
//           }
//         }
//         break
//       case "J": // WE GOT HERE WITH DIRECTION right (we will send up) OR down (we will send left)
//         if (direction === "right") {
//           if (
//             (canGoUp && isValidSymbol(currentSymbol, lines[currentRow - 1][currentCol]), direction)
//           ) {
//             return getFarthestPipeHelper([currentRow - 1, currentCol], "up", steps + 1, visited)
//           }
//         } else if (direction === "down") {
//           if (
//             (canGoLeft && isValidSymbol(currentSymbol, lines[currentRow][currentCol - 1]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow, currentCol - 1], "left", steps + 1, visited)
//           }
//         }
//         break
//       case "7": // WE GOT HERE WITH DIRECTION RIGHT OR UP
//         if (direction === "right") {
//           if (
//             (canGoDown && isValidSymbol(currentSymbol, lines[currentRow + 1][currentCol]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow + 1, currentCol], "down", steps + 1, visited)
//           }
//         } else if (direction === "up") {
//           if (
//             (canGoLeft && isValidSymbol(currentSymbol, lines[currentRow][currentCol - 1]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow, currentCol - 1], "left", steps + 1, visited)
//           }
//         }
//         break
//       case "F": // WE GOT HERE WITH DIRECTION LEFT (we will send down) OR UP (we will send right)
//         if (direction === "left") {
//           if (
//             (canGoDown && isValidSymbol(currentSymbol, lines[currentRow + 1][currentCol]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow + 1, currentCol], "down", steps + 1, visited)
//           }
//         } else if (direction === "up") {
//           if (
//             (canGoRight && isValidSymbol(currentSymbol, lines[currentRow][currentCol + 1]),
//             direction)
//           ) {
//             return getFarthestPipeHelper([currentRow, currentCol + 1], "right", steps + 1, visited)
//           }
//         }
//         break
//     }
//   }
// }

// const getFarthestPipe = (lines) => {
//   for (let i = 0; i < lines.length; i++) {
//     for (let j = 0; j < lines[i].length; j++) {
//       if (lines[i][j] === "S") {
//         startIndex = [i, j]
//       }
//     }
//   }
//   currentLines = lines
//   return getFarthestPipeHelper(startIndex, "*", 0) / 2
// }

// const getFarthestPipe = (lines) => {
//   let startIndex = [-1, -1]
//   for (let i = 0; i < lines.length; i++) {
//     for (let j = 0; j < lines[i].length; j++) {
//       if (lines[i][j] === "S") {
//         startIndex = [i, j]
//         break
//       }
//     }
//   }

//   console.log(startIndex)
//   return bfs(lines, startIndex[0], startIndex[1])
// }

// const bfs = (lines, startRow, startCol) => {
//   let queue = []
//   let visited = new Set()
//   let steps = 0
//   let currentRow = startRow
//   let currentCol = startCol
//   let currentSymbol = lines[currentRow][currentCol]
//   let canGoUp = currentRow - 1 > 0
//   let canGoDown = currentRow + 1 < lines.length
//   let canGoLeft = currentCol - 1 > 0
//   let canGoRight = currentCol + 1 < lines[currentRow].length

//   queue.push([currentRow, currentCol, steps])
//   visited.add(`${currentRow},${currentCol}`)

//   while (queue.length) {
//     let [currentRow, currentCol, steps] = queue.shift()
//     currentSymbol = lines[currentRow][currentCol]
//     canGoUp = currentRow - 1 > 0
//     canGoDown = currentRow + 1 < lines.length
//     canGoLeft = currentCol - 1 > 0
//     canGoRight = currentCol + 1 < lines[currentRow].length

//     if (currentSymbol === "S") {
//       if (canGoUp && lines[currentRow - 1][currentCol] !== ".") {
//         queue.push([currentRow - 1, currentCol, steps + 1])
//       }
//       if (canGoDown && lines[currentRow + 1][currentCol] !== ".") {
//         queue.push([currentRow + 1, currentCol, steps + 1])
//       }
//       if (canGoLeft && lines[currentRow][currentCol - 1] !== ".") {
//         queue.push([currentRow, currentCol - 1, steps + 1])
//       }
//       if (canGoRight && lines[currentRow][currentCol + 1] !== ".") {
//         queue.push([currentRow, currentCol + 1, steps + 1])
//       }
//     } else if (currentSymbol === "|") {
//       if (
//         canGoUp &&
//         lines[currentRow - 1][currentCol] !== "." &&
//         !visited.has(`${currentRow - 1},${currentCol}`)
//       ) {
//         queue.push([currentRow - 1, currentCol, steps + 1])
//         visited.add(`${currentRow - 1},${currentCol}`)
//       }
//       if (
//         canGoDown &&
//         lines[currentRow + 1][currentCol] !== "." &&
//         !visited.has(`${currentRow + 1},${currentCol}`)
//       ) {
//         queue.push([currentRow + 1, currentCol, steps + 1])
//         visited.add(`${currentRow + 1},${currentCol}`)
//       }
//     } else if (currentSymbol === "-") {
//       if (
//         canGoLeft &&
//         lines[currentRow][currentCol - 1] !== "." &&
//         !visited.has(`${currentRow},${currentCol - 1}`)
//       ) {
//         queue.push([currentRow, currentCol - 1, steps + 1])
//         visited.add(`${currentRow},${currentCol - 1}`)
//       }
//       if (
//         canGoRight &&
//         lines[currentRow][currentCol + 1] !== "." &&
//         !visited.has(`${currentRow},${currentCol + 1}`)
//       ) {
//         queue.push([currentRow, currentCol + 1, steps + 1])
//         visited.add(`${currentRow},${currentCol + 1}`)
//       }
//     } else if (currentSymbol === "L") {
//       if (
//         canGoUp &&
//         lines[currentRow - 1][currentCol] !== "." &&
//         !visited.has(`${currentRow - 1},${currentCol}`)
//       ) {
//         queue.push([currentRow - 1, currentCol, steps + 1])
//         visited.add(`${currentRow - 1},${currentCol}`)
//       }
//       if (
//         canGoRight &&
//         lines[currentRow][currentCol + 1] !== "." &&
//         !visited.has(`${currentRow},${currentCol + 1}`)
//       ) {
//         queue.push([currentRow, currentCol + 1, steps + 1])
//         visited.add(`${currentRow},${currentCol + 1}`)
//       }
//     } else if (currentSymbol === "J") {
//       if (
//         canGoUp &&
//         lines[currentRow - 1][currentCol] !== "." &&
//         !visited.has(`${currentRow - 1},${currentCol}`)
//       ) {
//         queue.push([currentRow - 1, currentCol, steps + 1])
//         visited.add(`${currentRow - 1},${currentCol}`)
//       }
//       if (
//         canGoLeft &&
//         lines[currentRow][currentCol - 1] !== "." &&
//         !visited.has(`${currentRow},${currentCol - 1}`)
//       ) {
//         queue.push([currentRow, currentCol - 1, steps + 1])
//         visited.add(`${currentRow},${currentCol - 1}`)
//       }
//     } else if (currentSymbol === "7") {
//       if (
//         canGoLeft &&
//         lines[currentRow][currentCol - 1] !== "." &&
//         !visited.has(`${currentRow},${currentCol - 1}`)
//       ) {
//         queue.push([currentRow, currentCol - 1, steps + 1])
//         visited.add(`${currentRow},${currentCol - 1}`)
//       }
//       if (
//         canGoDown &&
//         lines[currentRow + 1][currentCol] !== "." &&
//         !visited.has(`${currentRow + 1},${currentCol}`)
//       ) {
//         queue.push([currentRow + 1, currentCol, steps + 1])
//         visited.add(`${currentRow + 1},${currentCol}`)
//       }
//     } else if (currentSymbol === "F") {
//       if (
//         canGoDown &&
//         lines[currentRow + 1][currentCol] !== "." &&
//         !visited.has(`${currentRow + 1},${currentCol}`)
//       ) {
//         queue.push([currentRow + 1, currentCol, steps + 1])
//         visited.add(`${currentRow + 1},${currentCol}`)
//       }
//       if (
//         canGoRight &&
//         lines[currentRow][currentCol + 1] !== "." &&
//         !visited.has(`${currentRow},${currentCol + 1}`)
//       ) {
//         queue.push([currentRow, currentCol + 1, steps + 1])
//         visited.add(`${currentRow},${currentCol + 1}`)
//       }
//     }
//   }
//   return steps / 2
// }

const getNextPositions = (lines, row, col) => {
  const symbol = lines[row][col]
  const positions = []

  if (symbol === "|" || symbol === "S") {
    if (row > 0 && "|JL7FS".includes(lines[row - 1][col])) positions.push([row - 1, col])
    if (row < lines.length - 1 && "|F7JLS".includes(lines[row + 1][col]))
      positions.push([row + 1, col])
  }
  if (symbol === "-" || symbol === "S") {
    if (col > 0 && "-F7LJS".includes(lines[row][col - 1])) positions.push([row, col - 1])
    if (col < lines[row].length - 1 && "-JL7FS".includes(lines[row][col + 1]))
      positions.push([row, col + 1])
  }
  if (symbol === "L") {
    if (row > 0 && "|JL7FS".includes(lines[row - 1][col])) positions.push([row - 1, col])
    if (col < lines[row].length - 1 && "-JL7FS".includes(lines[row][col + 1]))
      positions.push([row, col + 1])
  }
  if (symbol === "J") {
    if (row > 0 && "|JL7FS".includes(lines[row - 1][col])) positions.push([row - 1, col])
    if (col > 0 && "-F7LJS".includes(lines[row][col - 1])) positions.push([row, col - 1])
  }
  if (symbol === "7") {
    if (col > 0 && "-F7LJS".includes(lines[row][col - 1])) positions.push([row, col - 1])
    if (row < lines.length - 1 && "|F7JLS".includes(lines[row + 1][col]))
      positions.push([row + 1, col])
  }
  if (symbol === "F") {
    if (col < lines[row].length - 1 && "-JL7FS".includes(lines[row][col + 1]))
      positions.push([row, col + 1])
    if (row < lines.length - 1 && "|F7JLS".includes(lines[row + 1][col]))
      positions.push([row + 1, col])
  }

  return positions
}

const bfs = (lines, startRow, startCol) => {
  let queue = [[startRow, startCol, 0]]
  let visited = new Set(`${startRow},${startCol}`)

  while (queue.length) {
    let [currentRow, currentCol, steps] = queue.shift()

    if (lines[currentRow][currentCol] === "S" && steps > 0) {
      return steps
    }

    const nextPositions = getNextPositions(lines, currentRow, currentCol)
    for (const [nextRow, nextCol] of nextPositions) {
      const key = `${nextRow},${nextCol}`
      if (!visited.has(key)) {
        queue.push([nextRow, nextCol, steps + 1])
        visited.add(key)
      }
    }
  }

  return -1
}

const getFarthestPipe = (lines) => {
  let startIndex = [-1, -1]
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "S") {
        startIndex = [i, j]
        break
      }
    }
  }

  return bfs(lines, startIndex[0], startIndex[1])
}

console.log("day 10 challenge 1: ", getFarthestPipe(lines))

module.exports = { getFarthestPipe }
