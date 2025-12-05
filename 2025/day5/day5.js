const getLinesFromPath = require("../index")


const getDataFromDataBase = (input) => {
  const freshIds = []
  const requiredIds = []
  let flag = true
  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    if (line === '') {
      flag = false
    }
    else if (flag) {
      const [min, max] = line.split('-')
      freshIds.push({ min: Number(min), max: Number(max) })
    } else {
      requiredIds.push(line)
    }
  }
  return { freshIds, requiredIds }
}


const isFresh = (freshIds, id) => {
  for (let i = 0; i < freshIds.length; i++) {
    if (freshIds[i].min <= id && freshIds[i].max >= id) {
      return true
    }
  }
  return false
}


const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day5/input.txt")
  }

  const { freshIds, requiredIds } = getDataFromDataBase(lines)
  const sortedFreshIds = freshIds.sort((a, b) => a.min - b.min)

  return requiredIds.reduce((acc, curr) => {
    if (isFresh(sortedFreshIds, curr)) {
      acc++
    }
    return acc
  }, 0)
}

const optimizeFreshArr = (sorted) => {
  const counted = [sorted[0]]
  for (let i = 1; i < sorted.length; i++) {
    const { min, max } = sorted[i]
    const { max: prevMax } = counted.at(-1) // we are not looking at prevMin, because we know that because it's sorted min >= prevMin
    if (min <= prevMax + 1) {
      counted.at(-1).max = Math.max(max, prevMax)
    } else {
      counted.push({ min, max })
    }
  }
  return counted
}


const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day5/input.txt")
  }

  const { freshIds } = getDataFromDataBase(lines)
  const sortedFreshIds = freshIds.sort((a, b) => a.min - b.min)


  return optimizeFreshArr(sortedFreshIds).reduce((acc, curr) => {
    acc += (curr.max - curr.min) + 1
    return acc
  }, 0)

}


module.exports = { solvePuzzle1, solvePuzzle2 }
