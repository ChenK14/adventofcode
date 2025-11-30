const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day4/input.txt")

const getGamesFromLines = (lines) => {
  let games = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const game = line.split(":")[1].split("|")
    games[i] = {
      winningNumbers: game[0]
        .trim()
        .split(" ")
        .filter((n) => n !== ""),
      numbers: game[1]
        .trim()
        .split(" ")
        .filter((n) => n !== ""),
    }
  }
  return games
}

const getPointsSumFromLines = (lines) => {
  const games = getGamesFromLines(lines)
  let sumWinnings = 0
  for (let i = 0; i < games.length; i++) {
    let gameWinnings = 0
    for (let j = 0; j < games[i].winningNumbers.length; j++) {
      if (games[i].numbers.includes(games[i].winningNumbers[j])) {
        gameWinnings = gameWinnings === 0 ? 1 : gameWinnings * 2
      }
    }
    sumWinnings += gameWinnings
  }
  return sumWinnings
}

const getGamesAndWinningsFromLines = (lines) => {
  const games = getGamesFromLines(lines)
  let gamesAndWinningsTable = []
  let numOfTotalCards = 0
  for (let i = 0; i < games.length; i++) {
    let gameWinnings = 0
    for (let j = 0; j < games[i].winningNumbers.length; j++) {
      if (games[i].numbers.includes(games[i].winningNumbers[j])) {
        gameWinnings++
      }
    }
    gamesAndWinningsTable[i] = gameWinnings
  }

  let gamesAndHowManyTimesToPlay = []
  for (let i = 0; i < games.length; i++) {
    gamesAndHowManyTimesToPlay[i] = 1
  } // index is game number, value is how many times it was played
  for (let i = 0; i < gamesAndWinningsTable.length; i++) {
    // i is the number of game
    for (let k = 0; k < gamesAndHowManyTimesToPlay[i]; k++) {
      const gameWinnings = gamesAndWinningsTable[i]
      for (let j = 0; j < gameWinnings; j++) {
        gamesAndHowManyTimesToPlay[i + j + 1]++
      }
    }
  }

  for (let i = 0; i < gamesAndHowManyTimesToPlay.length; i++) {
    numOfTotalCards += gamesAndHowManyTimesToPlay[i]
  }
  return numOfTotalCards
}

// console.log("day 4 challenge 1: ", getPointsSumFromLines(lines));
// console.log("day 4 challenge 2: ", getGamesAndWinningsFromLines(lines));

module.exports = { getPointsSumFromLines, getGamesAndWinningsFromLines }
