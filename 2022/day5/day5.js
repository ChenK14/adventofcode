const getLinesFromPath = require('../index')

const getStackAndInstructions = (lines) => {
  let stacksAndCreates = []
  let instructions = []

  let instructionsFlag = false
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].replaceAll(' ', '').length === 0) {
      instructionsFlag = true
      continue
    }
    instructionsFlag ? instructions.push(lines[i]) : stacksAndCreates.push(lines[i])
  }

  instructions = instructions.reduce((acc, instruction) => {
    const instructionCleanString = instruction
      .replace(/[a-zA-Z ]/g, '')
      .split('')
      .map((val) => parseInt(val))
    acc.push({ amount: instructionCleanString[0], from: instructionCleanString[1], to: instructionCleanString[2] })
    return acc
  }, [])

  return { stacksAndCreates, instructions }
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day5/input.txt')
  }
  // first split instructions and stack
  const { stacksAndCreates, instructions } = getStackAndInstructions(lines)
  // unshift pushes to top of array, pop removes it

  const stacksIndexes = stacksAndCreates[stacksAndCreates.length - 1].split('').reduce((acc, column, index) => {
    if (column.replace(' ', '').length !== 0) {
      acc.push(index)
    }
    return acc
  }, [])

  const stacks = stacksIndexes.reduce((acc, stackIndex) => {
    acc.push(
      stacksAndCreates.reduce((stackAcc, row) => {
        if (row[stackIndex].match(/^[A-Z]+$/g)) {
          stackAcc.unshift(row[stackIndex])
        }
        return stackAcc
      }, []),
    )
    return acc
  }, [])

  console.log({ stacks })

  for (let i = 0; i < instructions.length; i++) {
    const fromStackIndex = instructions[i].from - 1
    const toStackIndex = instructions[i].to - 1
    const amount = instructions[i].amount
    for (let j = 0; j < amount && stacks[fromStackIndex] && stacks[fromStackIndex].length > 0; j++) {
      stacks[toStackIndex].push(stacks[fromStackIndex].pop())
    }
  }
  console.log({ stacks })

  return stacks.reduce((acc, stack) => {
    acc += stack.length > 0 ? stack[stack.length - 1] : ''
    return acc
  }, [])
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day5/input.txt')
  }
}

module.exports = { solvePuzzle1, solvePuzzle2 }
