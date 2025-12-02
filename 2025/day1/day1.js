const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day1/input.txt")




const getNumArrFromLines = (input) => {
  return input.reduce((acc, curr) => {
    const num = Number(`${curr}`.replace('L', '-').replace('R', '+'))
    acc.push(num)
    return acc
  }, [])
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day1/input.txt")
  }
  const numArr = getNumArrFromLines(lines)
  // read input, convert R to + and L to -.
  // then add numbers using % 100, count each time you reach zero

  let dialNum = 50
  let ret = 0
  for (let i = 0; i < numArr.length; i++) {
    dialNum = (dialNum + numArr[i]) % 100
    if (dialNum === 0) {
      ret++
    }
  }

  return ret
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day1/input.txt")
  }
  const numArr = getNumArrFromLines(lines)

  let dialNum = 50
  let ret = 0
  let positive = true
  let lastWasZero = false
  for (let i = 0; i < numArr.length; i++) {
    const moves = dialNum + numArr[i]
    const prev = dialNum
    dialNum = (moves) % 100

    if (!lastWasZero) { // meaning we need to check polarity
      if ((positive && (numArr[i] < 0 && Math.abs(numArr[i]) > prev)) || (!positive && (numArr[i] > 0 && Math.abs(prev) < numArr[i]))) {
        ret++
        positive = !positive
      }
    } else {
      positive = dialNum > 0
    }

    lastWasZero = false
    const loops = Math.abs(Math.trunc(moves / 100))
    ret += loops
    if (dialNum === 0) {
      lastWasZero = true
      loops === 0 ? ret++ : ''
    }
  }

  return ret
}

module.exports = { solvePuzzle1, solvePuzzle2 }
