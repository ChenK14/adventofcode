const { solvePuzzle1: solvePuzzle1Day1, solvePuzzle2: solvePuzzle2Day1 } = require('./day1/day1')
const { solvePuzzle1: solvePuzzle1Day2, solvePuzzle2: solvePuzzle2Day2 } = require('./day2/day2')
const { solvePuzzle1: solvePuzzle1Day3, solvePuzzle2: solvePuzzle2Day3 } = require('./day3/day3')
const { solvePuzzle1: solvePuzzle1Day4, solvePuzzle2: solvePuzzle2Day4 } = require('./day4/day4')
const { solvePuzzle1: solvePuzzle1Day5, solvePuzzle2: solvePuzzle2Day5 } = require('./day5/day5')
const { solvePuzzle1: solvePuzzle1Day6, solvePuzzle2: solvePuzzle2Day6 } = require('./day6/day6')
const { solvePuzzle1: solvePuzzle1Day7, solvePuzzle2: solvePuzzle2Day7 } = require('./day7/day7')
const { solvePuzzle1: solvePuzzle1Day8, solvePuzzle2: solvePuzzle2Day8 } = require('./day8/day8')
const { solvePuzzle1: solvePuzzle1Day9, solvePuzzle2: solvePuzzle2Day9 } = require('./day9/day9')
const { solvePuzzle1: solvePuzzle1Day10, solvePuzzle2: solvePuzzle2Day10 } = require('./day10/day10')
const { solvePuzzle1: solvePuzzle1Day11, solvePuzzle2: solvePuzzle2Day11 } = require('./day11/day11')
const { solvePuzzle1: solvePuzzle1Day12, solvePuzzle2: solvePuzzle2Day12 } = require('./day12/day12')

// describe("Day 1", () => {
//     const testInput = [
//         'L68',
//         'L30',
//         'R48',
//         'L5',
//         'R60',
//         'L55',
//         'L1',
//         'L99',
//         'R14',
//         'L82',
//     ]
//     test("puzzle 1 test", () => {
//         expect(solvePuzzle1Day1(testInput, true)).toBe(3)
//     })
//     test("puzzle 1 forReal", () => {
//         expect(solvePuzzle1Day1(testInput, false)).toBe(1092)
//     })
//     test("puzzle 2 test", () => {
//         expect(solvePuzzle2Day1(testInput, true)).toBe(6)
//     })
//     test("puzzle 2 forReal", () => {
//         expect(solvePuzzle2Day1(testInput, false)).toBe(6616)
//     })
// })

// describe("Day 2", () => {
//         const testInput = [
//             '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124'
//         ]
// test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day2(testInput, true)).toBe(1227775554)
// })
// test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day2(testInput, false)).toBe(12586854255)
// })
// test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day2(testInput, true)).toBe(4174379265)
// })
// test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day2(testInput, false)).toBe(17298174201)
// })
// })

describe("Day 3", () => {
    const testInput = [
        '987654321111111',
        '811111111111119',
        '234234234234278',
        '818181911112111',
    ]
    test("puzzle 1 test", () => {
        expect(solvePuzzle1Day3(testInput, true)).toBe(357)
    })
    test("puzzle 1 forReal", () => {
        expect(solvePuzzle1Day3(testInput, false)).toBe(16812)
    })
    test("puzzle 2 test", () => {
        expect(solvePuzzle2Day3(testInput, true)).toBe(3121910778619)
    })
    test("puzzle 2 forReal", () => {
        expect(solvePuzzle2Day3(testInput, false)).toBe(166345822896410)
    })
})

// describe("Day 4", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day4(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day4(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day4(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day4(testInput,false)).toBe(0)
//   })
// })

// describe("Day 5", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day5(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day5(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day5(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day5(testInput,false)).toBe(0)
//   })
// })

// describe("Day 6", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day6(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day6(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day6(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day6(testInput,false)).toBe(0)
//   })
// })

// describe("Day 7", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day7(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day7(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day7(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day7(testInput,false)).toBe(0)
//   })
// })

// describe("Day 8", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day8(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day8(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day8(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day8(testInput,false)).toBe(0)
//   })
// })

// describe("Day 9", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day9(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day9(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day9(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day9(testInput,false)).toBe(0)
//   })
// })

// describe("Day 10", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day10(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day10(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day10(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day10(testInput,false)).toBe(0)
//   })
// })

// describe("Day 11", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day11(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day11(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day11(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day11(testInput,false)).toBe(0)
//   })
// })

// describe("Day 12", () => {
//   const testInput = []
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day12(testInput, true)).toBe(0)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day12(testInput,false)).toBe(0)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day12(testInput, true)).toBe(0)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day12(testInput,false)).toBe(0)
//   })
// })
