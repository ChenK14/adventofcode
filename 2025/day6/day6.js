const getLinesFromPath = require("../index")

const operation = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
}

const getRelevant = (input) => input.split(' ').filter(val => val !== '')


const getResultOfEachLine = (input) => {

  const operands = getRelevant(input.at(-1))
  const results = getRelevant(input[0]).map(Number)

  for (let i = 1; i < input.length - 1; i++) {
    const line = getRelevant(input[i]).map(Number)
    for (let j = 0; j < operands.length; j++) {
      results[j] = operation[operands[j]](results[j], line[j])
    }
  }
  return results.reduce((acc, curr) => acc + curr, 0)
}


const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day6/input.txt")
  }

  return getResultOfEachLine(lines)

}

const getResultOfEachGroup = (input) => {
  const operands = getRelevant(input.at(-1))
  const results = []
  let indexFlag = 0
  const lineLength = input[0].length
  const numOfLines = input.length - 1 // line of operands at the end.
  for (let i = 0; i < lineLength; i++) {
    let numberString = ''
    let seenOnlySpace = true
    for (let j = 0; j < numOfLines; j++) {
      const char = input[j][i]
      if (char !== ' ') {
        numberString += input[j][i]
        seenOnlySpace = false
      }
    }
    if (seenOnlySpace) {
      indexFlag++
    }
    else {
      if (results[indexFlag]) {
        results[indexFlag] = operation[operands[indexFlag]](results[indexFlag], Number(numberString))
      }
      else {
        results[indexFlag] = Number(numberString)
      }
    }
  }

  return results.reduce((acc, curr) => acc + curr, 0)
}


const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day6/input.txt")
  }
  return getResultOfEachGroup(lines)
}


module.exports = { solvePuzzle1, solvePuzzle2 }
