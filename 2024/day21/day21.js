const getLinesFromPath = require('../index')

const numericMovements = new Map([
  [
    'A',
    [
      { button: 'A', actions: ['A'] },
      { button: '0', actions: ['<A'] },
      { button: '1', actions: ['^<<A'] },
      { button: '2', actions: ['<^A', '^<A'] },
      { button: '3', actions: ['^A'] },
      { button: '4', actions: ['^^<<A'] },
      { button: '5', actions: ['<^^A', '^^<A'] },
      { button: '6', actions: ['^^A'] },
      { button: '7', actions: ['^^^<<A'] },
      { button: '8', actions: ['<^^^A', '^^^<A'] },
      { button: '9', actions: ['^^^A'] },
    ],
  ],
  [
    '0',
    [
      { button: 'A', actions: ['>A'] },
      { button: '0', actions: ['A'] },
      { button: '1', actions: ['^<A'] },
      { button: '2', actions: ['^A'] },
      { button: '3', actions: ['^>A', '>^A'] },
      { button: '4', actions: ['^^<A', '^<^A'] },
      { button: '5', actions: ['^^A'] },
      { button: '6', actions: ['^^>A', '>^^A'] },
      { button: '7', actions: ['^^^<A'] },
      { button: '8', actions: ['^^^A'] },
      { button: '9', actions: ['^^^>A', '>^^^A'] },
    ],
  ],
  [
    '1',
    [
      { button: 'A', actions: ['>>vA'] },
      { button: '0', actions: ['>vA'] },
      { button: '1', actions: ['A'] },
      { button: '2', actions: ['>A'] },
      { button: '3', actions: ['>>A'] },
      { button: '4', actions: ['^A'] },
      { button: '5', actions: ['^>A', '>^A'] },
      { button: '6', actions: ['^>>A', '>>^A'] },
      { button: '7', actions: ['^^A'] },
      { button: '8', actions: ['^^>A', '>^^A'] },
      { button: '9', actions: ['^^>>A', '>>^^A'] },
    ],
  ],
  [
    '2',
    [
      { button: 'A', actions: ['>vA', 'v>A'] },
      { button: '0', actions: ['vA'] },
      { button: '1', actions: ['<A'] },
      { button: '2', actions: ['A'] },
      { button: '3', actions: ['>A'] },
      { button: '4', actions: ['^<A', '<^A'] },
      { button: '5', actions: ['^A'] },
      { button: '6', actions: ['^>A', '>^A'] },
      { button: '7', actions: ['^^<A', '<^^A'] },
      { button: '8', actions: ['^^A'] },
      { button: '9', actions: ['^^>A', '>^^A'] },
    ],
  ],
  [
    '3',
    [
      { button: 'A', actions: ['vA'] },
      { button: '0', actions: ['v<A', '<vA'] },
      { button: '1', actions: ['<<A'] },
      { button: '2', actions: ['<A'] },
      { button: '3', actions: ['A'] },
      { button: '4', actions: ['^<<A', '<<^A'] },
      { button: '5', actions: ['^<A', '<^A'] },
      { button: '6', actions: ['^A'] },
      { button: '7', actions: ['<<^^A', '^^<<A'] },
      { button: '8', actions: ['^^<A', '<^^A'] },
      { button: '9', actions: ['^^A'] },
    ],
  ],
  [
    '4',
    [
      { button: 'A', actions: ['>>vvA'] },
      { button: '0', actions: ['>vvA'] },
      { button: '1', actions: ['vA'] },
      { button: '2', actions: ['v>A', '>vA'] },
      { button: '3', actions: ['v>>A', '>>vA'] },
      { button: '4', actions: ['A'] },
      { button: '5', actions: ['>A'] },
      { button: '6', actions: ['>>A'] },
      { button: '7', actions: ['^A'] },
      { button: '8', actions: ['^>A', '>^A'] },
      { button: '9', actions: ['>>^A', '^>>A'] },
    ],
  ],
  [
    '5',
    [
      { button: 'A', actions: ['>vvA', 'vv>A'] },
      { button: '0', actions: ['vvA'] },
      { button: '1', actions: ['v<A', '<vA'] },
      { button: '2', actions: ['vA'] },
      { button: '3', actions: ['v>A', '>vA'] },
      { button: '4', actions: ['<A'] },
      { button: '5', actions: ['A'] },
      { button: '6', actions: ['>A'] },
      { button: '7', actions: ['^<A', '<^A'] },
      { button: '8', actions: ['^A'] },
      { button: '9', actions: ['>^A', '^>A'] },
    ],
  ],
  [
    '6',
    [
      { button: 'A', actions: ['vvA'] },
      { button: '0', actions: ['vv<A', '<vvA'] },
      { button: '1', actions: ['v<<A', '<<vA'] },
      { button: '2', actions: ['v<A', '<vA'] },
      { button: '3', actions: ['vA'] },
      { button: '4', actions: ['<<A'] },
      { button: '5', actions: ['<A'] },
      { button: '6', actions: ['A'] },
      { button: '7', actions: ['^<<A', '<<^A'] },
      { button: '8', actions: ['^<A', '<^A'] },
      { button: '9', actions: ['^A'] },
    ],
  ],
  [
    '7',
    [
      { button: 'A', actions: ['>>vvvA'] },
      { button: '0', actions: ['>vvvA'] },
      { button: '1', actions: ['vvA'] },
      { button: '2', actions: ['vv>A', '>vvA'] },
      { button: '3', actions: ['vv>>A', '>>vvA'] },
      { button: '4', actions: ['vA'] },
      { button: '5', actions: ['v>A', '>vA'] },
      { button: '6', actions: ['v>>A', '>>vA'] },
      { button: '7', actions: ['A'] },
      { button: '8', actions: ['>A'] },
      { button: '9', actions: ['>>A'] },
    ],
  ],
  [
    '8',
    [
      { button: 'A', actions: ['>vvvA', 'vvv>A'] },
      { button: '0', actions: ['vvvA'] },
      { button: '1', actions: ['vv<A', '<vvA'] },
      { button: '2', actions: ['vvA'] },
      { button: '3', actions: ['vv>A', '>vvA'] },
      { button: '4', actions: ['v<A', '<vA'] },
      { button: '5', actions: ['vA'] },
      { button: '6', actions: ['v>A', '>vA'] },
      { button: '7', actions: ['<A'] },
      { button: '8', actions: ['A'] },
      { button: '9', actions: ['>A'] },
    ],
  ],
  [
    '9',
    [
      { button: 'A', actions: ['vvvA'] },
      { button: '0', actions: ['vvv<A', '<vvvA'] },
      { button: '1', actions: ['vv<<A', '<<vvA'] },
      { button: '2', actions: ['vv<A', '<vvA'] },
      { button: '3', actions: ['vvA'] },
      { button: '4', actions: ['v<<A', '<<vA'] },
      { button: '5', actions: ['v<A', '<vA'] },
      { button: '6', actions: ['vA'] },
      { button: '7', actions: ['<<A'] },
      { button: '8', actions: ['<A'] },
      { button: '9', actions: ['A'] },
    ],
  ],
])

const arrowMovements = new Map([
  [
    'A',
    [
      { button: 'A', actions: ['A'] },
      { button: '^', actions: ['<A'] },
      { button: 'v', actions: ['<vA', 'v<A'] },
      { button: '<', actions: ['v<<A', '<v<A'] },
      { button: '>', actions: ['vA'] },
    ],
  ],
  [
    '^',
    [
      { button: 'A', actions: ['>A'] },
      { button: '^', actions: ['A'] },
      { button: 'v', actions: ['vA'] },
      { button: '<', actions: ['v<A'] },
      { button: '>', actions: ['v>A', '>vA'] },
    ],
  ],
  [
    'v',
    [
      { button: 'A', actions: ['^>A', '>^A'] },
      { button: '^', actions: ['^A'] },
      { button: 'v', actions: ['A'] },
      { button: '<', actions: ['<A'] },
      { button: '>', actions: ['>A'] },
    ],
  ],
  [
    '<',
    [
      { button: 'A', actions: ['>>^A', '>^>A'] },
      { button: '^', actions: ['>^A'] },
      { button: 'v', actions: ['>A'] },
      { button: '<', actions: ['A'] },
      { button: '>', actions: ['>>A'] },
    ],
  ],
  [
    '>',
    [
      { button: 'A', actions: ['^A'] },
      { button: '^', actions: ['<^A', '^<A'] },
      { button: 'v', actions: ['<A'] },
      { button: '<', actions: ['<<A'] },
      { button: '>', actions: ['A'] },
    ],
  ],
])

function memoize(fn) {
  const cache = new Map()
  return (...args) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

function processArrowCommand(command) {
  let current = 'A'
  let output = ''

  for (const target of command) {
    const moves = arrowMovements.get(current).find((m) => m.button === target).actions[0]
    output += moves
    current = target
  }
  return output
}

function processNumberCommand(command) {
  let current = 'A'
  let outputs = ['']

  for (const target of command) {
    const moves = numericMovements.get(current).find((m) => m.button === target).actions
    const newOutputs = []
    for (const output of outputs) {
      for (const action of moves) {
        newOutputs.push(output + action)
      }
    }
    outputs = newOutputs
    current = target
  }
  return outputs
}

const findShortestSequence = memoize((command, numRobots, keypad = 0) => {
  if (keypad === numRobots) return command.length

  const nextCommand = processArrowCommand(command)
  const commandSplits = nextCommand
    .split('A')
    .filter((cmd, i, arr) => i !== arr.length - 1)
    .map((c) => c + 'A')

  let shortest = commandSplits.reduce((sum, cmd) => sum + findShortestSequence(cmd, numRobots, keypad + 1), 0)

  return shortest
})

const solvePuzzle1 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day21/input.txt')

  return lines
    .filter((l) => /^\d{3}A$/.test(l))
    .reduce((total, code) => {
      const numPart = parseInt(code)
      const arrowCommands = processNumberCommand(code)

      let shortestLength = Infinity
      for (const cmd of arrowCommands) {
        const length = findShortestSequence(cmd, 2)
        if (length < shortestLength) shortestLength = length
      }

      return total + shortestLength * numPart
    }, 0)
}
const memo = new Map()

function findShortestSequence2(command, numRobots, keypad = 0) {
  const key = `${command}|${keypad}`
  if (memo.has(key)) return memo.get(key)

  if (keypad === numRobots) return command.length

  const nextCommand = processArrowCommand(command)
  const splits = nextCommand.split('A')
  const length = splits.slice(0, -1).reduce((sum, cmd) => sum + findShortestSequence2(cmd + 'A', numRobots, keypad + 1), 0)

  memo.set(key, length)
  return length
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day21/input.txt')
  memo.clear()

  return lines
    .filter((l) => /^\d{3}A$/.test(l))
    .reduce((total, code) => {
      const numPart = parseInt(code)
      const cmds = processNumberCommand(code)
      const shortestLength = Math.min(...cmds.map((c) => findShortestSequence2(c, 25)))
      return total + shortestLength * numPart
    }, 0)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
