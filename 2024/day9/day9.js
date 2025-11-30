const getLinesFromPath = require('../index')

const parseInput = (input) => {
  const inputAsArray = input.split('')
  const parsedInput = []

  for (let i = 0; i < inputAsArray.length; i++) {
    const numberOfInstances = parseInt(inputAsArray[i])
    for (let j = 0; j < numberOfInstances; j++) {
      parsedInput.push(i % 2 === 0 ? i / 2 : '.')
    }
  }

  return parsedInput
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day9/input.txt')
  }

  // input is a long string, each even index represent number of block spaces with the index as id, each odd index represent number of free spaces

  const parsedInput = parseInput(lines[0])

  const freeSpaceIndexQueue = [] // remove with unshift()
  const blocksIndexStack = [] // remove with pop()

  for (let i = 0; i < parsedInput.length; i++) {
    const currVal = parsedInput[i]

    if (isNaN(parseInt(currVal))) {
      freeSpaceIndexQueue.push({ index: i, value: currVal })
    } else {
      blocksIndexStack.push({ index: i, value: currVal })
    }
  }

  // we need to switch between the free space index and blocks indexs, need to think about how.
  // console.log('BEFORE: ', { parsedInput, freeSpaceIndexQueue, blocksIndexStack })

  let isGood = false
  while (!isGood) {
    // switch
    const { index: blockIndex, value: blockValue } = blocksIndexStack.pop()
    const { index: freeIndex, value: freeSpaceValue } = freeSpaceIndexQueue.shift()

    parsedInput[freeIndex] = blockValue
    parsedInput[blockIndex] = freeSpaceValue
    isGood = true
    let foundDot = false
    for (let i = 0; i < parsedInput.length; i++) {
      if (parsedInput[i] === '.') {
        foundDot = true
      } else if (foundDot) {
        isGood = false
      }
    }
  }

  return parsedInput.reduce((acc, current, index) => {
    if (current !== '.') {
      acc += current * index
    }
    return acc
  }, 0)
}

// const getStackAndQueue = (parsedInput) => {
//   let freeSpaceIndexQueue = [] // remove with unshift()
//   let blocksIndexStack = [] // remove with pop()

//   let foundNumberFlag = false

//   for (let i = 0; i < parsedInput.length; i++) {
//     const currVal = parsedInput[i]

//     if (isNaN(parseInt(currVal))) {
//       if (foundNumberFlag) {
//         freeSpaceIndexQueue.push({ index: i, value: currVal, instances: 1 })
//         foundNumberFlag = false
//       } else {
//         const current = freeSpaceIndexQueue.pop()
//         current.instances++
//         freeSpaceIndexQueue.push(current)
//       }
//     } else {
//       foundNumberFlag = true
//       const potentialIndex = blocksIndexStack.findIndex((item) => item.value === currVal)
//       if (potentialIndex !== -1) {
//         blocksIndexStack[potentialIndex].instances++
//       } else {
//         blocksIndexStack.push({ index: i, value: currVal, instances: 1 })
//       }
//     }
//   }

//   return { freeSpaceIndexQueue, blocksIndexStack }
// }

// const solvePuzzle2 = (lines, testing) => {
//   if (!testing) {
//     lines = getLinesFromPath('day9/input.txt')
//   }

//   const parsedInput = parseInput(lines[0])
//   let { freeSpaceIndexQueue, blocksIndexStack } = getStackAndQueue(parsedInput)
//   console.log({ parsedInput: parsedInput.join(''), blocksIndexStack, freeSpaceIndexQueue })

//   let found = false
//   let failedAttempts = 0
//   while (failedAttempts < blocksIndexStack.length) {
//     const { index: blockIndex, value: blockValue, instances: blocksInstances } = blocksIndexStack.pop()
//     const { index: freeIndex, value: freeSpaceValue, instances: freeInstances } = freeSpaceIndexQueue.shift()

//     const buffer = freeInstances - blocksInstances
//     if (buffer >= 0) {
//       failedAttempts = 0
//       // switch
//       for (let i = 0; i < blocksInstances; i++) {
//         parsedInput[freeIndex + i] = blockValue
//         parsedInput[blockIndex + i] = freeSpaceValue
//       }

//       const { freeSpaceIndexQueue: newQueue, blocksIndexStack: newStack } = getStackAndQueue(parsedInput)
//       freeSpaceIndexQueue = newQueue
//       blocksIndexStack = newStack
//       console.log({ parsedInput: parsedInput.join(''), blocksIndexStack, freeSpaceIndexQueue })
//     } else {
//       freeSpaceIndexQueue.push({ index: freeIndex, value: freeSpaceValue, instances: freeInstances })
//       failedAttempts++
//     }
//   }

//   return parsedInput.reduce((acc, current, index) => {
//     if (current !== '.') {
//       acc += current * index
//     }
//     return acc
//   }, 0)

//   // we need to keep the number of blocks like this : {instances: 2 , startIndex: 15, value: 9}   V
//   // and free spaces should be the same: {instances: 3 , startIndex: 2, value: '.'}    V

//   // and then the same algorythem but with a twist- if blocks instances <= free instances do the switch
//   // then unshift into free blocksInstance- freeInstance
// }

// Your given parseInput function (unmodified)

const getFreeSegments = (filesystem) => {
  const freeSegments = []
  let start = -1
  for (let i = 0; i < filesystem.length; i++) {
    if (filesystem[i] === '.') {
      if (start === -1) start = i
    } else {
      if (start !== -1) {
        freeSegments.push({ start, length: i - start })
        start = -1
      }
    }
  }
  if (start !== -1) {
    freeSegments.push({ start, length: filesystem.length - start })
  }
  return freeSegments
}

const getFiles = (filesystem) => {
  const files = []
  let start = 0
  let currentChar = filesystem[0]

  for (let i = 1; i <= filesystem.length; i++) {
    if (i === filesystem.length || filesystem[i] !== currentChar) {
      if (currentChar !== '.' && currentChar !== undefined) {
        const fileId = parseInt(currentChar, 10)
        files.push({ id: fileId, start, length: i - start })
      }
      if (i < filesystem.length) {
        start = i
        currentChar = filesystem[i]
      }
    }
  }
  return files
}

const moveFileIfPossible = (filesystem, file) => {
  const freeSegments = getFreeSegments(filesystem)

  // Find a free segment to the left of file.start that can fit file.length
  const suitableSegment = freeSegments.filter((seg) => seg.start < file.start && seg.length >= file.length).sort((a, b) => a.start - b.start)[0]

  if (!suitableSegment) {
    // No suitable segment found, do not move
    return
  }

  // Move the file
  for (let i = 0; i < file.length; i++) {
    filesystem[suitableSegment.start + i] = file.id.toString()
  }
  // Old location becomes free space
  for (let i = 0; i < file.length; i++) {
    filesystem[file.start + i] = '.'
  }
}

const computeChecksum = (filesystem) => {
  return filesystem.reduce((acc, curr, idx) => {
    if (curr !== '.') {
      acc += parseInt(curr, 10) * idx
    }
    return acc
  }, 0)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    // Load lines from file if needed
    lines = getLinesFromPath('day9/input.txt');
  }

  const parsedInput = parseInput(lines[0])

  // Identify initial set of files and their IDs
  const initialFiles = getFiles(parsedInput)
  const uniqueFileIds = [...new Set(initialFiles.map((f) => f.id))].sort((a, b) => b - a)

  // Move each file once in descending file ID order
  for (const fileId of uniqueFileIds) {
    const currentFiles = getFiles(parsedInput)
    const fileToMove = currentFiles.find((f) => f.id === fileId)
    if (fileToMove) {
      moveFileIfPossible(parsedInput, fileToMove)
    }
  }



  
  // Compute final checksum
  return computeChecksum(parsedInput)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
