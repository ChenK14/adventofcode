const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day6/input.txt")

const getRaceTimesAndDistanceFromLines = (lines) => {
  let raceTimesAndDistance = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes("Time")) {
      const times = line
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((d) => d !== "")
      for (let j = 0; j < times.length; j++) {
        const time = times[j]
        raceTimesAndDistance.push({ time: parseInt(time), distance: 0 })
      }
    }

    if (line.includes("Distance")) {
      const distances = line
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((d) => d !== "")
      for (let j = 0; j < distances.length; j++) {
        const distance = distances[j]
        raceTimesAndDistance[j].distance = parseInt(distance)
      }
    }
  }
  return raceTimesAndDistance
}
const getRaceTimesAndDistanceFromLinesNoSpaces = (lines) => {
  let raceTimesAndDistance = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes("Time")) {
      raceTimesAndDistance.push({
        time: parseInt(line.split(":")[1].replaceAll(" ", "")),
        distance: 0,
      })
    }

    if (line.includes("Distance")) {
      raceTimesAndDistance[0].distance = parseInt(line.split(":")[1].replaceAll(" ", ""))
    }
  }
  return raceTimesAndDistance
}

const getTotalOptionsOfWinningRacesFromLines = (lines) => {
  const raceTimesAndDistance = getRaceTimesAndDistanceFromLines(lines)
  return getNumOfWinningOptionsFromTimeAndDistanceArr(raceTimesAndDistance)
}
const getTotalOptionsOfWinningRacesFromLinesNoSpaces = (lines) => {
  const raceTimesAndDistance = getRaceTimesAndDistanceFromLinesNoSpaces(lines)
  return getNumOfWinningOptionsFromTimeAndDistanceArr(raceTimesAndDistance)
}
const getNumOfWinningOptionsFromTimeAndDistanceArr = (raceTimesAndDistance) => {
  let amountOfWinningOptionsPerRace = []
  for (let i = 0; i < raceTimesAndDistance.length; i++) {
    const { time, distance } = raceTimesAndDistance[i]
    amountOfWinningOptionsPerRace[i] = 0
    for (let j = 0; j < time; j++) {
      const totalMmInThisRun = (time - j) * j
      if (totalMmInThisRun > distance) {
        amountOfWinningOptionsPerRace[i]++
      }
    }
  }

  let totalOptionsMultiplied = 1
  for (let i = 0; i < amountOfWinningOptionsPerRace.length; i++) {
    const amountOfWinningOptions = amountOfWinningOptionsPerRace[i]
    totalOptionsMultiplied = totalOptionsMultiplied * amountOfWinningOptions
  }
  return totalOptionsMultiplied
}
// console.log("day 6 challenge 1: ", getTotalOptionsOfWinningRacesFromLines(lines))
// console.log("day 6 challenge 2: ", getTotalOptionsOfWinningRacesFromLinesNoSpaces(lines))

module.exports = {
  getTotalOptionsOfWinningRacesFromLines,
  getTotalOptionsOfWinningRacesFromLinesNoSpaces,
}

// i -> time preesd and mm/mil
// time-i -> time traviling
// distance-> record
// if time-i *i > distance -> record
