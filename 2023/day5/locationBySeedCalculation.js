const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day5/input.txt")
const getSeedsFromLines = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("seeds:")) {
      return lines[0].split(":")[1].trim().split(" ")
    }
  }
  return []
}

const getDestinationValueFromSource = (lines, mapName, sourceValue) => {
  let mapFound = false
  let sourceDestinationMap = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(mapName)) {
      mapFound = true
      continue
    } else if (mapFound && lines[i] === "") {
      break
    } else if (mapFound) {
      const line = lines[i].split(" ")
      sourceDestinationMap.push({
        source: parseInt(line[1]),
        destination: parseInt(line[0]),
        steps: parseInt(line[2]),
      })
    }
  }
  for (let i = 0; i < sourceDestinationMap.length; i++) {
    if (
      sourceDestinationMap[i].source + sourceDestinationMap[i].steps > sourceValue &&
      sourceDestinationMap[i].source <= sourceValue
    ) {
      const steps = sourceValue - sourceDestinationMap[i].source
      return sourceDestinationMap[i].destination + steps
    }
  }
  return sourceValue
}

const getMinLocationBySeedFromLines = (lines) => {
  const seeds = getSeedsFromLines(lines)
  let minLocation = 999999999

  for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i]
    const soil = getDestinationValueFromSource(lines, "seed-to-soil", seed)
    const fertilizer = getDestinationValueFromSource(lines, "soil-to-fertilizer", soil)
    const water = getDestinationValueFromSource(lines, "fertilizer-to-water", fertilizer)
    const light = getDestinationValueFromSource(lines, "water-to-light", water)
    const temperature = getDestinationValueFromSource(lines, "light-to-temperature", light)
    const humidity = getDestinationValueFromSource(lines, "temperature-to-humidity", temperature)
    const location = getDestinationValueFromSource(lines, "humidity-to-location", humidity)

    if (location < minLocation) {
      minLocation = location
    }
  }

  return minLocation
}

const getLocationFromSeed = (seed, lines) => {
  const soil = getDestinationValueFromSource(lines, "seed-to-soil", seed)
  const fertilizer = getDestinationValueFromSource(lines, "soil-to-fertilizer", soil)
  const water = getDestinationValueFromSource(lines, "fertilizer-to-water", fertilizer)
  const light = getDestinationValueFromSource(lines, "water-to-light", water)
  const temperature = getDestinationValueFromSource(lines, "light-to-temperature", light)
  const humidity = getDestinationValueFromSource(lines, "temperature-to-humidity", temperature)
  return getDestinationValueFromSource(lines, "humidity-to-location", humidity)
}

const getSeedFromLocation = (location, lines) => {
  const humidity = getSourceValueFromDestination(lines, "humidity-to-location", location)
  const temperature = getSourceValueFromDestination(lines, "temperature-to-humidity", humidity)
  const light = getSourceValueFromDestination(lines, "light-to-temperature", temperature)
  const water = getSourceValueFromDestination(lines, "water-to-light", light)
  const fertilizer = getSourceValueFromDestination(lines, "fertilizer-to-water", water)
  const soil = getSourceValueFromDestination(lines, "soil-to-fertilizer", fertilizer)
  return getSourceValueFromDestination(lines, "seed-to-soil", soil)
}

const getSourceValueFromDestination = (lines, mapName, destinationValue) => {
  let mapFound = false
  let sourceDestinationMap = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(mapName)) {
      mapFound = true
      continue
    } else if (mapFound && lines[i] === "") {
      break
    } else if (mapFound) {
      const line = lines[i].split(" ")
      sourceDestinationMap.push({
        source: parseInt(line[1]),
        destination: parseInt(line[0]),
        steps: parseInt(line[2]),
      })
    }
  }
  for (let i = 0; i < sourceDestinationMap.length; i++) {
    if (
      sourceDestinationMap[i].destination + sourceDestinationMap[i].steps > destinationValue &&
      sourceDestinationMap[i].destination <= destinationValue
    ) {
      const steps = destinationValue - sourceDestinationMap[i].destination
      return sourceDestinationMap[i].source + steps
    }
  }
  return destinationValue
}

const isSeedInRange = (seed, lines) => {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("seeds:")) {
      const seedsRange = lines[0].split(":")[1].trim().split(" ")
      for (let i = 1; i <= seedsRange.length; i = i + 2) {
        const parsedSeed = parseInt(seed)
        if (
          parseInt(seedsRange[i - 1]) <= parsedSeed &&
          parseInt(seedsRange[i - 1]) + parseInt(seedsRange[i]) >= parsedSeed
        ) {
          return true
        }
      }
    }
  }
  return false
}

const getMinLocationBySeedFromLinesByRange = (lines) => {
  for (let i = 0; i >= 0; i++) {
    const seed = getSeedFromLocation(i, lines)
    if (isSeedInRange(seed, lines)) {
      return i
    }
    if (i % 1000 === 0 && i != 0) {
      // just to monitor progress
      console.log(i)
    }
  }
}

// console.log("day 5 challenge 1:", getMinLocationBySeedFromLines(lines));
// console.log("day 5 challenge 2:", getMinLocationBySeedFromLinesByRange(lines)); // DO NOT UNCOMMENT! IT TAKES A LONG TIME (3.5hr) TO RUN!

module.exports = {
  getMinLocationBySeedFromLines,
  getMinLocationBySeedFromLinesByRange,
}
