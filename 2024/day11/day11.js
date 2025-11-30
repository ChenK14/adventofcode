const getLinesFromPath = require('../index')

// get all the stones in the initial lines
// for each stone- if the stone has 0 it turns to 1
// if stone.length %2 => the stone will split to two stones with stone.length/2 number of digits in each stone
// else- stone's value = stone *2024

//count how many stones are there after 25 times
const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day11/input.txt')
  }

  let stones = getStonesFromInput(lines)
  let totalStones = 0
  for (let stone of stones) {
    // Count stones after 75 transformations
    totalStones += blink(stone, 25)
  }
  // console.log(stones)
  return stones.length
}

const blink = (stones) => {
  const finalStones = []
  for (let i = 0; i < stones.length; i++) {
    const currentStone = stones[i]
    if (currentStone === 0) {
      finalStones.push('1')
    } else if (`${currentStone}`.length % 2 === 0) {
      const currentString = `${currentStone}`
      const stone1 = currentString.slice(0, currentString.length / 2)
      const stone2 = currentString.slice(currentString.length / 2, currentString.length)
      finalStones.push(+stone1, +stone2)
    } else {
      // Use BigInt to handle potentially very large numbers
      const largeStone = BigInt(currentStone) * 2024n
      finalStones.push(largeStone)
    }
  }
  return finalStones
}

// const solvePuzzle2 = (lines, testing) => {
//   if (!testing) {
//     lines = getLinesFromPath('day11/input.txt')
//   }
//   let stones = lines[0].split(' ').map(Number)

//   let stonesSum = stones.reduce((acc, stone) => {
//     let tempStones = [stone]
//     for (let i = 0; i < 75; i++) {
//       tempStones = blink(tempStones)
//     }
//     acc += tempStones.length
//     return acc
//   },0)

//   return stonesSum

// }

// Store the transformation results for each number
const transformationCache = new Map()

const getTransformationResult = (number) => {
  if (transformationCache.has(number)) {
    return transformationCache.get(number)
  }

  let result
  if (number === 0) {
    result = [1]
  } else if (`${number}`.length % 2 === 0) {
    const numStr = `${number}`
    const mid = numStr.length / 2
    result = [+numStr.slice(0, mid), +numStr.slice(mid)]
  } else {
    result = [Number(BigInt(number) * 2024n)]
  }

  transformationCache.set(number, result)
  return result
}

const calculateStonesAfterBlinks = (stone, steps) => {
  const memo = new Map()

  const getCountAtStep = (num, step) => {
    const key = `${num},${step}`
    if (memo.has(key)) {
      return memo.get(key)
    }

    if (step === 0) {
      return 1
    }

    const transformed = getTransformationResult(num)
    let count = 0
    for (const newNum of transformed) {
      count += getCountAtStep(newNum, step - 1)
    }

    memo.set(key, count)
    return count
  }

  return getCountAtStep(stone, steps)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day11/input.txt')
  }
  const stones = lines[0].split(' ').map(Number)

  return stones.reduce((sum, stone) => {
    return sum + calculateStonesAfterBlinks(stone, 75)
  }, 0)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
