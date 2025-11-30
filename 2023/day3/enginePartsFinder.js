const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day3/input.txt")

const isSymbol = (char, specialSymbol = undefined) => {
  return (
    !((char >= "0" && char <= "9") || char === ".") &&
    (specialSymbol ? char === specialSymbol : true)
  )
}

const checkSymbolsInLine = (line, start, end, specialSymbol = undefined) => {
  if (!line) return false
  for (let i = start; i <= end; i++) {
    if (line && i > -1 && i < line.length && isSymbol(line[i], specialSymbol)) {
      return true
    }
  }
  return false
}
const getSymbolsInLine = (line, lineIndex, start, end, specialSymbol = undefined) => {
  if (!line) return false
  let symbolsCoordinates = []
  for (let i = start; i <= end; i++) {
    if (line && i > -1 && i < line.length && isSymbol(line[i], specialSymbol)) {
      symbolsCoordinates.push({ x: i, y: lineIndex })
    }
  }
  return symbolsCoordinates
}

const getSymbolsIndex = (lines, lineIndex, startIndex, endIndex, specialSymbol = undefined) => {
  let symbolsCoordinates = [{ x: -1, y: -1 }]
  if (lineIndex === 0) {
    symbolsCoordinates.push(
      ...getSymbolsInLine(
        lines[lineIndex + 1],
        lineIndex + 1,
        startIndex - 1,
        endIndex,
        specialSymbol,
      ),
    )
  } else if (lineIndex === lines.length - 1) {
    symbolsCoordinates.push(
      ...getSymbolsInLine(
        lines[lineIndex - 1],
        lineIndex - 1,
        startIndex - 1,
        endIndex,
        specialSymbol,
      ),
    )
  } else {
    const lineAbove = lines[lineIndex - 1]
    const lineBelow = lines[lineIndex + 1]

    symbolsCoordinates.push(
      ...getSymbolsInLine(lineAbove, lineIndex - 1, startIndex - 1, endIndex, specialSymbol),
    )
    symbolsCoordinates.push(
      ...getSymbolsInLine(lineBelow, lineIndex + 1, startIndex - 1, endIndex, specialSymbol),
    )
  }
  symbolsCoordinates.push(
    ...getSymbolsInLine(lines[lineIndex], lineIndex, startIndex - 1, endIndex, specialSymbol),
  )
  return symbolsCoordinates
}

const isPart = (lines, lineIndex, startIndex, endIndex, specialSymbol = undefined) => {
  let lineCondition = false
  if (lineIndex === 0) {
    lineCondition = checkSymbolsInLine(
      lines[lineIndex + 1],
      startIndex - 1,
      endIndex,
      specialSymbol,
    )
  } else if (lineIndex === lines.length - 1) {
    lineCondition = checkSymbolsInLine(
      lines[lineIndex - 1],
      startIndex - 1,
      endIndex,
      specialSymbol,
    )
  } else {
    const lineAbove = lines[lineIndex - 1]
    const lineBelow = lines[lineIndex + 1]

    lineCondition =
      checkSymbolsInLine(lineAbove, startIndex - 1, endIndex, specialSymbol) ||
      checkSymbolsInLine(lineBelow, startIndex - 1, endIndex, specialSymbol)
  }
  return (
    lineCondition || checkSymbolsInLine(lines[lineIndex], startIndex - 1, endIndex, specialSymbol)
  )
}

const findIndexsOfNumberInLine = (array) => {
  let indexs = []
  let started = false
  let startIndex = -1
  let endIndex = -1
  for (let i = 0; i < array.length; i++) {
    const char = array[i]
    if (char >= "0" && char <= "9") {
      if (!started) {
        startIndex = i
        started = true
      }
    } else {
      if (started) {
        endIndex = i
        indexs.push({ startIndex, endIndex })
        started = false
      }
    }
  }
  if (started) {
    endIndex = array.length
    indexs.push({ startIndex, endIndex })
    started = false
  }
  return indexs
}

const getSumOfPartsFromLines = (lines) => {
  let sumOfParts = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const indexs = findIndexsOfNumberInLine(line)
    for (let j = 0; j < indexs.length; j++) {
      const startIndex = indexs[j].startIndex
      const endIndex = indexs[j].endIndex
      if (isPart(lines, i, startIndex, endIndex)) {
        sumOfParts += parseInt(line.substring(startIndex, endIndex))
      }
    }
  }
  return sumOfParts
}

const getGearsRatioFromLines = (lines) => {
  const numbers = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const indexs = findIndexsOfNumberInLine(line)
    for (let j = 0; j < indexs.length; j++) {
      const startIndex = indexs[j].startIndex
      const endIndex = indexs[j].endIndex
      if (isPart(lines, i, startIndex, endIndex, "*")) {
        const indexs = getSymbolsIndex(lines, i, startIndex, endIndex, "*").filter(
          (index) => index.x !== -1,
        )
        const number = parseInt(line.substring(startIndex, endIndex))
        numbers.push({
          number,
          symbols: indexs,
        })
      }
    }
  }

  const gears = []
  const gearsIndexs = []
  let gearsWithoutNumbers = []
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    for (let j = 0; j < number.symbols.length; j++) {
      const symbol = number.symbols[j]
      if (!gearsWithoutNumbers.includes(`${symbol.x},${symbol.y}`)) {
        gearsWithoutNumbers.push(`${symbol.x},${symbol.y}`)
      }
    }
  }

  for (let i = 0; i < gearsWithoutNumbers.length; i++) {
    const gear = gearsWithoutNumbers[i]
    for (let j = 0; j < numbers.length; j++) {
      for (let k = 0; k < numbers[j].symbols.length; k++) {
        const symbol = numbers[j].symbols[k]
        if (gear === `${symbol.x},${symbol.y}`) {
          if (!gears[gear]) {
            gears[gear] = [numbers[j].number]
            gearsIndexs.push(gear)
          } else {
            gears[gear].push(numbers[j].number)
          }
        }
      }
    }
  }

  let sum = 0
  for (let i = 0; i < gearsIndexs.length; i++) {
    const gearIndex = gearsIndexs[i]
    const gear = gears[gearIndex]
    if (gear.length === 2) {
      sum += gear[0] * gear[1]
    }
  }

  return sum
}

// console.log("day 3 challenge 1: ", getSumOfPartsFromLines(lines));
// console.log("day 3 challenge 2: ", getGearsRatioFromLines(lines));

module.exports = { getSumOfPartsFromLines, getGearsRatioFromLines }
