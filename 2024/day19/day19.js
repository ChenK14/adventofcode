const getLinesFromPath = require('../index')

const parseInput = (input) => {
  const separatorIndex = input.indexOf('')
  if (separatorIndex === -1) return { towels: new Set(), patterns: [] }

  const towelsByLength = new Map()
  input[0]
    .split(',')
    .map((towel) => towel.trim())
    .forEach((towel) => {
      const len = towel.length
      if (!towelsByLength.has(len)) {
        towelsByLength.set(len, new Set())
      }
      towelsByLength.get(len).add(towel)
    })

  return {
    towels: towelsByLength,
    patterns: input
      .slice(separatorIndex + 1)
      .map((line) => line.trim())
      .filter(Boolean),
  }
}

const canMakePattern = (pattern, towelsByLength, memo = new Map(), startIndex = 0) => {
  if (startIndex === pattern.length) return true

  const memoKey = startIndex
  if (memo.has(memoKey)) return memo.get(memoKey)

  // Try each possible towel length that could fit
  for (const [length, towels] of towelsByLength) {
    if (startIndex + length > pattern.length) continue

    const segment = pattern.slice(startIndex, startIndex + length)
    if (towels.has(segment) && canMakePattern(pattern, towelsByLength, memo, startIndex + length)) {
      memo.set(memoKey, true)
      return true
    }
  }

  memo.set(memoKey, false)
  return false
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day19/input.txt')
  }

  const { towels, patterns } = parseInput(lines)

  return patterns.reduce((count, pattern) => {
    if (canMakePattern(pattern, towels)) {
      return count + 1
    }
    return count
  }, 0)
}

const countPatternArrangements = (pattern, towelsByLength, memo = new Map(), startIndex = 0) => {
  if (startIndex === pattern.length) return 1

  const memoKey = startIndex
  if (memo.has(memoKey)) return memo.get(memoKey)

  let totalArrangements = 0

  // Try each possible towel length that could fit
  for (const [length, towels] of towelsByLength) {
    if (startIndex + length > pattern.length) continue

    const segment = pattern.slice(startIndex, startIndex + length)
    if (towels.has(segment)) {
      // Add the number of arrangements possible from this point
      totalArrangements += countPatternArrangements(pattern, towelsByLength, memo, startIndex + length)
    }
  }

  memo.set(memoKey, totalArrangements)
  return totalArrangements
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day19/input.txt')
  }
  const { towels, patterns } = parseInput(lines)

  return patterns.reduce((total, pattern) => {
    const arrangements = countPatternArrangements(pattern, towels)
    return total + arrangements
  }, 0)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
