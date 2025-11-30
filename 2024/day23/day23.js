const getLinesFromPath = require('../index')

const parseInput = (input) => {
  return {
    connectedComputers: input.reduce((network, line) => {
      const [comp1, comp2] = line.split('-')
      network[comp1] = network[comp1] || new Set()
      network[comp2] = network[comp2] || new Set()
      network[comp1].add(comp2)
      network[comp2].add(comp1)
      return network
    }, {}),
  }
}

const getConnectedComputersTriplets = (connectedComputers) => {
  const triplets = new Set()
  const computers = Object.keys(connectedComputers)

  for (const computer of computers) {
    const connections = Array.from(connectedComputers[computer])
    for (const connected of connections) {
      const secondConnections = Array.from(connectedComputers[connected]).filter((comp) => comp !== computer)

      connections
        .filter((comp) => secondConnections.includes(comp))
        .forEach((shared) => {
          triplets.add(`${[computer, connected, shared].sort()}`)
        })
    }
  }
  return triplets
}

const getFullyConnectedComputers = (connectedComputers) => {
  const sets = new Set()
  const setsCounter = {}
  const computers = Object.keys(connectedComputers)

  for (const computer of computers) {
    const connections = Array.from(connectedComputers[computer])
    for (const connected of connections) {
      const secondConnections = Array.from(connectedComputers[connected]).filter((comp) => comp !== computer)

      const shared = connections.filter((comp) => secondConnections.includes(comp))
      const potentialSet = `${[computer, connected, ...shared].sort()}`

      setsCounter[potentialSet] = (setsCounter[potentialSet] || 0) + 1
    }
  }

  Object.entries(setsCounter).forEach(([set, count]) => {
    const computerCount = set.split(',').length
    if (count === computerCount * computerCount - computerCount) {
      sets.add(set)
    }
  })

  return sets
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day23/input.txt')
  const { connectedComputers } = parseInput(lines)
  const triplets = Array.from(getConnectedComputersTriplets(connectedComputers))
  return triplets.reduce((acc, triplet) => (triplet.includes(',t') || triplet.startsWith('t') ? acc + 1 : acc), 0)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day23/input.txt')
  const { connectedComputers } = parseInput(lines)
  const sets = Array.from(getFullyConnectedComputers(connectedComputers)).sort((a, b) => b.length - a.length)
  return sets[0]
}

module.exports = { solvePuzzle1, solvePuzzle2 }
