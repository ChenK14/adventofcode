const getLinesFromPath = require("../index")
const lines = getLinesFromPath("day2/input.txt")



const getRangesFromLines = (input) => {
  return input[0].split(',').reduce((acc, curr) => {
    const startEnd = curr.split('-')
    const start = Number(startEnd[0])
    const end = Number(startEnd[1])
    acc.push({ start, end })
    return acc
  }, [])
}

const getInvalidNumberFromRanges = (ranges) => {
  const invalids = []
  for (let i = 0; i < ranges.length; i++) {
    const { start, end } = ranges[i]
    for (j = start; j < end + 1; j++) {
      if (`${j}`.length % 2 === 0) {

        const length = `${j}`.length
        if (`${j}`.slice(0, length / 2) === `${j}`.slice(length / 2, length)) {

          invalids.push(j)
        }
      }
    }
  }
  return invalids
}


const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day2/input.txt")
  }

  const ranges = getRangesFromLines(lines)
  const allInvalids = getInvalidNumberFromRanges(ranges)

  return allInvalids.reduce((acc, curr) => {
    acc += curr
    return acc
  }, 0)
}


const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day2/input.txt")
  }


  // we need to check if any number is repeated at least twice.
  // start by going by the first digit up to half the length, if all the string is the same as first digit it's invalid, else, test two digits

  const ranges = getRangesFromLines(lines)
  return getInvalidNumberFromRanges2(ranges).reduce((acc, curr) => {
    acc += curr
    return acc
  }, 0)

}



const getInvalidNumberFromRanges2 = (ranges) => {
  const invalids = []

  for (let i = 0; i < ranges.length; i++) { // loops over ranges
    const { start, end } = ranges[i]
    for (let j = start; j <= end ; j++) { // loops inside each range
      const jString = `${j}`
      const length = jString.length

      for (let mod = 2; mod <= length; mod++) { // loops each partition of the string
        if (length % mod === 0) {
          const iterations = length / mod
          const set = new Set()
          const arr = []
          for (let stringStart = 0, stringEnd = iterations; stringEnd <= length && set.size <= 1; stringStart = stringEnd, stringEnd += iterations) { // loops each splitted part of the string
            const testedPart = jString.slice(stringStart, stringEnd)
            set.add(testedPart)
            arr.push(testedPart)
          }
          if (set.size === 1 && arr.length > 1) {
            invalids.push(j)
            break;
          }
        }
      }
    }
  }


  return invalids

}


module.exports = { solvePuzzle1, solvePuzzle2 }
