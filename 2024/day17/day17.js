const getLinesFromPath = require('../index')

// const getOutputFromProgram = (registers, instructions) => {
//   let output = []
//   let ip = 0 // Instruction pointer

//   while (ip < instructions.length) {
//     const opcode = instructions[ip]
//     const operand = ip + 1 < instructions.length ? instructions[ip + 1] : undefined

//     if (operand === undefined) {
//       // If there's no operand, halt
//       break
//     }

//     switch (opcode) {
//       case 0: {
//         // adv
//         const denominator = Math.pow(2, operandMap(registers)[operand])
//         registers.A = Math.trunc(registers.A / denominator)
//         ip += 2
//         break
//       }
//       case 1: {
//         // bxl
//         registers.B = registers.B ^ operand
//         ip += 2
//         break
//       }
//       case 2: {
//         // bst
//         const value = operandMap(registers)[operand] % 8
//         registers.B = value
//         ip += 2
//         break
//       }
//       case 3: {
//         // jnz
//         if (registers.A !== 0) {
//           ip = operand // Jump to the operand value
//         } else {
//           ip += 2
//         }
//         break
//       }
//       case 4: {
//         // bxc
//         registers.B = registers.B ^ registers.C
//         ip += 2 // Operand is ignored
//         break
//       }
//       case 5: {
//         // out
//         const outValue = operandMap(registers)[operand] % 8
//         output.push(outValue)
//         ip += 2
//         break
//       }
//       case 6: {
//         // bdv
//         const denominator = Math.pow(2, operandMap(registers)[operand])
//         registers.B = Math.trunc(registers.A / denominator)
//         ip += 2
//         break
//       }
//       case 7: {
//         // cdv
//         const denominator = Math.pow(2, operandMap(registers)[operand])
//         registers.C = Math.trunc(registers.A / denominator)
//         ip += 2
//         break
//       }
//     }
//   }
//   return output
// }

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day17/input.txt')
  }

  const { registers, instructions } = parseInput(lines)

  console.log({ registers, instructions })
  const output = getOutputFromProgram(registers, instructions)
  return output.join(',')
}

// adv - division value in register A / Math.pow(2,operandMap[operand]) an operand of 5 would divide A by 2^B.  => result is written to register A
// bxl - bitwise xor between register B and operand (not operandMap[operand]) => result is written to register B
// bst - operandMap[operand] % 8 => result is written in register B
// jnz - nothing if register A is 0. else- next instruction is operand (not operandMap[operand])
// bxc - bitwise xor between register B and register C => result is written to register B
// out - operandMap[operand] % 8 => result returned from the calc function, multiple values dived by commas
// bdv - division value in register A / Math.pow(2,operandMap[operand]) an operand of 5 would divide A by 2^B.  => result is written to register B
// cdv - division value in register A / Math.pow(2,operandMap[operand]) an operand of 5 would divide A by 2^B.  => result is written to register C

// const operandMap = (registers) => ({
//   // opcode map
//   0: 0,
//   1: 1,
//   2: 2,
//   3: 3,
//   4: registers.A, // value in register A
//   5: registers.B, // value in register B
//   6: registers.C, // value in register C
//   7: '', // should never be called
// })

// const findAForProgram = (program) => {
//   let A = 0
//   for (let i = 0; i < program.length; i++) {
//     const currProgram = program[i]
//     const pow = i + 1
//     A += currProgram * Math.pow(8, pow)
//   }
//   return A
// }

// function findLowestRegisterAOptimized(instructions) {
//   // Memory optimization 1: Cache program outputs
//   const outputCache = new Map()

//   // Memory optimization 2: Cache register states at specific points
//   const stateCache = new Map()

//   // Memory optimization 3: Track patterns in outputs
//   const patternCache = new Map()

//   let a = 1

//   function getOutputWithCache(regA) {
//     // Check output cache first
//     if (outputCache.has(regA)) {
//       return outputCache.get(regA)
//     }

//     const registers = {
//       A: regA,
//       B: 0,
//       C: 0,
//     }

//     const output = getOutputFromProgram({ ...registers }, [...instructions])

//     // Store in cache
//     outputCache.set(regA, output)

//     // Store state pattern
//     const stateKey = `${registers.B},${registers.C}`
//     if (!stateCache.has(stateKey)) {
//       stateCache.set(stateKey, regA)
//     }

//     // Analyze and store output pattern
//     const patternKey = output.slice(0, 3).join(',') // First 3 outputs as pattern
//     if (!patternCache.has(patternKey)) {
//       patternCache.set(patternKey, regA)
//     } else {
//       // If we've seen this pattern, store the cycle length
//       const cycleLength = regA - patternCache.get(patternKey)
//       if (cycleLength > 0) {
//         patternCache.set(`cycle_${patternKey}`, cycleLength)
//       }
//     }

//     return output
//   }

//   while (true) {
//     // Check if we can make an intelligent jump
//     const output = getOutputWithCache(a)

//     // Log progress with meaningful information
//     if (a % 1000000 === 0) {
//       console.log(`A=${a}, Output=${output}, Cache size=${outputCache.size}`)
//       console.log(`Patterns found: ${patternCache.size}`)
//     }

//     // Main check for solution
//     if (output.length === instructions.length && output.every((val, idx) => val === instructions[idx])) {
//       return a
//     }

//     // Optimization: Pattern-based jumping
//     const patternKey = output.slice(0, 3).join(',')
//     const cycleKey = `cycle_${patternKey}`

//     if (patternCache.has(cycleKey)) {
//       // We found a cycle, make an intelligent jump
//       const cycleLength = patternCache.get(cycleKey)
//       // Jump but ensure we don't overshoot
//       const jump = Math.max(1, Math.floor(cycleLength / 2))
//       a += jump
//     } else {
//       // Regular increment if no pattern found
//       a++
//     }

//     // Memory management: Clear caches periodically to prevent memory overflow
//     if (outputCache.size > 1000000) {
//       // Keep only recent entries
//       const entries = Array.from(outputCache.entries()).slice(-100000)
//       outputCache.clear()
//       entries.forEach(([key, value]) => outputCache.set(key, value))
//     }
//   }
// }
// function findLowestRegisterA(instructions) {
//   let a = 1

//   while (true) {
//     const registers = {
//       A: a,
//       B: 0,
//       C: 0,
//     }

//     const output = getOutputFromProgram({ ...registers }, [...instructions])

//     // Log progress periodically
//     if (a % 1000000 === 0) {
//       console.log(`Testing A=${a}, Output=${output}`)
//     }

//     // Check if output matches instructions exactly
//     if (output.length === instructions.length && output.every((val, idx) => val === instructions[idx])) {
//       console.log(`Found match with A=${a}`)
//       return a
//     }

//     a++
//   }
// }

const parseInput = (input) => {
  const registers = {
    A: 0,
    B: 0,
    C: 0,
  }
  let instructions = []
  for (let i = 0; i < input.length; i++) {
    if (input[i].length > 0) {
      const [register, value] = input[i].split(':')
      const possibleRegisters = Object.keys(registers)
      const registerKey = register[register.length - 1]
      if (possibleRegisters.includes(registerKey)) {
        registers[registerKey] = parseInt(value)
      } else {
        instructions = value
          .trim()
          .split(',')
          .map((val) => parseInt(val))
      }
    }
  }

  return { registers, instructions }
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day17/input.txt')
  }

  const { registers, instructions } = parseInput(lines)
  function simulateComputer(A) {
    const comboOp = (ptr, A, B, C) => {
      const val = instructions[ptr + 1]
      if (val < 4) return BigInt(val)
      if (val === 4) return A
      if (val === 5) return B
      if (val === 6) return C
      return 0n
    }

    let ptr = 0
    let B = 0n
    let C = 0n
    let output = []

    while (ptr < instructions.length) {
      const cmd = instructions[ptr]
      switch (cmd) {
        case 0:
          A = A >> comboOp(ptr, A, B, C)
          break
        case 1:
          B = B ^ BigInt(instructions[ptr + 1])
          break
        case 2:
          B = comboOp(ptr, A, B, C) % 8n
          break
        case 3:
          if (A !== 0n) ptr = instructions[ptr + 1] - 2
          break
        case 4:
          B = B ^ C
          break
        case 5:
          output.push(Number(comboOp(ptr, A, B, C) % 8n))
          break
        case 6:
          B = A >> comboOp(ptr, A, B, C)
          break
        case 7:
          C = A >> comboOp(ptr, A, B, C)
          break
      }
      ptr += 2
    }
    return output
  }

  function findSolution() {
    const valids = new Set()
    let minValid = 8n ** 17n

    function check(depth, score) {
      if (depth === instructions.length) {
        valids.add(score)
        if (score < minValid) minValid = score
        return
      }

      for (let i = 0; i < 8; i++) {
        const testA = BigInt(i) + 8n * score
        if (simulateComputer(testA)[0] === instructions[instructions.length - 1 - depth]) {
          check(depth + 1, testA)
        }
      }
    }

    check(0, 0n)
    return minValid
  }

  return findSolution()
  // const result = findLowestRegisterA(instructions)
  // return findAForProgram(instructions)
  // return findProgramCopyInitialValue(instructions)
}

module.exports = { solvePuzzle1, solvePuzzle2 }

// BUFFER

const operandMap = (registers) => ({
  0: 0n,
  1: 1n,
  2: 2n,
  3: 3n,
  4: registers.A,
  5: registers.B,
  6: registers.C,
  7: undefined,
})
