const getLinesFromPath = require('../index')

const parseInput = (input) => {
  const wiresMap = {}
  const tempGateToWiresAndConditionMap = {}

  let gatesFlag = false
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      gatesFlag = true
      continue
    }
    if (!gatesFlag) {
      const [gate, value] = input[i].split(': ')
      wiresMap[gate] = parseInt(value) === 1
    } else {
      const [wiresAndCondition, gate] = input[i].split(' -> ')
      const [gateA, condition, gateB] = wiresAndCondition.split(' ')
      tempGateToWiresAndConditionMap[gate] = { gateA, gateB, condition }
      wiresMap[gate] ? null : (wiresMap[gate] = false)
      wiresMap[gateA] ? null : (wiresMap[gateA] = false)
      wiresMap[gateB] ? null : (wiresMap[gateB] = false)
    }
  }

  const gateToWiresAndConditionMap = {}
  Object.keys(tempGateToWiresAndConditionMap)
    .sort()
    .forEach((key) => (tempGateToWiresAndConditionMap[key] ? (gateToWiresAndConditionMap[key] = tempGateToWiresAndConditionMap[key]) : null))

  return { wiresMap, gateToWiresAndConditionMap }
}

const oldConditionMap = {
  OR: '||',
  AND: '&&',
  XOR: '^',
}

const initGates = (wiresMap, gateToWiresAndConditionMap) => {
  const gateKeys = Object.keys(gateToWiresAndConditionMap)
  let changed = true

  while (changed) {
    changed = false
    for (let i = 0; i < gateKeys.length; i++) {
      const key = gateKeys[i]
      const { gateA, gateB, condition } = gateToWiresAndConditionMap[key]
      const newValue = !!eval(`${wiresMap[gateA]}${oldConditionMap[condition]}${wiresMap[gateB]}`)
      if (newValue !== wiresMap[key]) {
        changed = true
        wiresMap[key] = newValue
      }
    }
  }
}
const solvePuzzle1 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day24/input.txt')

  const { wiresMap, gateToWiresAndConditionMap } = parseInput(lines)
  // console.log({ wiresMap, gateToWiresAndConditionMap })
  initGates(wiresMap, gateToWiresAndConditionMap)
  // console.log({ wiresMap })

  const zGatesKeys = Object.keys(wiresMap)
    .filter((key) => key.startsWith('z'))
    .map((key) => parseInt(key.slice(1, 3)))
    .sort((a, b) => b - a)

  const zGates = zGatesKeys.reduce((acc, key) => {
    // console.log('key: ', `z${key < 10 ? `0${key}` : key}`, 'value: ', wiresMap[`z${key < 10 ? `0${key}` : key}`])
    acc += wiresMap[`z${key < 10 ? `0${key}` : key}`] ? '1' : '0'
    return acc
  }, '')
  console.log()
  return parseInt(zGates, 2)
}

class CircuitDebugger {
  constructor(lines) {
    const { wiresMap, gateToWiresAndConditionMap } = this.parseInput(lines)
    this.wiresMap = wiresMap
    this.gates = this.convertToGateList(gateToWiresAndConditionMap)
    this.inputBitCount = Object.keys(wiresMap).filter((w) => w.startsWith('x')).length
  }

  parseInput(input) {
    const wiresMap = {}
    const gateToWiresAndConditionMap = {}

    let gatesFlag = false
    for (const line of input) {
      if (line === '') {
        gatesFlag = true
        continue
      }
      if (!gatesFlag) {
        const [gate, value] = line.split(': ')
        wiresMap[gate] = parseInt(value) === 1
      } else {
        const [wiresAndCondition, gate] = line.split(' -> ')
        const [gateA, condition, gateB] = wiresAndCondition.split(' ')
        gateToWiresAndConditionMap[gate] = { gateA, gateB, condition }
        if (!wiresMap[gate]) wiresMap[gate] = false
        if (!wiresMap[gateA]) wiresMap[gateA] = false
        if (!wiresMap[gateB]) wiresMap[gateB] = false
      }
    }
    return { wiresMap, gateToWiresAndConditionMap }
  }

  convertToGateList(gateMap) {
    return Object.entries(gateMap).map(([output, info]) => ({
      a: info.gateA,
      b: info.gateB,
      op: info.condition,
      output,
    }))
  }

  isDirect(gate) {
    return gate.a.startsWith('x') || gate.b.startsWith('x')
  }

  isOutput(gate) {
    return gate.output.startsWith('z')
  }

  hasInput(input) {
    return (gate) => gate.a === input || gate.b === input
  }

  findSwappedGates() {
    const flags = new Set()

    // Find direct XOR gates (FAGate0s)
    const FAGate0s = this.gates.filter((g) => this.isDirect(g) && g.op === 'XOR')
    const FAGate3s = this.gates.filter((g) => !this.isDirect(g) && g.op === 'XOR')
    const outputGates = this.gates.filter((g) => this.isOutput(g))

    // Check FAGate0s
    for (const gate of FAGate0s) {
      const isFirst = gate.a === 'x00' || gate.b === 'x00'
      if (isFirst && gate.output !== 'z00') {
        flags.add(gate.output)
      } else if (!isFirst && gate.output === 'z00') {
        flags.add(gate.output)
      }
      if (this.isOutput(gate) && !isFirst) {
        flags.add(gate.output)
      }
    }

    // Check FAGate3s
    for (const gate of FAGate3s) {
      if (!this.isOutput(gate)) {
        flags.add(gate.output)
      }
    }

    // Check output gates
    for (const gate of outputGates) {
      const isLast = gate.output === `z${this.inputBitCount.toString().padStart(2, '0')}`
      if (isLast && gate.op !== 'OR') {
        flags.add(gate.output)
      } else if (!isLast && gate.op !== 'XOR') {
        flags.add(gate.output)
      }
    }

    // Check FAGate0 connections
    let checkNext = []
    for (const gate of FAGate0s) {
      if (flags.has(gate.output) || gate.output === 'z00') continue

      const matches = FAGate3s.filter(this.hasInput(gate.output))
      if (matches.length === 0) {
        checkNext.push(gate)
        flags.add(gate.output)
      }
    }

    // Analyze flagged gates
    for (const gate of checkNext) {
      const intendedResult = `z${gate.a.slice(1)}`
      const matches = FAGate3s.filter((g) => g.output === intendedResult)
      if (matches.length !== 1) throw new Error('Invalid circuit structure')

      const match = matches[0]
      const toCheck = [match.a, match.b]
      const orMatches = this.gates.filter((g) => g.op === 'OR').filter((g) => toCheck.includes(g.output))

      if (orMatches.length !== 1) throw new Error('Invalid circuit structure')

      const orMatchOutput = orMatches[0].output
      const correctOutput = toCheck.find((output) => output !== orMatchOutput)
      flags.add(correctOutput)
    }

    if (flags.size !== 8) throw new Error('Invalid number of swapped gates')

    return Array.from(flags).sort().join(',')
  }

  solve() {
    return this.findSwappedGates()
  }
}

const solvePuzzle2 = (lines, testing = false) => {
  if (!testing) lines = getLinesFromPath('day24/input.txt')
  return new CircuitDebugger(lines).solve()
}

module.exports = { solvePuzzle1, solvePuzzle2 }
