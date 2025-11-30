const calculateLinesSummery = require("./day1/outputCalcolator")
const {
  getPossibleGamesIdsSumFromLines,
  getMinNumOfCubesFromLines,
} = require("./day2/gameCalculator")
const { getSumOfPartsFromLines, getGearsRatioFromLines } = require("./day3/enginePartsFinder")
const {
  getPointsSumFromLines,
  getGamesAndWinningsFromLines,
} = require("./day4/scratchCardResolver")
const {
  getMinLocationBySeedFromLines,
  getMinLocationBySeedFromLinesByRange,
} = require("./day5/locationBySeedCalculation")
const {
  getTotalOptionsOfWinningRacesFromLines,
  getTotalOptionsOfWinningRacesFromLinesNoSpaces,
} = require("./day6/raceTimeAndDistance")
const {
  getCamelCardsWinningsFromLines,
  getCamelCardsWinningsFromLinesWithJoker,
} = require("./day7/camelCards")
const { getNumOfSteps, getNumOfStepsSimultan } = require("./day8/followTheinstructions")
const { getPredictionSummery, getHistorySummery } = require("./day9/envAnalyzer")
const { getFarthestPipe } = require("./day10/pipeJumper")

// describe("Day 1", () => {
//   test("test", () => {
//     const test = [
//       "two1nine", // should be 29
//       "eightwothree", // should be 83
//       "abcone2threexyz", // should be 13
//       "xtwone3four", // should be 24
//       "4nineeightseven2", // should be 42
//       "zoneight234", // should be 14
//       "7pqrstsixteen", // should be 76
//     ]

//     expect(calculateLinesSummery([`${test[0]}`], true)).toBe(29)
//     expect(calculateLinesSummery([`${test[1]}`], true)).toBe(83)
//     expect(calculateLinesSummery([`${test[2]}`], true)).toBe(13)
//     expect(calculateLinesSummery([`${test[3]}`], true)).toBe(24)
//     expect(calculateLinesSummery([`${test[4]}`], true)).toBe(42)
//     expect(calculateLinesSummery([`${test[5]}`], true)).toBe(14)
//     expect(calculateLinesSummery([`${test[6]}`], true)).toBe(76)

//     expect(calculateLinesSummery(test, true)).toBe(281)
//   })
// })

// describe("Day 2", () => {
//   test("test", () => {
//     const input = [
//       "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
//       "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
//       "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
//       "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
//       "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
//     ]

//     expect(getPossibleGamesIdsSumFromLines(input)).toEqual(8)

//     expect(getMinNumOfCubesFromLines(input)).toEqual(2286)
//   })
// })

// describe("Day 3", () => {
//   test("test", () => {
//     const input = [
//       "467..114..",
//       "...*......",
//       "..35..633.",
//       "......#...",
//       "617*......",
//       ".....+.58.",
//       "..592.....",
//       "......755.",
//       "...$.*....",
//       ".664.598..",
//     ]

//     expect(getSumOfPartsFromLines(input)).toEqual(4361)
//   })
//   test("test", () => {
//     const input = [
//       "......644............612......",
//       ".....*......321..176....+.....",
//       "...939.@225........*..........",
//       "............470.128...288...+.",
//       ".........................*.176",
//       ".688.......469&...=....284....",
//       "...*....#..........197........",
//       "....537.900...................",
//       "...............908............",
//     ]

//     expect(getSumOfPartsFromLines(input)).toEqual(6263)
//   })

//   test.each([
//     {
//       input: [`.9.`],
//       expected: 0,
//     },
//     {
//       input: [`$9.`],
//       expected: 9,
//     },
//     {
//       input: [`.9$`],
//       expected: 9,
//     },
//     {
//       input: [`9$.`],
//       expected: 9,
//     },
//     {
//       input: [`9.$`],
//       expected: 0,
//     },
//     {
//       input: [`$.9`],
//       expected: 0,
//     },
//     {
//       input: [`9..9`],
//       expected: 0,
//     },
//     {
//       input: [`9$.9`],
//       expected: 9,
//     },
//     {
//       input: [`9..9`, `*..*`],
//       expected: 18,
//     },
//   ])("edge cases", ({ input, expected }) => {
//     expect(getSumOfPartsFromLines(input)).toEqual(expected)
//   })

//   test("challenge 2", () => {
//     const input = [
//       "467..114..",
//       "...*......",
//       "..35..633.",
//       "......#...",
//       "617*......",
//       ".....+.58.",
//       "..592.....",
//       "......755.",
//       "...$.*....",
//       ".664.598..",
//     ]

//     expect(getGearsRatioFromLines(input)).toEqual(467835)
//   })

//   test.each([
//     {
//       input: [".9.", "9*9", ".9."],
//       expected: 0,
//     },
//     {
//       input: [".9.", ".*9", ".9."],
//       expected: 0,
//     },
//     {
//       input: [".9.", "9*.", ".9."],
//       expected: 0,
//     },
//     {
//       input: [".9.", ".*.", ".9."],
//       expected: 81,
//     },
//     {
//       input: ["...", "9*9", ".9."],
//       expected: 0,
//     },
//     {
//       input: [".9.", ".*9", "..."],
//       expected: 81,
//     },
//     {
//       input: ["...", "9*9", "..."],
//       expected: 81,
//     },
//     {
//       input: ["9..", ".*9", "..."],
//       expected: 81,
//     },
//     {
//       input: ["9*.", ".*9", "..."],
//       expected: 162,
//     },
//     {
//       input: ["1.1", "***", "1.1"],
//       expected: 2,
//     },
//   ])("edge cases", ({ input, expected }) => {
//     expect(getGearsRatioFromLines(input)).toEqual(expected)
//   })
// })

// describe("Day 4", () => {
//   const givenInput = [
//     "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
//     "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
//     "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
//     "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
//     "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
//     "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
//   ]

//   describe("challenge 1", () => {
//     test("given example", () => {
//       expect(getPointsSumFromLines(givenInput)).toEqual(13)
//     })
//     test.each([
//       ["Card 1: 41 48 83 86 17 | 41 41 41 41 41 41 41", 128],
//       ["Card 1: 41 48 83 86 17 | 28 28 28 28 28 28 28", 0],
//     ])("edge cases", () => {})
//   })
//   describe("challenge 2", () => {
//     test("given example", () => {
//       expect(getGamesAndWinningsFromLines(givenInput)).toEqual(30)
//     })
//   })
// })
// describe("Day 5", () => {
//   const givenInput = [
//     "seeds: 79 14 55 13",
//     "",
//     "seed-to-soil map:",
//     "50 98 2",
//     "52 50 48",
//     "",
//     "soil-to-fertilizer map:",
//     "0 15 37",
//     "37 52 2",
//     "39 0 15",
//     "",
//     "fertilizer-to-water map:",
//     "49 53 8",
//     "0 11 42",
//     "42 0 7",
//     "57 7 4",
//     "",
//     "water-to-light map:",
//     "88 18 7",
//     "18 25 70",
//     "",
//     "light-to-temperature map:",
//     "45 77 23",
//     "81 45 19",
//     "68 64 13",
//     "",
//     "temperature-to-humidity map:",
//     "0 69 1",
//     "1 0 69",
//     "",
//     "humidity-to-location map:",
//     "60 56 37",
//     "56 93 4",
//   ]

//   describe("challenge 1", () => {
//     test("given example", () => {
//       expect(getMinLocationBySeedFromLines(givenInput)).toEqual(35)
//     })
//   })
//   describe("challenge 2", () => {
//     test("given example", () => {
//       expect(getMinLocationBySeedFromLinesByRange(givenInput)).toEqual(46)
//     })
//   })
// })
// describe("Day 6", () => {
//   const givenInput = ["Time:      7  15   30", "Distance:  9  40  200"]

//   describe("challenge 1", () => {
//     test("given example", () => {
//       expect(getTotalOptionsOfWinningRacesFromLines(givenInput)).toEqual(288)
//     })
//   })
//   describe("challenge 2", () => {
//     test("given example", () => {
//       expect(getTotalOptionsOfWinningRacesFromLinesNoSpaces(givenInput)).toEqual(71503)
//     })
//   })
// })
// describe("Day 7", () => {
//   const givenInput = ["32T3K 765", "T55J5 684", "KK677 28", "KTJJT 220", "QQQJA 483"]

//   describe("challenge 1", () => {
//     test("given example", () => {
//       expect(getCamelCardsWinningsFromLines(givenInput)).toEqual(6440)
//     })
//   })
//   describe("challenge 2", () => {
//     test("given example", () => {
//       expect(getCamelCardsWinningsFromLinesWithJoker(givenInput)).toEqual(5905)
//     })
//     test.each([
//       {
//         input: ["JJJKT 5", "22JJQ 2"],
//         expected: 9, // (5 * 1) + (2 * 2)
//       },
//       {
//         input: ["999J2 5", "888Q7 2"],
//         expected: 12, // (5 * 1) + (2 * 2)
//       },
//       {
//         input: ["J9876 5", "T5432 2"],
//         expected: 12, // (5 * 2) + (2 * 1)
//       },
//       {
//         input: ["JJJ22 5", "333J2 2"],
//         expected: 12, // (5 * 2) + (2 * 1)
//       },
//       {
//         input: ["JQKTA 5", "98765 2"], // PAIR
//         expected: 12, // (5 * 1) + (2 * 2)
//       },
//     ])("edge cases", ({ input, expected }) => {
//       expect(getCamelCardsWinningsFromLinesWithJoker(input)).toEqual(expected)
//     })
//   })
// })

// describe("Day 8", () => {
//   // const givenInput1 = [
//   //   "RL",

//   //   "AAA = (BBB, CCC)",
//   //   "BBB = (DDD, EEE)",
//   //   "CCC = (ZZZ, GGG)",
//   //   "DDD = (DDD, DDD)",
//   //   "EEE = (EEE, EEE)",
//   //   "GGG = (GGG, GGG)",
//   //   "ZZZ = (ZZZ, ZZZ)",
//   // ]
//   // const givenInput2 = ["LLR", "AAA = (BBB, BBB)", "BBB = (AAA, ZZZ)", "ZZZ = (ZZZ, ZZZ)"]
//   // test("given example", () => {
//   //   expect(getNumOfSteps(givenInput1)).toEqual(2)
//   //   expect(getNumOfSteps(givenInput2)).toEqual(6)
//   // })

//   const givenExampleofChallenge2 = [
//     "LR",
//     "11A = (11B, XXX)",
//     "11B = (XXX, 11Z)",
//     "11Z = (11B, XXX)",
//     "22A = (22B, XXX)",
//     "22B = (22C, 22C)",
//     "22C = (22Z, 22Z)",
//     "22Z = (22B, 22B)",
//     "XXX = (XXX, XXX)",
//   ]

//   test("challenge 2", () => {
//     expect(getNumOfStepsSimultan(givenExampleofChallenge2)).toEqual(6)
//   })

//   test("basic scenario", () => {
//     const basicGraph = [
//       "LR",
//       "1A = (1B, 1C)",
//       "1B = (1Z, 1D)",
//       "1C = (1D, 1E)",
//       "1D = (1E, 1Z)",
//       "1E = (1F, 1G)",
//       "1F = (1H, 1Z)",
//       "1G = (1Z, 1H)",
//       "1H = (1Z, 1Z)",
//       "1Z = (1Z, 1Z)",
//     ]
//     expect(getNumOfStepsSimultan(basicGraph)).toEqual(5) // Expected steps to reach 'Z'
//   })

//   test("looping required", () => {
//     const loopingGraph = ["RLR", "2A = (2B, 2C)", "2B = (2A, 2C)", "2C = (2B, 2Z)", "2Z = (2Z, 2Z)"]
//     expect(getNumOfStepsSimultan(loopingGraph)).toEqual(4) // Expected steps including loops
//   })

//   test("multiple 'A' starting nodes", () => {
//     const multipleStarts = [
//       "LR",
//       "3A = (3B, 3C)",
//       "4A = (4B, 4C)",
//       "3B = (3Z, 3D)",
//       "4B = (4D, 4Z)",
//       "3C = (3D, 3E)",
//       "4C = (4E, 4D)",
//       "3D = (3E, 3Z)",
//       "4D = (4Z, 4E)",
//       "3E = (3F, 3G)",
//       "4E = (4G, 4F)",
//       "3F = (3Z, 3G)",
//       "4F = (4G, 4Z)",
//       "3G = (3Z, 3Z)",
//       "4G = (4Z, 4Z)",
//       "3Z = (3Z, 3Z)",
//       "4Z = (4Z, 4Z)",
//     ]

//     expect(getNumOfStepsSimultan(multipleStarts)).toEqual(5) // Expected steps for multiple starts
//   })

//   test("long path to 'Z'", () => {
//     const longPath = [
//       "LRLR",
//       "5A = (5B, 5C)",
//       "5B = (5C, 5D)",
//       "5C = (5D, 5E)",
//       "5D = (5E, 5F)",
//       "5E = (5F, 5Z)",
//       "5F = (5E, 5Z)",
//       "5Z = (5Z, 5Z)",
//     ]
//     expect(getNumOfStepsSimultan(longPath)).toEqual(4) // Expected steps for a longer path
//   })

//   test("multiple paths to 'Z'", () => {
//     const multiplePaths = [
//       "RLRL",
//       "6A = (6B, 6C)",
//       "6B = (6Z, 6D)",
//       "6C = (6D, 6E)",
//       "6D = (6E, 6Z)",
//       "6E = (6Z, 6F)",
//       "6F = (6E, 6Z)",
//       "6Z = (6Z, 6Z)",
//     ]
//     expect(getNumOfStepsSimultan(multiplePaths)).toEqual(3) // Expected steps for multiple paths
//   })
//   const multipleAsShortestPath = [
//     "LR",
//     "7A = (7Z, 7B)",
//     "8A = (8Z, 8C)",
//     "7B = (7B, 7Z)",
//     "8C = (8C, 8Z)",
//     "7Z = (7Z, 7Z)",
//     "8Z = (8Z, 8Z)",
//   ]

//   test("multiple 'A's with shortest path", () => {
//     expect(getNumOfStepsSimultan(multipleAsShortestPath)).toEqual(1)
//   })

//   const multipleAsDifferentPaths = [
//     "RL",
//     "9A = (9B, 9C)",
//     "10A = (10D, 10E)",
//     "9B = (9D, 9C)", // 'R' leads to 9C
//     "10D = (10E, 10F)", // 'R' leads to 10E
//     "9C = (9E, 9D)", // 'L' leads to 9E
//     "10E = (10F, 10Z)", // 'L' leads to 10F
//     "9D = (9F, 9E)", // 'R' leads to 9E
//     "10F = (10H, 10G)", // 'R' leads to 10H
//     "9E = (9G, 9F)", // 'L' leads to 9G
//     "10G = (10I, 10H)", // 'L' leads to 10I
//     "9F = (9Z, 9G)", // 'R' leads to 9G
//     "10H = (10I, 10Z)", // 'R' leads to 10I
//     "9G = (9Z, 9Z)", // 'L' leads to 9Z
//     "10I = (10Z, 10Z)", // 'R' leads to 10Z
//     "9Z = (9Z, 9Z)",
//     "10Z = (10Z, 10Z)",
//   ]

//   test("multiple 'A's with different paths", () => {
//     expect(getNumOfStepsSimultan(multipleAsDifferentPaths)).toEqual(5)
//   })

//   const multipleAsOverlappingPaths = [
//     "LR",
//     "11A = (11B, 11C)",
//     "12A = (12C, 12B)",
//     "11B = (11D, 11Z)", // 'L' leads to 11D, 'R' directly to 11Z
//     "12B = (12Z, 12D)", // 'L' directly to 12Z, 'R' to 12D
//     "11C = (11E, 11D)", // 'L' leads to 11E
//     "12C = (12E, 12D)", // 'R' leads to 12D
//     "11D = (11E, 11F)", // 'R' leads to 11F
//     "12D = (12E, 12F)", // 'L' leads to 12E
//     "11E = (11G, 11F)", // 'L' leads to 11G
//     "12E = (12G, 12F)", // 'R' leads to 12G
//     "11F = (11H, 11Z)", // 'R' leads to 11H
//     "12F = (12H, 12Z)", // 'L' leads to 12H
//     "11G = (11Z, 11H)", // 'L' leads to 11Z
//     "12G = (12H, 12Z)", // 'R' leads to 12H
//     "11H = (11I, 11Z)", // 'L' leads to 11I
//     "12H = (12I, 12Z)", // 'L' leads to 12I
//     "11I = (11J, 11J)",
//     "12I = (12J, 12J)",
//     "11J = (11Z, 11Z)",
//     "12J = (12Z, 12Z)",
//     "11Z = (11Z, 11Z)",
//     "12Z = (12Z, 12Z)",
//   ]

//   test("multiple 'A's with overlapping paths", () => {
//     expect(getNumOfStepsSimultan(multipleAsOverlappingPaths)).toEqual(6)
//   })
// })

// describe("Day 9", () => {
//   const givenInput = ["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"]

//   describe("challenge 1", () => {
//     test("given example", () => {
//       expect(getPredictionSummery(givenInput)).toEqual(114)
//     })
//   })
//   describe("challenge 2", () => {
//     test("given example", () => {
//       expect(getHistorySummery(givenInput)).toEqual(2)
//     })
//   })
// })
describe("Day 10", () => {
  const givenInput = [".....", ".S-7.", ".|.|.", ".L-J.", "....."]
  const givenInput2 = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."]

  describe("challenge 1", () => {
    test("given example", () => {
      expect(getFarthestPipe(givenInput)).toEqual(4)
    })
    test("given example", () => {
      expect(getFarthestPipe(givenInput2)).toEqual(8)
    })
  })
  // describe("challenge 2", () => {
  //   test("given example", () => {
  //     expect(getHistorySummery(givenInput)).toEqual(2)
  //   })
  // })
})
