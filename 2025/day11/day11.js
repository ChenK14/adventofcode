const getLinesFromPath = require("../index")

const parseGraph = (lines) => {
  const graph = new Map()
  for (const line of lines) {
    const [device, outputs] = line.split(': ')
    graph.set(device, outputs.split(' '))
  }
  return graph
}

const countPaths = (graph, current, target, memo) => {
  if (current === target) return 1
  
  const key = `${current}->${target}`
  if (memo.has(key)) return memo.get(key)
  
  const outputs = graph.get(current)
  if (!outputs) return 0
  
  let total = 0
  for (const next of outputs) {
    total += countPaths(graph, next, target, memo)
  }
  
  memo.set(key, total)
  return total
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day11/input.txt")
  }
  
  const graph = parseGraph(lines)
  return countPaths(graph, 'you', 'out', new Map())
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day11/input.txt")
  }
  
  const graph = parseGraph(lines)
  const memo = new Map()
  
  const paths = (from, to) => countPaths(graph, from, to, memo)
  
  const dacFirst = paths('svr', 'dac') * paths('dac', 'fft') * paths('fft', 'out')
  const fftFirst = paths('svr', 'fft') * paths('fft', 'dac') * paths('dac', 'out')
  
  return dacFirst + fftFirst
}

module.exports = { solvePuzzle1, solvePuzzle2 }
