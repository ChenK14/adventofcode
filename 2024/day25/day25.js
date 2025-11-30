const getLinesFromPath = require('../index')

const parseInput = (input) => {
  // each one is 5 X 7
  const keys = []
  const locks = []

  let separatorFlag = true
  let lockFlag = false
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      if (!lockFlag) {
        const key = keys.pop()
        for (let i = 0; i < key.length; i++) {
          key[i] = 5 - key[i]
        }
        keys.push(key)
      }
      separatorFlag = true
      continue
    }
    if (separatorFlag) {
      // first line in lock or key
      if (input[i].includes('.')) {
        // key!
        lockFlag = false
        const key = new Array(5).fill(-1)
        for (let j = 0; j < input[i].length; j++) {
          if (input[i][j] === '.') {
            key[j]++
          }
        }
        keys.push(key)
      } else {
        // lock!
        lockFlag = true
        const lock = new Array(5).fill(-1)
        for (let j = 0; j < input[i].length; j++) {
          if (input[i][j] === '#') {
            lock[j]++
          }
        }
        locks.push(lock)
      }
      separatorFlag = false
    } else {
      if (lockFlag) {
        const lock = locks.pop()
        for (let j = 0; j < input[i].length; j++) {
          if (input[i][j] === '#') {
            lock[j]++
          }
        }
        locks.push(lock)
      } else {
        const key = keys.pop()
        for (let j = 0; j < input[i].length; j++) {
          if (input[i][j] === '.') {
            key[j]++
          }
        }
        keys.push(key)
      }
    }
  }

  return { keys, locks }
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day25/input.txt')
  }
  const { keys, locks } = parseInput(lines)
  console.log
  return keys.reduce((acc, key) => {
    acc += locks.reduce((lockAcc, lock) => {
      for (let i = 0; i < lock.length; i++) {
        // console.log('looking at: ', { lock, key })
        if (lock[i] + key[i] > 5) {
          return lockAcc
        }
      }
      lockAcc += 1
      return lockAcc
    }, 0)
    return acc
  }, 0)

  console.log({ keys, locks })
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day25/input.txt')
}

module.exports = { solvePuzzle1, solvePuzzle2 }
