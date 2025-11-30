const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day1/input.txt")

const isValidNumber = (val) => {
  const tempVal = parseInt(val)
  return val.length <= 3 && `${tempVal}` === `${val}`
}

const getMulSumFromMemory = (memory) => {
  const stringsStatingWithMulExpression = memory.split("mul(")
  stringsStatingWithMulExpression.shift() // first value doesn't contain 'mul('

  let mulSum = 0

  for (let i = 0; i < stringsStatingWithMulExpression.length; i++) {
    if (!stringsStatingWithMulExpression[i].includes(")")) {
      continue
    }

    const mulTuple = stringsStatingWithMulExpression[i].split(")") // we only care about the values in the first parenthesis next to the mul expression
    mulTuple.pop() // removing anything outside the first parenthesis

    const potentialNumbers = mulTuple[0].split(",")

    if (potentialNumbers.length !== 2 || !isValidNumber(potentialNumbers[0]) || !isValidNumber(potentialNumbers[1])) {
      continue
    }

    const mulRes = parseInt(potentialNumbers[0]) * parseInt(potentialNumbers[1])

    mulSum += mulRes
  }

  return mulSum
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day3/input.txt")
  }
  if (lines.length > 1) {
    let tempLines = [""]
    for (let i = 0; i < lines.length; i++) {
      tempLines[0] += lines[i]
    }
    lines = tempLines
  }
  // above is just getting all the input in one line

  const memory = lines[0].replaceAll(" ", "*") // handling spaces

  return getMulSumFromMemory(memory)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day3/input.txt")
  }
  if (lines.length > 1) {
    let tempLines = [""]
    for (let i = 0; i < lines.length; i++) {
      tempLines[0] += lines[i]
    }
    lines = tempLines
  }

  const memory = lines[0].replaceAll(" ", "*") // handling spaces

  const memoryDividedToDoAndDont = memory.split("do")
  let memoryToSend = memoryDividedToDoAndDont[0]

  let sendingFlag = true
  for (let i = 1; i < memoryDividedToDoAndDont.length; i++) {
    if (memoryDividedToDoAndDont[i].startsWith("n't()")) {
      sendingFlag = false
    }
    if (memoryDividedToDoAndDont[i].startsWith("()")) {
      sendingFlag = true
    }

    if (sendingFlag) {
      memoryToSend += memoryDividedToDoAndDont[i]
    }
  }

  return getMulSumFromMemory(memoryToSend)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
