const getLinesFromPath = require("../index")

// ============================================================================
// PART 1: Light Toggle Problem (BFS)
// ============================================================================

const parseInputForPart1 = (input) => {
  const lightPatterns = []
  const buttonConfigurations = []

  for (const line of input) {
    const lightPattern = line.match(/\[([.#]+)\]/)[1]
    
    let lightMask = 0
    for (let position = 0; position < lightPattern.length; position++) {
      if (lightPattern[position] === '#') {
        lightMask |= (1 << position)
      }
    }
    lightPatterns.push(lightMask)
    
    const buttonMatches = line.matchAll(/\(([^)]+)\)/g)
    const buttonMasks = []
    for (const match of buttonMatches) {
      const positions = match[1].split(',').map(Number)
      let buttonMask = 0
      for (const pos of positions) {
        buttonMask |= (1 << pos)
      }
      buttonMasks.push(buttonMask)
    }
    buttonConfigurations.push(buttonMasks)
  }

  return { lightPatterns, buttonConfigurations }
}

const findMinimumPressesForLights = (targetLightMask, buttonMasks) => {
  if (targetLightMask === 0) return 0
  
  const queue = [{ currentState: 0, pressCount: 0 }]
  const visitedStates = new Set([0])
  
  while (queue.length > 0) {
    const { currentState, pressCount } = queue.shift()
    
    for (const buttonMask of buttonMasks) {
      const newState = currentState ^ buttonMask
      
      if (newState === targetLightMask) {
        return pressCount + 1
      }
      
      if (!visitedStates.has(newState)) {
        visitedStates.add(newState)
        queue.push({ currentState: newState, pressCount: pressCount + 1 })
      }
    }
  }
  
  return -1
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day10/input.txt")
  }

  const { lightPatterns, buttonConfigurations } = parseInputForPart1(lines)
  
  let totalPresses = 0
  for (let machineIndex = 0; machineIndex < lightPatterns.length; machineIndex++) {
    totalPresses += findMinimumPressesForLights(
      lightPatterns[machineIndex], 
      buttonConfigurations[machineIndex]
    )
  }

  return totalPresses
}

// ============================================================================
// PART 2: Joltage Counter Problem (Linear Algebra)
// ============================================================================

// Rational number arithmetic to avoid floating-point errors
// A rational is represented as [numerator, denominator]

const greatestCommonDivisor = (valueA, valueB) => {
  valueA = Math.abs(valueA)
  valueB = Math.abs(valueB)
  while (valueB) {
    [valueA, valueB] = [valueB, valueA % valueB]
  }
  return valueA
}

const createRational = (numerator, denominator = 1) => {
  const divisor = greatestCommonDivisor(numerator, denominator)
  return [numerator / divisor, denominator / divisor]
}

const subtractRationals = ([num1, denom1], [num2, denom2]) => {
  return createRational(num1 * denom2 - num2 * denom1, denom1 * denom2)
}

const multiplyRationals = ([num1, denom1], [num2, denom2]) => {
  return createRational(num1 * num2, denom1 * denom2)
}

const divideRationals = ([num1, denom1], [num2, denom2]) => {
  return createRational(num1 * denom2, denom1 * num2)
}

const isRationalZero = ([numerator]) => numerator === 0

const rationalToDecimal = ([numerator, denominator]) => numerator / denominator

/**
 * Finds the minimum number of button presses to reach target joltage values.
 * 
 * This is a system of linear equations problem:
 * - Each counter must reach a target value
 * - Each button press adds 1 to specific counters
 * - We need to find non-negative integer solutions that minimize total presses
 * 
 * We use Gaussian elimination to solve the system, then search over any
 * "free variables" (buttons whose press count isn't uniquely determined)
 * to find the minimum total.
 */
const findMinimumButtonPressesForJoltage = (targetValues, buttonConfigurations) => {
  const numberOfCounters = targetValues.length
  const numberOfButtons = buttonConfigurations.length
  
  // Build the augmented matrix [A | b] where:
  // - A is the coefficient matrix (which buttons affect which counters)
  // - b is the target values vector
  // Each row represents one counter's equation
  const augmentedMatrix = []
  for (let counterIndex = 0; counterIndex < numberOfCounters; counterIndex++) {
    const matrixRow = []
    for (let buttonIndex = 0; buttonIndex < numberOfButtons; buttonIndex++) {
      matrixRow.push(createRational(0))
    }
    matrixRow.push(createRational(targetValues[counterIndex]))
    augmentedMatrix.push(matrixRow)
  }
  
  // Fill in the coefficient matrix: 1 if button affects counter, 0 otherwise
  for (let buttonIndex = 0; buttonIndex < numberOfButtons; buttonIndex++) {
    for (const affectedCounter of buttonConfigurations[buttonIndex]) {
      if (affectedCounter < numberOfCounters) {
        augmentedMatrix[affectedCounter][buttonIndex] = createRational(1)
      }
    }
  }
  
  // Gaussian elimination to Reduced Row Echelon Form (RREF)
  // This transforms the matrix so each row has a "pivot" (leading 1)
  // and all other entries in that column are 0
  const pivotColumnForRow = new Array(numberOfCounters).fill(-1)
  let currentRowIndex = 0
  
  for (let columnIndex = 0; columnIndex < numberOfButtons && currentRowIndex < numberOfCounters; columnIndex++) {
    // Find a row with non-zero value in this column (pivot row)
    let pivotRowIndex = -1
    for (let rowIndex = currentRowIndex; rowIndex < numberOfCounters; rowIndex++) {
      if (!isRationalZero(augmentedMatrix[rowIndex][columnIndex])) {
        pivotRowIndex = rowIndex
        break
      }
    }
    if (pivotRowIndex === -1) continue
    
    // Swap pivot row to current position
    [augmentedMatrix[currentRowIndex], augmentedMatrix[pivotRowIndex]] = 
      [augmentedMatrix[pivotRowIndex], augmentedMatrix[currentRowIndex]]
    pivotColumnForRow[currentRowIndex] = columnIndex
    
    // Scale row so pivot becomes 1
    const pivotValue = augmentedMatrix[currentRowIndex][columnIndex]
    for (let col = 0; col <= numberOfButtons; col++) {
      augmentedMatrix[currentRowIndex][col] = divideRationals(
        augmentedMatrix[currentRowIndex][col], 
        pivotValue
      )
    }
    
    // Eliminate this column in all other rows
    for (let rowIndex = 0; rowIndex < numberOfCounters; rowIndex++) {
      if (rowIndex === currentRowIndex) continue
      if (isRationalZero(augmentedMatrix[rowIndex][columnIndex])) continue
      
      const eliminationFactor = augmentedMatrix[rowIndex][columnIndex]
      for (let col = 0; col <= numberOfButtons; col++) {
        augmentedMatrix[rowIndex][col] = subtractRationals(
          augmentedMatrix[rowIndex][col],
          multiplyRationals(eliminationFactor, augmentedMatrix[currentRowIndex][col])
        )
      }
    }
    currentRowIndex++
  }
  
  // Identify which buttons are "pivot variables" (uniquely determined)
  // and which are "free variables" (we can choose their values)
  const pivotColumns = new Set(pivotColumnForRow.filter(col => col !== -1))
  const freeVariableIndices = []
  for (let buttonIndex = 0; buttonIndex < numberOfButtons; buttonIndex++) {
    if (!pivotColumns.has(buttonIndex)) {
      freeVariableIndices.push(buttonIndex)
    }
  }
  
  // Map each pivot column to its row for quick lookup
  const columnToRowMap = new Map()
  for (let rowIndex = 0; rowIndex < numberOfCounters; rowIndex++) {
    if (pivotColumnForRow[rowIndex] !== -1) {
      columnToRowMap.set(pivotColumnForRow[rowIndex], rowIndex)
    }
  }
  
  // Verify a solution actually achieves the target values
  const verifySolution = (buttonPresses) => {
    if (!buttonPresses) return false
    for (let counterIndex = 0; counterIndex < numberOfCounters; counterIndex++) {
      let achievedValue = 0
      for (let buttonIndex = 0; buttonIndex < numberOfButtons; buttonIndex++) {
        if (buttonConfigurations[buttonIndex].includes(counterIndex)) {
          achievedValue += buttonPresses[buttonIndex]
        }
      }
      if (achievedValue !== targetValues[counterIndex]) return false
    }
    return true
  }
  
  // If no free variables, we have a unique solution
  if (freeVariableIndices.length === 0) {
    const buttonPresses = new Array(numberOfButtons).fill(0)
    
    for (let pivotColumn = numberOfButtons - 1; pivotColumn >= 0; pivotColumn--) {
      if (!columnToRowMap.has(pivotColumn)) continue
      const rowIndex = columnToRowMap.get(pivotColumn)
      
      let value = augmentedMatrix[rowIndex][numberOfButtons]
      for (let col = 0; col < numberOfButtons; col++) {
        if (col !== pivotColumn) {
          value = subtractRationals(
            value, 
            multiplyRationals(augmentedMatrix[rowIndex][col], createRational(buttonPresses[col]))
          )
        }
      }
      const numericValue = rationalToDecimal(value)
      if (!Number.isInteger(numericValue) || numericValue < 0) return 0
      buttonPresses[pivotColumn] = numericValue
    }
    
    return verifySolution(buttonPresses) ? buttonPresses.reduce((sum, val) => sum + val, 0) : 0
  }
  
  // With free variables, we need to search for the minimum total presses
  // Precompute coefficient info for faster solving during search
  const pivotVariableInfo = []
  for (const [pivotColumn, rowIndex] of columnToRowMap) {
    pivotVariableInfo.push({
      buttonIndex: pivotColumn,
      rightHandSide: augmentedMatrix[rowIndex][numberOfButtons],
      freeVariableCoefficients: freeVariableIndices.map(
        freeVarIndex => augmentedMatrix[rowIndex][freeVarIndex]
      )
    })
  }
  
  // Solve for all button presses given specific free variable values
  const solveWithFreeVariables = (freeVariableValues) => {
    const buttonPresses = new Array(numberOfButtons).fill(0)
    for (let index = 0; index < freeVariableIndices.length; index++) {
      buttonPresses[freeVariableIndices[index]] = freeVariableValues[index]
    }
    
    for (const { buttonIndex, rightHandSide, freeVariableCoefficients } of pivotVariableInfo) {
      let value = rightHandSide
      for (let index = 0; index < freeVariableIndices.length; index++) {
        value = subtractRationals(
          value,
          multiplyRationals(freeVariableCoefficients[index], createRational(freeVariableValues[index]))
        )
      }
      const numericValue = rationalToDecimal(value)
      const roundedValue = Math.round(numericValue)
      if (Math.abs(numericValue - roundedValue) > 0.001) return null
      if (roundedValue < 0) return null
      buttonPresses[buttonIndex] = roundedValue
    }
    return buttonPresses
  }
  
  // Search over all possible free variable combinations
  let minimumTotalPresses = Infinity
  const maximumTargetValue = Math.max(...targetValues)
  
  // Limit search range based on number of free variables to keep runtime reasonable
  const searchLimit = freeVariableIndices.length <= 2 ? maximumTargetValue : 
                      freeVariableIndices.length <= 3 ? Math.min(maximumTargetValue, 100) :
                      freeVariableIndices.length <= 4 ? Math.min(maximumTargetValue, 30) : 10
  
  const currentFreeValues = new Array(freeVariableIndices.length).fill(0)
  
  const searchFreeVariables = (variableIndex) => {
    if (variableIndex === freeVariableIndices.length) {
      const buttonPresses = solveWithFreeVariables(currentFreeValues)
      if (buttonPresses && verifySolution(buttonPresses)) {
        const totalPresses = buttonPresses.reduce((sum, val) => sum + val, 0)
        if (totalPresses < minimumTotalPresses) {
          minimumTotalPresses = totalPresses
        }
      }
      return
    }
    
    for (let value = 0; value <= searchLimit; value++) {
      currentFreeValues[variableIndex] = value
      searchFreeVariables(variableIndex + 1)
    }
  }
  
  searchFreeVariables(0)
  return minimumTotalPresses === Infinity ? 0 : minimumTotalPresses
}

const parseButtonConfigurationsFromLine = (line) => {
  const buttonMatches = line.matchAll(/\(([^)]+)\)/g)
  const configurations = []
  for (const match of buttonMatches) {
    configurations.push(match[1].split(',').map(Number))
  }
  return configurations
}

const parseTargetJoltagesFromLine = (line) => {
  const joltageMatch = line.match(/\{([^}]+)\}/)
  return joltageMatch[1].split(',').map(Number)
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day10/input.txt")
  }
  
  let totalPresses = 0
  for (const line of lines) {
    const buttonConfigurations = parseButtonConfigurationsFromLine(line)
    const targetJoltageValues = parseTargetJoltagesFromLine(line)
    totalPresses += findMinimumButtonPressesForJoltage(targetJoltageValues, buttonConfigurations)
  }
  
  return totalPresses
}

module.exports = { solvePuzzle1, solvePuzzle2 }
