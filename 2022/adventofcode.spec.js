const { solvePuzzle1: solvePuzzle1Day5, solvePuzzle2: solvePuzzle2Day5 } = require('./day5/day5')

describe('Day 5', () => {
  const testInput = [
    '    [D]    ',
    '[N] [C]    ',
    '[Z] [M] [P]',
    ' 1   2   3 ',
    '',
    'move 1 from 2 to 1',
    'move 3 from 1 to 3',
    'move 2 from 2 to 1',
    'move 1 from 1 to 2',
  ]
  test('puzzle 1 test', () => {
    expect(solvePuzzle1Day5(testInput, true)).toBe('CMZ')
  })
  test('puzzle 1 forReal', () => {
    expect(solvePuzzle1Day5(testInput, false)).toBe('')
  })
  // test('puzzle 2 test', () => {
  //   expect(solvePuzzle2Day4(testInput, true)).toBe(9)
  // })
  // test('puzzle 2 forReal', () => {
  //   expect(solvePuzzle2Day4(testInput, false)).toBe(0)
  // })

})
