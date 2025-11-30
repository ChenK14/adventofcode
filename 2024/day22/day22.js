const getLinesFromPath = require('../index')

const mix = (secret, value) => {
  return (secret ^ value) >>> 0 // Ensure unsigned 32-bit integer
}

const prune = (secret) => {
  return secret % 16777216
}

const generateNextSecret = (secret) => {
  // Step 1: Multiply by 64
  let result = mix(secret, (secret * 64) >>> 0)
  result = prune(result)

  // Step 2: Divide by 32 and round down
  result = mix(result, Math.floor(result / 32))
  result = prune(result)

  // Step 3: Multiply by 2048
  result = mix(result, (result * 2048) >>> 0)
  result = prune(result)

  return result
}

const generateNthSecret = (initialSecret, n) => {
  let secret = initialSecret
  for (let i = 0; i < n; i++) {
    secret = generateNextSecret(secret)
  }
  return secret
}

const parseInput = (lines) => {
  return lines.map((line) => parseInt(line.trim()))
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day22/input.txt')

  const initialSecrets = parseInput(lines)
  const targetGeneration = 2000

  return initialSecrets.reduce((sum, initialSecret) => {
    return sum + generateNthSecret(initialSecret, targetGeneration)
  }, 0)
}

const generatePriceSequence2 = (initialSecret, length) => {
  let prices = [initialSecret % 10]
  let secret = initialSecret
  for (let i = 0; i < length; i++) {
    secret = generateNextSecret(secret)
    prices.push(secret % 10)
  }
  return prices
}

const getPriceChanges2 = (prices) => {
  let changes = []
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1])
  }
  return changes
}

const findFirstOccurrence2 = (changes, sequence, prices) => {
  for (let i = 0; i <= changes.length - sequence.length; i++) {
    let matches = true
    for (let j = 0; j < sequence.length; j++) {
      if (changes[i + j] !== sequence[j]) {
        matches = false
        break
      }
    }
    if (matches) {
      return prices[i + sequence.length]
    }
  }
  return 0
}

const evaluateSequence2 = (sequence, initialSecrets, priceChangeCache) => {
  let totalBananas = 0

  for (const secret of initialSecrets) {
    if (!priceChangeCache.has(secret)) {
      const prices = generatePriceSequence2(secret, 2000)
      const changes = getPriceChanges2(prices)
      priceChangeCache.set(secret, { prices, changes })
    }
    const { prices, changes } = priceChangeCache.get(secret)
    const bananas = findFirstOccurrence2(changes, sequence, prices)
    totalBananas += bananas
  }

  return totalBananas
}

const findOptimalSequence2 = (initialSecrets) => {
  const priceChangeCache = new Map()
  let bestSequence = [-2, 1, -1, 3]
  let maxBananas = 0

  for (let a = -5; a <= 5; a++) {
    for (let b = -5; b <= 5; b++) {
      for (let c = -5; c <= 5; c++) {
        for (let d = -5; d <= 5; d++) {
          const sequence = [a, b, c, d]
          const bananas = evaluateSequence2(sequence, initialSecrets, priceChangeCache)
          if (bananas > maxBananas) {
            maxBananas = bananas
            bestSequence = sequence
          }
        }
      }
    }
  }

  return maxBananas
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) lines = getLinesFromPath('day22/input.txt')

  const initialSecrets = testing ? [1, 2, 3, 2024] : lines.map((line) => parseInt(line.trim()))

  return findOptimalSequence2(initialSecrets)
}

module.exports = { solvePuzzle1, solvePuzzle2 }
