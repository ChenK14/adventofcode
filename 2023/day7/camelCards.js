const getLinesFromPath = require("../index")

const lines = getLinesFromPath("day7/input.txt")

const cardToNumberMap = (card, withJoker) => {
  switch (card) {
    case "A":
      return 14
    case "K":
      return 13
    case "Q":
      return 12
    case "J":
      return withJoker ? 1 : 11
    case "T":
      return 10
    default:
      return Number(card)
  }
}

// Multiply bid by the hand rank, meaning if sorted by strength (weakest to strongest) the result is bid *(i+1)
const getHandRank = (hand, withJoker = false) => {
  let marksCount = []
  for (let i = 0; i < hand.length; i++) {
    const card = cardToNumberMap(`${hand}`[i], withJoker)
    let found = false
    for (let j = 0; j < marksCount.length; j++) {
      if (marksCount[j].card === card) {
        marksCount[j].count++
        found = true
        break
      }
    }
    if (!found) {
      marksCount.push({ card, count: 1 })
    }
  }

  let handTempRank = 1
  for (let i = 0; i < marksCount.length; i++) {
    handTempRank *= marksCount[i].count
  }

  // Five of a kind 0
  // Four of a kind 1
  // Full house 2
  // Three of a kind 3
  // Two pair 4
  // One pair  5
  // High card 6
  switch (handTempRank) {
    case 1:
      // HIGH CARD
      return 6
    case 2:
      // ONE PAIR
      return 5
    case 3:
      // Three of a kind
      return 3
    case 4:
      // NEED TO HANDLE CASE WHERE THERE ARE 2 PAIRS OR 4 OF A KIND
      return marksCount.length === 2 ? 1 : 4
    case 5:
      // Five of a kind
      return 0
    case 6:
      // Full house
      return 2
  }
}

const getHandsAndBidsFromLines = (lines) => {
  const handsAndBids = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    handsAndBids.push({
      hand: line.split(" ")[0],
      bid: line.split(" ")[1],
    })
  }
  return handsAndBids
}

const getCamelCardsWinningsFromLines = (lines) => {
  const handsAndBids = getHandsAndBidsFromLines(lines)
  const handsAndBidsWithWinningsWithRanks = []
  for (let i = 0; i < handsAndBids.length; i++) {
    const { hand, bid } = handsAndBids[i]

    const rank = getHandRank(hand)

    handsAndBidsWithWinningsWithRanks.push({ hand, bid, rank })
  }
  handsAndBidsWithWinningsWithRanks.sort((a, b) => {
    if (a.rank === b.rank) {
      for (let i = 0; i < `${a.hand}`.length; i++) {
        const aCard = cardToNumberMap(`${a.hand}`[i])
        const bCard = cardToNumberMap(`${b.hand}`[i])
        if (aCard === bCard) {
          continue
        }
        return aCard - bCard
      }
    }
    return b.rank - a.rank
  })

  let winnings = 0
  for (let i = 0; i < handsAndBidsWithWinningsWithRanks.length; i++) {
    const { bid } = handsAndBidsWithWinningsWithRanks[i]
    winnings += bid * (i + 1)
  }
  return winnings
}

const getCamelCardsWinningsFromLinesWithJoker = (lines) => {
  const jokerOptions = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
  const handsAndBids = getHandsAndBidsFromLines(lines)
  const handsAndBidsWithWinningsWithRanks = []
  for (let i = 0; i < handsAndBids.length; i++) {
    const { hand, bid } = handsAndBids[i]
    let handToCalcRank = hand
    let bestRank = 10
    for (let j = 0; j < jokerOptions.length; j++) {
      handToCalcRank = hand.replaceAll("J", jokerOptions[j])
      const rank = getHandRank(handToCalcRank, true)
      if (rank < bestRank) {
        bestRank = rank
      }
    }
    handsAndBidsWithWinningsWithRanks.push({ hand, bid, rank: bestRank })
  }

  handsAndBidsWithWinningsWithRanks.sort((a, b) => {
    if (a.rank === b.rank) {
      for (let i = 0; i < `${a.hand}`.length; i++) {
        const aCard = cardToNumberMap(`${a.hand}`[i], true)
        const bCard = cardToNumberMap(`${b.hand}`[i], true)
        if (aCard === bCard) {
          continue
        }
        return aCard - bCard
      }
    }
    return b.rank - a.rank
  })

  let winnings = 0
  for (let i = 0; i < handsAndBidsWithWinningsWithRanks.length; i++) {
    const { bid } = handsAndBidsWithWinningsWithRanks[i]
    winnings += bid * (i + 1)
  }
  return winnings
}

// console.log("day 7 challenge 1: ", getCamelCardsWinningsFromLines(lines), "SHOULD BE : 248217452")
// console.log("day 7 challenge 2: ", getCamelCardsWinningsFromLinesWithJoker(lines))
module.exports = { getCamelCardsWinningsFromLines, getCamelCardsWinningsFromLinesWithJoker }
