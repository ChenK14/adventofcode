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

// describe("Day 3", () => {
//     const testInput = [
//         '987654321111111',
//         '811111111111119',
//         '234234234234278',
//         '818181911112111',
//     ]
//     test("puzzle 1 test", () => {
//         expect(solvePuzzle1Day3(testInput, true)).toBe(357)
//     })
//     test("puzzle 1 forReal", () => {
//         expect(solvePuzzle1Day3(testInput, false)).toBe(16812)
//     })
//     test("puzzle 2 test", () => {
//         expect(solvePuzzle2Day3(testInput, true)).toBe(3121910778619)
//     })
//     test("puzzle 2 forReal", () => {
//         expect(solvePuzzle2Day3(testInput, false)).toBe(166345822896410)
//     })
// })

// describe("Day 4", () => {
//     const testInput = [
//         '..@@.@@@@.',
//         '@@@.@.@.@@',
//         '@@@@@.@.@@',
//         '@.@@@@..@.',
//         '@@.@@@@.@@',
//         '.@@@@@@@.@',
//         '.@.@.@.@@@',
//         '@.@@@.@@@@',
//         '.@@@@@@@@.',
//         '@.@.@@@.@.',
//     ]
// test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day4(testInput, true)).toBe(13)
// })
// test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day4(testInput, false)).toBe(1523)
// })
// test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day4(testInput, true)).toBe(43)
// })
// test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day4(testInput, false)).toBe(9290)
// })
// })

// describe("Day 5", () => {
//     const testInput = [
//         '3-5',
//         '10-14',
//         '16-20',
//         '12-18',
//         '',
//         '1',
//         '5',
//         '8',
//         '11',
//         '17',
//         '32',
//     ]
//       test("puzzle 1 test", () => {
//         expect(solvePuzzle1Day5(testInput, true)).toBe(3)
//       })
//        test("puzzle 1 forReal", () => {
//         expect(solvePuzzle1Day5(testInput,false)).toBe(828)
//       })
//     test("puzzle 2 test", () => {
//         expect(solvePuzzle2Day5(testInput, true)).toBe(14)
//     })
//     test("puzzle 2 forReal", () => {
//         expect(solvePuzzle2Day5(testInput, false)).toBe(352681648086146)
//     })
// })

// describe("Day 6", () => {
//     const testInput = [
//         '123 328  51 64 ',
//         ' 45 64  387 23 ',
//         '  6 98  215 314',
//         '*   +   *   + ',
//     ]
//     test("puzzle 1 test", () => {
//         expect(solvePuzzle1Day6(testInput, true)).toBe(4277556)
//     })
//        test("puzzle 1 forReal", () => {
//         expect(solvePuzzle1Day6(testInput,false)).toBe(6891729672676)
//       })
//     test("puzzle 2 test", () => {
//         expect(solvePuzzle2Day6(testInput, true)).toBe(3263827)
//     })
//     test("puzzle 2 forReal", () => {
//         expect(solvePuzzle2Day6(testInput, false)).toBe(9770311947567)
//     })
// })

// describe("Day 7", () => {
//   const testInput = [
//     '.......S.......',
//     '...............',
//     '.......^.......',
//     '...............',
//     '......^.^......',
//     '...............',
//     '.....^.^.^.....',
//     '...............',
//     '....^.^...^....',
//     '...............',
//     '...^.^...^.^...',
//     '...............',
//     '..^...^.....^..',
//     '...............',
//     '.^.^.^.^.^...^.',
//     '...............',
//   ]
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day7(testInput, true)).toBe(21)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day7(testInput,false)).toBe(1546)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day7(testInput, true)).toBe(40)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day7(testInput,false)).toBe(13883459503480)
//   })
// })

// describe("Day 8", () => {
//     const testInput = [
//         '162,817,812',
//         '57,618,57',
//         '906,360,560',
//         '592,479,940',
//         '352,342,300',
//         '466,668,158',
//         '542,29,236',
//         '431,825,988',
//         '739,650,466',
//         '52,470,668',
//         '216,146,977',
//         '819,987,18',
//         '117,168,530',
//         '805,96,715',
//         '346,949,466',
//         '970,615,88',
//         '941,993,340',
//         '862,61,35',
//         '984,92,344',
//         '425,690,689',
//     ]
//     test("puzzle 1 test", () => {
//         expect(solvePuzzle1Day8(testInput, true)).toBe(40)
//     })
//        test("puzzle 1 forReal", () => {
//         expect(solvePuzzle1Day8(testInput,false)).toBe(83520)
//       })
//       test("puzzle 2 test", () => {
//         expect(solvePuzzle2Day8(testInput, true)).toBe(25272)
//       })
//        test("puzzle 2 forReal", () => {
//         expect(solvePuzzle2Day8(testInput,false)).toBe(1131823407)
//       })
// })

// describe("Day 9", () => {
//   const testInput = [
//     '7,1',
//     '11,1',
//     '11,7',
//     '9,7',
//     '9,5',
//     '2,5',
//     '2,3',
//     '7,3',
//   ]
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day9(testInput, true)).toBe(50)
//   })
//    test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day9(testInput,false)).toBe(4777409595)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day9(testInput, true)).toBe(24)
//   })
//    test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day9(testInput,false)).toBe(1473551379)
//   })
// })

// describe("Day 10", () => {
//     const testInput = [
//         '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}',
//         '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}',
//         '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}',
//     ]
// test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day10(testInput, true)).toBe(7)
// })
// test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day10(testInput, false)).toBe(0)
// })
//     test("puzzle 2 test", () => {
//         expect(solvePuzzle2Day10(testInput, true)).toBe(33)
//     })
//     test("puzzle 2 forReal", () => {
//         expect(solvePuzzle2Day10(testInput, false)).toBe(18981)
//     })
// })

// describe("Day 11", () => {
//     const testInput = [
//         'aaa: you hhh',
//         'you: bbb ccc',
//         'bbb: ddd eee',
//         'ccc: ddd eee fff',
//         'ddd: ggg',
//         'eee: out',
//         'fff: out',
//         'ggg: out',
//         'hhh: ccc fff iii',
//         'iii: out',
//     ]
//     const testInput2 = [
//         'svr: aaa bbb',
//         'aaa: fft',
//         'fft: ccc',
//         'bbb: tty',
//         'tty: ccc',
//         'ccc: ddd eee',
//         'ddd: hub',
//         'hub: fff',
//         'eee: dac',
//         'dac: fff',
//         'fff: ggg hhh',
//         'ggg: out',
//         'hhh: out',
//     ]
//     test("puzzle 1 test", () => {
//         expect(solvePuzzle1Day11(testInput, true)).toBe(5)
//     })
//     test("puzzle 1 forReal", () => {
//         expect(solvePuzzle1Day11(testInput, false)).toBe(539)
//     })
//     test("puzzle 2 test", () => {
//         expect(solvePuzzle2Day11(testInput2, true)).toBe(2)
//     })
//     test("puzzle 2 forReal", () => {
//         expect(solvePuzzle2Day11(testInput2, false)).toBe(0)
//     })
// })

describe("Day 12", () => {
    const testInput = [
        '0:',
        '###',
        '##.',
        '##.',
        '',
        '1:',
        '###',
        '##.',
        '.##',
        '',
        '2:',
        '.##',
        '###',
        '##.',
        '',
        '3:',
        '##.',
        '###',
        '##.',
        '',
        '4:',
        '###',
        '#..',
        '###',
        '',
        '5:',
        '###',
        '.#.',
        '###',
        '',
        '4x4: 0 0 0 0 2 0',
        '12x5: 1 0 1 0 2 2',
        '12x5: 1 0 1 0 3 2',
    ]
    test("puzzle 1 test", () => {
        expect(solvePuzzle1Day12(testInput, true)).toBe(2)
    })
    test("puzzle 1 forReal", () => {
        expect(solvePuzzle1Day12(testInput, false)).toBe(587)
    })
})
