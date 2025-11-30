const { solvePuzzle1: solvePuzzle1Day1, solvePuzzle2: solvePuzzle2Day1 } = require('./day1/day1')
const { solvePuzzle1: solvePuzzle1Day2, solvePuzzle2: solvePuzzle2Day2 } = require('./day2/day2')
const { solvePuzzle1: solvePuzzle1Day3, solvePuzzle2: solvePuzzle2Day3 } = require('./day3/day3')
const { solvePuzzle1: solvePuzzle1Day4, solvePuzzle2: solvePuzzle2Day4 } = require('./day4/day4')
// const { solvePuzzle1: solvePuzzle1Day5, solvePuzzle2: solvePuzzle2Day5 } = require('./day5/day5')
const { solvePuzzle1: solvePuzzle1Day6, solvePuzzle2: solvePuzzle2Day6 } = require('./day6/day6')
const { solvePuzzle1: solvePuzzle1Day7, solvePuzzle2: solvePuzzle2Day7 } = require('./day7/day7')
const { solvePuzzle1: solvePuzzle1Day8, solvePuzzle2: solvePuzzle2Day8 } = require('./day8/day8')
const { solvePuzzle1: solvePuzzle1Day9, solvePuzzle2: solvePuzzle2Day9 } = require('./day9/day9')
const { solvePuzzle1: solvePuzzle1Day10, solvePuzzle2: solvePuzzle2Day10 } = require('./day10/day10')
const { solvePuzzle1: solvePuzzle1Day11, solvePuzzle2: solvePuzzle2Day11 } = require('./day11/day11')
const { solvePuzzle1: solvePuzzle1Day12, solvePuzzle2: solvePuzzle2Day12 } = require('./day12/day12')
const { solvePuzzle1: solvePuzzle1Day13, solvePuzzle2: solvePuzzle2Day13 } = require('./day13/day13')
const { solvePuzzle1: solvePuzzle1Day14, solvePuzzle2: solvePuzzle2Day14 } = require('./day14/day14')
const { solvePuzzle1: solvePuzzle1Day15, solvePuzzle2: solvePuzzle2Day15 } = require('./day15/day15')
const { solvePuzzle1: solvePuzzle1Day16, solvePuzzle2: solvePuzzle2Day16 } = require('./day16/day16')
const { solvePuzzle1: solvePuzzle1Day17, solvePuzzle2: solvePuzzle2Day17 } = require('./day17/day17')
const { solvePuzzle1: solvePuzzle1Day18, solvePuzzle2: solvePuzzle2Day18 } = require('./day18/day18')
const { solvePuzzle1: solvePuzzle1Day19, solvePuzzle2: solvePuzzle2Day19 } = require('./day19/day19')
const { solvePuzzle1: solvePuzzle1Day20, solvePuzzle2: solvePuzzle2Day20 } = require('./day20/day20')
const { solvePuzzle1: solvePuzzle1Day21, solvePuzzle2: solvePuzzle2Day21 } = require('./day21/day21')
const { solvePuzzle1: solvePuzzle1Day22, solvePuzzle2: solvePuzzle2Day22 } = require('./day22/day22')
const { solvePuzzle1: solvePuzzle1Day23, solvePuzzle2: solvePuzzle2Day23 } = require('./day23/day23')
const { solvePuzzle1: solvePuzzle1Day24, solvePuzzle2: solvePuzzle2Day24 } = require('./day24/day24')
const { solvePuzzle1: solvePuzzle1Day25, solvePuzzle2: solvePuzzle2Day25 } = require('./day25/day25')

// describe("Day 1", () => {
//   const testInput = ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"]
//   test("puzzle 1 test", () => {

//     expect(solvePuzzle1Day1(testInput, true)).toBe(11)
//   })
//    test("puzzle 1 forReal", () => {

//     expect(solvePuzzle1Day1(testInput,false)).toBe(2285373)
//   })
//   test("puzzle 2 test", () => {

//     expect(solvePuzzle2Day1(testInput, true)).toBe(31)
//   })
//    test("puzzle 2 forReal", () => {

//     expect(solvePuzzle2Day1(testInput,false)).toBe(0)
//   })
// })

// describe("Day 2", () => {
//   const testInput = [
//     '7 6 4 2 1',
//     '1 2 7 8 9',
//     '9 7 6 2 1',
//     '1 3 2 4 5',
//     '8 6 4 4 1',
//     '1 3 6 7 9',
//         ]
//   test("puzzle 1 test", () => {

//     expect(solvePuzzle1Day2(testInput, true)).toBe(2)
//   })
//    test("puzzle 1 forReal", () => {

//     expect(solvePuzzle1Day2(testInput,false)).toBe(326)
//   })
//   test("puzzle 2 test", () => {

//     expect(solvePuzzle2Day2(testInput, true)).toBe(4)
//   })
//    test("puzzle 2 forReal", () => {

//     expect(solvePuzzle2Day2(testInput,false)).toBe(0)
//   })
// })

// describe("Day 3", () => {
//   const testInput = [
//    'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))'
//         ]
//   test("puzzle 1 test", () => {

//     expect(solvePuzzle1Day3(testInput, true)).toBe(161)
//   })
//    test("puzzle 1 forReal", () => {

//     expect(solvePuzzle1Day3(testInput,false)).toBe(179834255)
//   })
//   test("puzzle 2 test", () => {

//     expect(solvePuzzle2Day3(testInput, true)).toBe(48)
//   })
//    test("puzzle 2 forReal", () => {

//     expect(solvePuzzle2Day3(testInput,false)).toBe(80570939)
//   })
// })
// describe("Day 4", () => {
//   const testInput = [
//     "MMMSXXMASM",
//     "MSAMXMSMSA",
//     "AMXSXMAAMM",
//     "MSAMASMSMX",
//     "XMASAMXAMM",
//     "XXAMMXXAMA",
//     "SMSMSASXSS",
//     "SAXAMASAAA",
//     "MAMMMXMMMM",
//     "MXMXAXMASX",
//   ]
//   test("puzzle 1 test", () => {
//     expect(solvePuzzle1Day4(testInput, true)).toBe(18)
//   })
//   test("puzzle 1 forReal", () => {
//     expect(solvePuzzle1Day4(testInput, false)).toBe(2344)
//   })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day4(testInput, true)).toBe(9)
//   })
//   test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day4(testInput, false)).toBe(1815)
//   })
// })

// describe('Day 5', () => {
//   const testInput = [
//     '47|53',
//     '97|13',
//     '97|61',
//     '97|47',
//     '75|29',
//     '61|13',
//     '75|53',
//     '29|13',
//     '97|29',
//     '53|29',
//     '61|53',
//     '97|53',
//     '61|29',
//     '47|13',
//     '75|47',
//     '97|75',
//     '47|61',
//     '75|61',
//     '47|29',
//     '75|13',
//     '53|13',
//     '',
//     '75,47,61,53,29',
//     '97,61,53,29,13',
//     '75,29,13',
//     '75,97,47,61,53',
//     '61,13,29',
//     '97,13,75,29,47',
//   ]
//   // test('puzzle 1 test', () => {
//   //   expect(solvePuzzle1Day5(testInput, true)).toBe(143)
//   // })
//   // test("puzzle 1 forReal", () => {
//   //   expect(solvePuzzle1Day5(testInput, false)).toBe(4135)
//   // })
//   test("puzzle 2 test", () => {
//     expect(solvePuzzle2Day5(testInput, true)).toBe(123)
//   })
//   test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day5(testInput, false)).toBe(0)
//   })
// })

// describe('Day 6', () => {
//   const testInput = [
//     '....#.....',
//     '.........#',
//     '..........',
//     '..#.......',
//     '.......#..',
//     '..........',
//     '.#..^.....',
//     '........#.',
//     '#.........',
//     '......#...',
//   ]
//   // test('puzzle 1 test', () => {
//   //   expect(solvePuzzle1Day6(testInput, true)).toBe(41)
//   // })
//   // test("puzzle 1 forReal", () => {
//   //   expect(solvePuzzle1Day6(testInput, false)).toBe(5531)
//   // })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day6(testInput, true)).toBe(6)
//   })
//   test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day6(testInput, false)).toBe(2165)
//   })
// })
// describe('Day 7', () => {
//   const testInput = [
//     '190: 10 19',
//     '3267: 81 40 27',
//     '83: 17 5',
//     '156: 15 6',
//     '7290: 6 8 6 15',
//     '161011: 16 10 13',
//     '192: 17 8 14',
//     '21037: 9 7 18 13',
//     '292: 11 6 16 20',
//   ]
//   test('puzzle 1 test', () => {
//     expect(solvePuzzle1Day7(testInput, true)).toBe(3749)
//   })
//   test('puzzle 1 forReal', () => {
//     expect(solvePuzzle1Day7(testInput, false)).toBe(6083020304036)
//   })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day7(testInput, true)).toBe(11387)
//   })
//   test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day7(testInput, false)).toBe(59002246504791)
//   })
// })
// describe('Day 8', () => {
//   const testInput = [
//     '............',
//     '........0...',
//     '.....0......',
//     '.......0....',
//     '....0.......',
//     '......A.....',
//     '............',
//     '............',
//     '........A...',
//     '.........A..',
//     '............',
//     '............',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day8(testInput, true)).toBe(14)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day8(testInput, false)).toBe(269)
// })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day8(testInput, true)).toBe(34)
//   })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day8(testInput, false)).toBe(0)
//   })
// })
// describe('Day 9', () => {
//   const testInput = ['2333133121414131402']
//   test('puzzle 1 test', () => {
//     expect(solvePuzzle1Day9(testInput, true)).toBe(1928)
//   })
//   test('puzzle 1 forReal', () => {
//     expect(solvePuzzle1Day9(testInput, false)).toBe(6395800119709)
//   })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day9(testInput, true)).toBe(2858)
//   })
//   test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day9(testInput, false)).toBe(0)
//   })
// })
// describe('Day 10', () => {
//   const testInput = [
//     '89010123',
//     '78121874',
//     '87430965',
//     '96549874',
//     '45678903',
//     '32019012',
//     '01329801',
//     '10456732',
//   ]
//   test('puzzle 1 test', () => {
//     expect(solvePuzzle1Day10(testInput, true)).toBe(36)
//   })
//   test('puzzle 1 forReal', () => {
//     expect(solvePuzzle1Day10(testInput, false)).toBe(822)
//   })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day10(testInput, true)).toBe(81)
//   })
//   test("puzzle 2 forReal", () => {
//     expect(solvePuzzle2Day10(testInput, false)).toBe(0)
//   })
// })
// describe('Day 11', () => {
//   const testInput = ['125 17']
//   test('puzzle 1 test', () => {
//     expect(solvePuzzle1Day11(testInput, true)).toBe(55312)
//   })
//   test('puzzle 1 forReal', () => {
//     expect(solvePuzzle1Day11(testInput, false)).toBe(213625)
//   })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day11(testInput, true)).toBe(55312)
//   })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day11(testInput, false)).toBe(0)
//   })
// })
// describe('Day 12', () => {
//   const testInput = [
//     'RRRRIICCFF',
//     'RRRRIICCCF',
//     'VVRRRCCFFF',
//     'VVRCCCJFFF',
//     'VVVVCJJCFE',
//     'VVIVCCJJEE',
//     'VVIIICJJEE',
//     'MIIIIIJJEE',
//     'MIIISIJEEE',
//     'MMMISSJEEE',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day12(testInput, true)).toBe(1930)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day12(testInput, false)).toBe(1452678)
// })

//   const testCases = [
//     {
//       testCase: ['EEEEE', 'EXXXX', 'EEEEE', 'EXXXX', 'EEEEE'],
//       result: 236,
//     },
//     {
//       testCase: ['AAAAAA', 'AAABBA', 'AAABBA', 'ABBAAA', 'ABBAAA', 'AAAAAA'],
//       result: 368,
//     },
//     {
//       testCase: ['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'],
//       result: 436,
//     },
//   ]
//   test('testCases', () => {
//     for (let i = 0; i < testCases.length; i++) {
//       console.log('testing: ', testCases[i])
//       expect(solvePuzzle2Day12(testCases[i].testCase, true)).toBe(testCases[i].result)
//     }
//   })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day12(testInput, true)).toBe(1206)
//   })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day12(testInput, false)).toBe(873584)
//   })
// })

// describe('Day 13', () => {
//   const testInput = [
//     'Button A: X+94, Y+34',
//     'Button B: X+22, Y+67',
//     'Prize: X=8400, Y=5400',
//     '',
//     'Button A: X+26, Y+66',
//     'Button B: X+67, Y+21',
//     'Prize: X=12748, Y=12176',
//     '',
//     'Button A: X+17, Y+86',
//     'Button B: X+84, Y+37',
//     'Prize: X=7870, Y=6450',
//     '',
//     'Button A: X+69, Y+23',
//     'Button B: X+27, Y+71',
//     'Prize: X=18641, Y=10279',
//     '',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day13(testInput, true)).toBe(480)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day13(testInput, false)).toBe(32041)
// })

// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day13(testInput, true)).toBe(875318608908)
// })
// test('puzzle 2 forReal', () => {
//   expect(solvePuzzle2Day13(testInput, false)).toBe(95843948914827)
// })
// })

// describe('Day 14', () => {
//   const testInput = [
//     'p=0,4 v=3,-3',
//     'p=6,3 v=-1,-3',
//     'p=10,3 v=-1,2',
//     'p=2,0 v=2,-1',
//     'p=0,0 v=1,3',
//     'p=3,0 v=-2,-2',
//     'p=7,6 v=-1,-3',
//     'p=3,0 v=-1,-2',
//     'p=9,3 v=2,3',
//     'p=7,3 v=-1,2',
//     'p=2,4 v=2,-3',
//     'p=9,5 v=-3,-3',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day14(testInput, true)).toBe(12)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day14(testInput, false)).toBe(225810288)
// })

// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day14(testInput, true)).toBe(0)
// })
// test('puzzle 2 forReal', () => {
//   expect(solvePuzzle2Day14(testInput, false)).toBe(6752)
// })
// })
// describe('Day 15', () => {
//   const testInput = [
//     '##########',
//     '#..O..O.O#',
//     '#......O.#',
//     '#.OO..O.O#',
//     '#..O@..O.#',
//     '#O#..O...#',
//     '#O..O..O.#',
//     '#.OO.O.OO#',
//     '#....O...#',
//     '##########',
//     '',
//     '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^',
//     'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v',
//     '><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<',
//     '<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^',
//     '^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><',
//     '^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^',
//     '>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^',
//     '<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>',
//     '^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>',
//     'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day15(testInput, true)).toBe(10092)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day15(testInput, false)).toBe(0)
// })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day15(testInput, true)).toBe(9021)
//   })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day15(testInput, false)).toBe(1511259)
//   })
// })
// describe('Day 16', () => {
//   const testInput = [
//     '###############',
//     '#.......#....E#',
//     '#.#.###.#.###.#',
//     '#.....#.#...#.#',
//     '#.###.#####.#.#',
//     '#.#.#.......#.#',
//     '#.#.#####.###.#',
//     '#...........#.#',
//     '###.#.#####.#.#',
//     '#...#.....#.#.#',
//     '#.#.#.###.#.#.#',
//     '#.....#...#.#.#',
//     '#.###.#.#.#.#.#',
//     '#S..#.....#...#',
//     '###############',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day16(testInput, true)).toBe(7036)
// })
// const testInput1 = [
//   '#################',
//   '#...#...#...#..E#',
//   '#.#.#.#.#.#.#.#.#',
//   '#.#.#.#...#...#.#',
//   '#.#.#.#.###.#.#.#',
//   '#...#.#.#.....#.#',
//   '#.#.#.#.#.#####.#',
//   '#.#...#.#.#.....#',
//   '#.#.#####.#.###.#',
//   '#.#.#.......#...#',
//   '#.#.###.#####.###',
//   '#.#.#...#.....#.#',
//   '#.#.#.#####.###.#',
//   '#.#.#.........#.#',
//   '#.#.#.#########.#',
//   '#S#.............#',
//   '#################',
// ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day16(testInput1, true)).toBe(11048)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day16(testInput, false)).toBe(85396)
// })
// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day16(testInput, true)).toBe(45)
// })
// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day16(testInput1, true)).toBe(64)
// })
// test('puzzle 2 forReal', () => {
//   expect(solvePuzzle2Day16(testInput, false)).toBe(428)
// })
// })

// describe('Day 17', () => {
// const testInput = ['Register A: 729', 'Register B: 0', 'Register C: 0', '', 'Program: 0,1,5,4,3,0']
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day17(testInput, true)).toBe('4,6,3,5,6,3,5,2,1,0')
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day17(testInput, false)).toBe('3,1,5,3,7,4,2,7,5')
// })
// const testInput1 = ['Register A: 2024', 'Register B: 0', 'Register C: 0', '', 'Program: 0,3,5,4,3,0']
// test('puzzle 2 test', async () => {
//   expect(await solvePuzzle2Day17(testInput1, true)).toBe(117440)
// })
// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day17(testInput1, false)).toBe(190593310997519)
// })
// })
// describe('Day 18', () => {
//   const testInput = [
//     '5,4',
//     '4,2',
//     '4,5',
//     '3,0',
//     '2,1',
//     '6,3',
//     '2,4',
//     '1,5',
//     '0,6',
//     '3,3',
//     '2,6',
//     '5,1',
//     '1,2',
//     '5,5',
//     '2,5',
//     '6,5',
//     '1,4',
//     '0,4',
//     '6,4',
//     '1,1',
//     '6,1',
//     '1,0',
//     '0,5',
//     '1,6',
//     '2,0',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day18(testInput, true)).toBe(22)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day18(testInput, false)).toBe(276)
// })
// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day18(testInput, true)).toBe('6,1')
// })
//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day18(testInput, false)).toBe('60,37')
//   })
// })
// describe('Day 19', () => {
//   const testInput = ['r, wr, b, g, bwu, rb, gb, br', '', 'brwrr', 'bggr', 'gbbr', 'rrbgbr', 'ubwu', 'bwurrg', 'brgr', 'bbrgwb']
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day19(testInput, true)).toBe(6)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day19(testInput, false)).toBe(247)
// })

// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day19(testInput, true)).toBe(16)
// })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day19(testInput, false)).toBe(0)
//   })
// })

// describe('Day 20', () => {
//   const testInput = [
//     '###############',
//     '#...#...#.....#',
//     '#.#.#.#.#.###.#',
//     '#S#...#.#.#...#',
//     '#######.#.#.###',
//     '#######.#.#...#',
//     '#######.#.###.#',
//     '###..E#...#...#',
//     '###.#######.###',
//     '#...###...#...#',
//     '#.#####.#.###.#',
//     '#.#...#.#.#...#',
//     '#.#.#.#.#.#.###',
//     '#...#...#...###',
//     '###############',
//   ]
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day20(testInput, true,2)).toBe(14)
// })
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day20(testInput, true,4)).toBe(14)
// })
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day20(testInput, true,6)).toBe(2)
// })
// test('puzzle 1 test', () => {
//   expect(solvePuzzle1Day20(testInput, true,64)).toBe(1)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day20(testInput, false, 100)).toBe(1365)
// })

// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day20(testInput, true, 50)).toBe(32)
//   expect(solvePuzzle2Day20(testInput, true, 52)).toBe(31)
//   expect(solvePuzzle2Day20(testInput, true, 54)).toBe(29)
//   expect(solvePuzzle2Day20(testInput, true, 56)).toBe(39)
//   expect(solvePuzzle2Day20(testInput, true, 60)).toBe(23)
// })
// test('puzzle 2 forReal', () => {
//   expect(solvePuzzle2Day20(testInput, false, 100)).toBe(975756)
// })
// })

// describe('Day 21', () => {
//   const testInput = ['029A', '980A', '179A', '456A', '379A']

// test('calculates complexity correctly for example codes', () => {
//   expect(solvePuzzle1Day21(testInput, true)).toBe(126384)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day21(testInput, false)).toBe(155252)
// })

// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day21(testInput, true)).toBe(0)
// })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day21(testInput, false)).toBe(0)
//   })
// })
// describe('Day 22', () => {
//   const testInput = ['15887950', '16495136', '527345', '704524', '1553684', '12683156', '11100544', '12249484', '7753432', '5908254']

// test('calculates complexity correctly for example codes', () => {
//   expect(solvePuzzle1Day22(testInput, true)).toBe(37327623)
// })
// test('puzzle 1 forReal', () => {
//   expect(solvePuzzle1Day22(testInput, false)).toBe(13234715490)
// })

// test('puzzle 2 test', () => {
//   expect(solvePuzzle2Day22(testInput, true)).toBe(0)
// })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day22(testInput, false)).toBe(1490)
//   })
// })
//
// describe('Day 23', () => {
//   const testInput = [
//     'kh-tc',
//     'qp-kh',
//     'de-cg',
//     'ka-co',
//     'yn-aq',
//     'qp-ub',
//     'cg-tb',
//     'vc-aq',
//     'tb-ka',
//     'wh-tc',
//     'yn-cg',
//     'kh-ub',
//     'ta-co',
//     'de-co',
//     'tc-td',
//     'tb-wq',
//     'wh-td',
//     'ta-ka',
//     'td-qp',
//     'aq-cg',
//     'wq-ub',
//     'ub-vc',
//     'de-ta',
//     'wq-aq',
//     'wq-vc',
//     'wh-yn',
//     'ka-de',
//     'kh-ta',
//     'co-tc',
//     'wh-qp',
//     'tb-vc',
//     'td-yn',
//   ]

//   test('calculates complexity correctly for example codes', () => {
//     expect(solvePuzzle1Day23(testInput, true)).toBe(7)
//   })
//   test('puzzle 1 forReal', () => {
//     expect(solvePuzzle1Day23(testInput, false)).toBe(1000)
//   })

//   test('puzzle 2 test', () => {
//     expect(solvePuzzle2Day23(testInput, true)).toBe('co,de,ka,ta')
//   })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day23(testInput, false)).toBe('cf,ct,cv,cz,fi,lq,my,pa,sl,tt,vw,wz,yd')
//   })
// })
// describe('Day 24', () => {
//   const testInput = [
//     'x00: 1',
//     'x01: 0',
//     'x02: 1',
//     'x03: 1',
//     'x04: 0',
//     'y00: 1',
//     'y01: 1',
//     'y02: 1',
//     'y03: 1',
//     'y04: 1',
//     '',
//     'ntg XOR fgs -> mjb',
//     'y02 OR x01 -> tnw',
//     'kwq OR kpj -> z05',
//     'x00 OR x03 -> fst',
//     'tgd XOR rvg -> z01',
//     'vdt OR tnw -> bfw',
//     'bfw AND frj -> z10',
//     'ffh OR nrd -> bqk',
//     'y00 AND y03 -> djm',
//     'y03 OR y00 -> psh',
//     'bqk OR frj -> z08',
//     'tnw OR fst -> frj',
//     'gnj AND tgd -> z11',
//     'bfw XOR mjb -> z00',
//     'x03 OR x00 -> vdt',
//     'gnj AND wpb -> z02',
//     'x04 AND y00 -> kjc',
//     'djm OR pbm -> qhw',
//     'nrd AND vdt -> hwm',
//     'kjc AND fst -> rvg',
//     'y04 OR y02 -> fgs',
//     'y01 AND x02 -> pbm',
//     'ntg OR kjc -> kwq',
//     'psh XOR fgs -> tgd',
//     'qhw XOR tgd -> z09',
//     'pbm OR djm -> kpj',
//     'x03 XOR y03 -> ffh',
//     'x00 XOR y04 -> ntg',
//     'bfw OR bqk -> z06',
//     'nrd XOR fgs -> wpb',
//     'frj XOR qhw -> z04',
//     'bqk OR frj -> z07',
//     'y03 OR x01 -> nrd',
//     'hwm AND bqk -> z03',
//     'tgd XOR rvg -> z12',
//     'tnw OR pbm -> gnj',
//   ]

//   // test('puzzle 1 test', () => {
//   //   expect(solvePuzzle1Day24(testInput, true)).toBe(2024)
//   // })
//   // test('puzzle 1 forReal', () => {
//   //   expect(solvePuzzle1Day24(testInput, false)).toBe(53755311654662)
//   // })

//   // test('puzzle 2 test', () => {
//   //   expect(solvePuzzle2Day24(testInput, true)).toBe(0)
//   // })
//   test('puzzle 2 forReal', () => {
//     expect(solvePuzzle2Day24(testInput, false)).not.toBe('bcm,bcn,bgf,bpg,bqf')
//     expect(solvePuzzle2Day24(testInput, false)).toBe(0)
//   })
// })

describe('Day 25', () => {
  const testInput = [
    '#####',
    '.####',
    '.####',
    '.####',
    '.#.#.',
    '.#...',
    '.....',
    '',
    '#####',
    '##.##',
    '.#.##',
    '...##',
    '...#.',
    '...#.',
    '.....',
    '',
    '.....',
    '#....',
    '#....',
    '#...#',
    '#.#.#',
    '#.###',
    '#####',
    '',
    '.....',
    '.....',
    '#.#..',
    '###..',
    '###.#',
    '###.#',
    '#####',
    '',
    '.....',
    '.....',
    '.....',
    '#....',
    '#.#..',
    '#.#.#',
    '#####',
    '',
  ]

  // test('puzzle 1 test', () => {
  //   expect(solvePuzzle1Day25(testInput, true)).toBe(3)
  // })
  test('puzzle 1 forReal', () => {
    expect(solvePuzzle1Day25(testInput, false)).toBe(0)
  })

  // test('puzzle 2 test', () => {
  //   expect(solvePuzzle2Day25(testInput, true)).toBe(0)
  // })
  // test('puzzle 2 forReal', () => {
  //   expect(solvePuzzle2Day25(testInput, false)).not.toBe('0')
  //   expect(solvePuzzle2Day25(testInput, false)).toBe(0)
  // })
})
