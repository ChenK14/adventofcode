const getLinesFromPath = require('../index')

const getResultAndOperatorsFromInput = (input) => {
  return input.reduce((acc, line) => {
    const inputSeparated = line.split(':')
    const result = parseInt(inputSeparated[0])
    const operators = inputSeparated[1].split(' ').reduce((operatorsAcc, operator) => {
      if (`${operator}`.length > 0) {
        operatorsAcc.push(parseInt(operator))
      }
      return operatorsAcc
    }, [])
    acc.push({ result, operators })
    return acc
  }, [])
}

function evaluateLeftToRight(expression) {
  const tokens = expression.match(/\d+|\+|\*|\|\|/g)

  let total = parseInt(tokens[0], 10)

  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i]
    const nextNumber = parseInt(tokens[i + 1], 10)

    if (op === '+') {
      total = total + nextNumber
    } else if (op === '*') {
      total = total * nextNumber
    } else if (op === '||') {
      total = parseInt(`${total}${nextNumber}`)
    }
  }

  return total
}

const isRelevant = (operators, result, twist) => {
  const sum = operators.reduce((acc, current) => {
    acc += current
    return acc
  }, 0)
  const mulSum = operators.reduce((acc, current) => {
    acc *= current
    return acc
  }, 1)

  if (mulSum === result || sum === result) {
    return true
  }
  const plusMulArray = Array(operators.length - 1).fill('+')
  while (true) {
    const expression = operators.reduce((acc, operator, index) => {
      acc += operator + (index < plusMulArray.length ? plusMulArray[index] : '')
      return acc
    }, '')

    const evaluated = evaluateLeftToRight(expression)
    if (evaluated === result) {
      return true
    }
    const rasingResult = raiseTheBar(plusMulArray, twist)
    if (rasingResult === 1) {
      return false
    }
  }
}

const findRelevantResults = (resultsAndOperators, twist) => {
  return resultsAndOperators.reduce((resultAndOperatorsAcc, resultAndOperators) => {
    const result = resultAndOperators.result
    const operators = resultAndOperators.operators

    const found = isRelevant(operators, result, twist)
    if (found) {
      resultAndOperatorsAcc.push(resultAndOperators)
    }

    return resultAndOperatorsAcc
  }, [])
}

const raiseTheBar = (array, twist) => {
  if (twist) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === '+') {
        array[i] = '*'
        return 0
      } else if (array[i] === '*') {
        array[i] = '||'
        return 0
      } else if (array[i] === '||') {
        // Reset this to '+' and move to the next operator to the left
        array[i] = '+'
      }
    }
  } else {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === '+') {
        array[i] = '*'
        return 0
      } else {
        array[i] = '+'
      }
    }
  }

  return 1
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day7/input.txt')
  }

  const resultsAndOperators = getResultAndOperatorsFromInput(lines) // [result:[operators]]

  const relevantResults = findRelevantResults(resultsAndOperators, false)

  return relevantResults.reduce((acc, current) => {
    acc += current.result
    return acc
  }, 0)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day7/input.txt')
  }

  const resultsAndOperators = getResultAndOperatorsFromInput(lines) // [result:[operators]]
  const relevantResults = findRelevantResults(resultsAndOperators, true)
  console.log({ resultsAndOperators, relevantResults })

  return relevantResults.reduce((acc, current) => {
    acc += current.result
    return acc
  }, 0)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
