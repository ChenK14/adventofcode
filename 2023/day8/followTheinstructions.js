const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day8/input.txt")

const getNodesFromLines = (lines) => {
  const nodes = []
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() !== "") {
      const NodesIdAndValues = lines[i].replaceAll(" ", "").split("=")
      const nodeId = NodesIdAndValues[0]
      const nodesValuesLeftAndRight = NodesIdAndValues[1]
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split(",")

      nodes.push({ nodeId, left: nodesValuesLeftAndRight[0], right: nodesValuesLeftAndRight[1] })
    }
  }
  return nodes
}

const getNumOfSteps = (lines) => {
  const instructions = lines[0].split("")
  const nodes = getNodesFromLines(lines)
  const aNodeIndex = nodes.findIndex((node) => node.nodeId === "AAA")
  let index = aNodeIndex
  let steps = 0
  for (let i = 0; ; i = (i + 1) % instructions.length) {
    const instruction = instructions[i]
    const currentNode = instruction === "R" ? nodes[index].right : nodes[index].left
    index = nodes.findIndex((node) => node.nodeId === currentNode)
    steps++
    if (currentNode === "ZZZ") return steps
  }
}

const getNumOfStepsSimultan = (lines) => {
  const instructions = lines[0].split("")
  const nodes = getNodesFromLines(lines)
  const aNodesIndexs = nodes.reduce((acc, node, index) => {
    if (node.nodeId.endsWith("A")) acc.push(index)
    return acc
  }, [])

  let aNodesIndexsToNumOfStepsMap = {}
  for (let i = 0; i < aNodesIndexs.length; i++) {
    let steps = 0
    let index = aNodesIndexs[i]
    for (let j = 0; ; j = (j + 1) % instructions.length) {
      const instruction = instructions[j]
      const currentNode = instruction === "R" ? nodes[index].right : nodes[index].left
      index = nodes.findIndex((node) => node.nodeId === currentNode)
      steps++
      if (currentNode.endsWith("Z")) {
        break
      }
    }
    aNodesIndexsToNumOfStepsMap[aNodesIndexs[i]] = steps
  }

  let lcm = 1
  for (let i = 0; i < aNodesIndexs.length; i++) {
    lcm = getLCM(lcm, aNodesIndexsToNumOfStepsMap[aNodesIndexs[i]])
  }
  return lcm
}

function getLCM(a, b) {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y))
  return (a * b) / gcd(a, b)
}

// console.log("day 8 challenge 1: ", getNumOfSteps(lines))
// console.log("day 8 challenge 2: ", getNumOfStepsSimultan(lines))

module.exports = { getNumOfSteps, getNumOfStepsSimultan }
