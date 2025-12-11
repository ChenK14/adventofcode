const getLinesFromPath = require("../index")


const parseInputIntoPoints = (input) => {
  return input.map(line => {
    const [x, y, z] = line.split(',').map(Number)
    return { x, y, z }
  })
}

const getAllPairs = (points) => {
  const pairs = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x
      const dy = points[i].y - points[j].y
      const dz = points[i].z - points[j].z
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
      pairs.push({ i, j, distance })
    }
  }
  return pairs
}

const findCircuit = (circuit, box) => {
  if (circuit[box] !== box) {
    circuit[box] = findCircuit(circuit, circuit[box])
  }
  return circuit[box]
}

const connectBoxes = (circuit, box1, box2) => {
  const circuit1 = findCircuit(circuit, box1)
  const circuit2 = findCircuit(circuit, box2)
  if (circuit1 !== circuit2) {
    circuit[circuit1] = circuit2
  }
}


const solvePuzzle1 = (lines, testing) => {
  let numOfCircuits = 10
  if (!testing) {
    lines = getLinesFromPath("day8/input.txt")
    numOfCircuits = 1000
  }

  const points = parseInputIntoPoints(lines)
  const sortedPairs = getAllPairs(points).sort((a, b) => a.distance - b.distance)


  const circuit = points.map((_, i) => i)

  for (let k = 0; k < numOfCircuits && k < sortedPairs.length; k++) {
    connectBoxes(circuit, sortedPairs[k].i, sortedPairs[k].j)
  }

  const circuitSizes = points.reduce((acc, _, i) => {
    const root = findCircuit(circuit, i)
    acc[root] = (acc[root] || 0) + 1
    return acc
  }, {})

  const sizes = Object.values(circuitSizes).sort((a, b) => b - a)
  return sizes[0] * sizes[1] * sizes[2]
}


const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day8/input.txt")
  }

  const points = parseInputIntoPoints(lines)
  const sortedPairs = getAllPairs(points).sort((a, b) => a.distance - b.distance)
  const circuit = points.map((_, i) => i)

  const countCircuits = () => {
    const roots = points.map((_, i) => findCircuit(circuit, i))
    return new Set(roots).size
  }

  let lastPair = null
  let k = 0

  while (countCircuits() > 1) {
    const root1 = findCircuit(circuit, sortedPairs[k].i)
    const root2 = findCircuit(circuit, sortedPairs[k].j)

    if (root1 !== root2) {
      connectBoxes(circuit, sortedPairs[k].i, sortedPairs[k].j)
      lastPair = sortedPairs[k]
    }
    k++
  }

  return points[lastPair.i].x * points[lastPair.j].x
}

module.exports = { solvePuzzle1, solvePuzzle2 }
