const getLinesFromPath = require('../index')

const getXAndYValuesFromLine = (line, isPrize) => {
  const splitted = line.split(',').map((a) => a.trim())
  if (isPrize) {
    return { x: parseInt(splitted[0].split('=')[1]), y: parseInt(splitted[1].split('=')[1]) }
  }

  const x = splitted[0].substring(1)
  const y = splitted[1].substring(1)

  return { x: parseInt(x), y: parseInt(y) }
}

const getClawMachinesFromInput = (input, twist) => {
  const machines = []
  let newMachine = true
  let machine = {}
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '') {
      machines.push(machine)
      machine = {}
      newMachine = true
      continue
    }
    newMachine = false
    const splitted = input[i].split(':')
    const isPrize = splitted[0].split(' ').length === 1
    machine[isPrize ? 'prize' : splitted[0].split(' ')[1]] = getXAndYValuesFromLine(splitted[1], isPrize)
  }

  for (let i = 0; i < machines.length; i++) {
    machines[i].A['cost'] = 3
    machines[i].B['cost'] = 1
    if (twist) {
      machines[i].prize.x += 10000000000000
      machines[i].prize.y += 10000000000000
    }
  }

  return machines
}

const findMinimumCostForMachine = (machine) => {
  const { A, B, prize } = machine
  const px = prize.x
  const py = prize.y

  let minCost = Infinity
  let solution = null

  // Iterate through possible presses of A (0 to 100)
  for (let a = 0; a <= 100; a++) {
    // Calculate the remaining X and Y after pressing A 'a' times
    const remainingX = px - A.x * a
    const remainingY = py - A.y * a

    // Check if remainingX and remainingY are non-negative
    if (remainingX < 0 || remainingY < 0) continue

    // If B.x is zero, handle separately to avoid division by zero
    if (B.x === 0) {
      if (remainingX !== 0) continue
      // Calculate presses of B based on Y axis
      const b = remainingY / B.y
      if (Number.isInteger(b) && b >= 0 && b <= 100) {
        const cost = A.cost * a + B.cost * b
        if (cost < minCost) {
          minCost = cost
          solution = { a, b, cost }
        }
      }
      continue
    }

    // Check if B.x divides remainingX exactly
    if (remainingX % B.x !== 0) continue
    const b = remainingX / B.x

    // Check if b is an integer and within the allowed range
    if (!Number.isInteger(b) || b < 0 || b > 100) continue

    // Verify that the Y-axis movement matches
    if (A.y * a + B.y * b === py) {
      const cost = A.cost * a + B.cost * b
      if (cost < minCost) {
        minCost = cost
        solution = { a, b, cost }
      }
    }
  }

  return solution // Returns null if no valid solution is found
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day13/input.txt')
  }
  const clawMachines = getClawMachinesFromInput(lines, false)
  // console.log(clawMachines);

  let totalPrizes = 0
  let totalTokens = 0
  let details = [] // To store details of each solved machine

  for (let i = 0; i < clawMachines.length; i++) {
    const machine = clawMachines[i]
    const solution = findMinimumCostForMachine(machine)
    if (solution) {
      totalPrizes += 1
      totalTokens += solution.cost
      details.push({
        machine: i + 1,
        A_presses: solution.a,
        B_presses: solution.b,
        cost: solution.cost,
      })
    }
  }

  return totalTokens
}

function solveMachineWithBigInt(machine, machineIndex) {
  const A = {
    x: BigInt(machine.A.x),
    y: BigInt(machine.A.y),
    cost: BigInt(machine.A.cost),
  }
  const B = {
    x: BigInt(machine.B.x),
    y: BigInt(machine.B.y),
    cost: BigInt(machine.B.cost),
  }
  const px = BigInt(machine.prize.x)
  const py = BigInt(machine.prize.y)

  console.log(`Machine ${machineIndex + 1}: Attempting to solve.`)

  const det = A.x * B.y - A.y * B.x
  if (det === 0n) {
    console.log(`Machine ${machineIndex + 1}: det = 0, no unique solution.`)
    return null
  }

  const aNum = px * B.y - py * B.x
  const bNum = A.x * py - A.y * px

  if (aNum % det !== 0n || bNum % det !== 0n) {
    console.log(`Machine ${machineIndex + 1}: not divisible, no integer solution.`)
    return null
  }

  const a = aNum / det
  const b = bNum / det

  if (a < 0n || b < 0n) {
    console.log(`Machine ${machineIndex + 1}: negative solution, a=${a}, b=${b}`)
    return null
  }

  const cost = A.cost * a + B.cost * b
  console.log(`Machine ${machineIndex + 1}: Found a solution: a=${a}, b=${b}, cost=${cost}`)
  return { a, b, cost }
}
const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day13/input.txt')
  }

  const clawMachines = getClawMachinesFromInput(lines, true)
  let totalTokens = 0n
  let totalPrizes = 0

  for (let i = 0; i < clawMachines.length; i++) {
    const machine = clawMachines[i]
    const solution = solveMachineWithBigInt(machine, i)
    if (solution) {
      totalTokens += solution.cost
      totalPrizes += 1
    }
  }

  // Convert BigInt to Number since the expected result fits within safe integer range
  return Number(totalTokens)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
