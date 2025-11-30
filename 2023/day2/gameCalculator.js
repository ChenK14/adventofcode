const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day2/input.txt")

const POSSIBLE_VALUES = { red: 12, green: 13, blue: 14 }

const getGamesFromLines = (lines) => {
  const games = []
  for (let i = 0; i < lines.length; i++) {
    const game = lines[i].split(":")[1].replaceAll(";", ",")
    games.push(game)
  }
  return games
}

const getPossibleGamesIdsSumFromLines = (lines) => {
  let gamesIdsSum = 0
  const games = getGamesFromLines(lines)
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    const withdraws = game.split(",")
    let possibleGame = true
    for (let j = 0; j < withdraws.length; j++) {
      const withdraw = withdraws[j].trim().split(" ")
      const color = withdraw[1]
      const value = parseInt(withdraw[0])
      if (POSSIBLE_VALUES[color] && value > POSSIBLE_VALUES[color]) {
        possibleGame = false
        break
      }
    }
    if (possibleGame) {
      gamesIdsSum += i + 1
    }
  }

  return gamesIdsSum
}

const getMinNumOfCubesFromLines = (lines) => {
  const games = getGamesFromLines(lines)
  let sumOfPowerOfMins = 0
  for (let i = 0; i < games.length; i++) {
    const game = games[i]
    let minRed = 0
    let minGreen = 0
    let minBlue = 0
    const withdraws = game.split(",")
    for (let j = 0; j < withdraws.length; j++) {
      const withdraw = withdraws[j].trim().split(" ")
      const color = withdraw[1]
      const value = parseInt(withdraw[0])
      if (color === "red" && value > minRed) {
        minRed = value
      } else if (color === "green" && value > minGreen) {
        minGreen = value
      } else if (color === "blue" && value > minBlue) {
        minBlue = value
      }
    }
    sumOfPowerOfMins += minRed * minBlue * minGreen
  }
  return sumOfPowerOfMins
}

// console.log("challenge 1:", getPossibleGamesIdsSumFromLines(lines));
// console.log("challenge 2:", getMinNumOfCubesFromLines(lines));
module.exports = { getPossibleGamesIdsSumFromLines, getMinNumOfCubesFromLines }
