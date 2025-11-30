const getLinesFromPath = require('../index')

const getRowAndCol = (input) => {
  const xy = input.split('=')[1].split(',')
  return { row: parseInt(xy[1]), col: parseInt(xy[0]) }
}

const getRobotFromInput = (input) => {
  const robots = []

  for (let i = 0; i < input.length; i++) {
    const splittedLine = input[i].split(' ')
    const position = getRowAndCol(splittedLine[0])
    const velocity = getRowAndCol(splittedLine[1])
    robots.push({ position, velocity })
  }

  return robots
}

const move = (robots, maxRow, maxCol) => {
  for (let i = 0; i < robots.length; i++) {
    const { position, velocity } = robots[i]
    const currentRow = position.row
    const currentCol = position.col
    const velocityRow = velocity.row
    const velocityCol = velocity.col

    //((a + b) % 12 + 12) % 12;
    const newRow = (((currentRow + velocityRow) % maxRow) + maxRow) % maxRow
    const newCol = (((currentCol + velocityCol) % maxCol) + maxCol) % maxCol

    robots[i] = { position: { row: newRow, col: newCol }, velocity }
  }
}

const solvePuzzle1 = (lines, testing) => {
  let matrixRowSize = 7
  let matrixColSize = 11
  if (!testing) {
    lines = getLinesFromPath('day14/input.txt')
    matrixRowSize = 103
    matrixColSize = 101
  }

  const robots = getRobotFromInput(lines)

  for (let i = 0; i < 100; i++) {
    move(robots, matrixRowSize, matrixColSize)
  }

  const quadrants = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  }
  const halfRows = Math.floor(matrixRowSize / 2)
  const halfCol = Math.floor(matrixColSize / 2)

  for (let i = 0; i < robots.length; i++) {
    const { position } = robots[i]
    const { row, col } = position
    // Skip robots on the midlines
    if (row === halfRows || col === halfCol) continue

    if (row < halfRows && col < halfCol) {
      quadrants[0]++
    } else if (row < halfRows && col > halfCol) {
      quadrants[1]++
    } else if (row > halfRows && col > halfCol) {
      quadrants[2]++
    } else if (row > halfRows && col < halfCol) {
      quadrants[3]++
    }
  }

  return Object.values(quadrants).reduce((acc, quadrant) => acc * quadrant, 1)
}

// the idea- as given by reddit- is the find the safest time up to 1000000
const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day14/input.txt')
  }
  const maxRow = 103
  const maxCol = 101
  const robots = getRobotFromInput(lines)
  const halfRows = Math.floor(maxRow / 2)
  const halfCol = Math.floor(maxCol / 2)

  let A_x = 0,
    B_x = 0
  let A_y = 0,
    B_y = 0
  for (const r of robots) {
    const { row: r0, col: c0 } = r.position
    const { row: vr, col: vc } = r.velocity
    A_x += vc * vc
    B_x += c0 * vc
    A_y += vr * vr
    B_y += r0 * vr
  }

  let t_x = A_x === 0 ? 0 : -B_x / A_x
  let t_y = A_y === 0 ? 0 : -B_y / A_y
  t_x = Math.max(Math.round(t_x), 0)
  t_y = Math.max(Math.round(t_y), 0)

  const startT = Math.min(t_x, t_y)
  const endT = Math.max(t_x, t_y) + 1000000

  let bestTime = 0
  let bestDanger = Infinity

  for (let t = startT; t <= endT; t++) {
    let q0 = 0,
      q1 = 0,
      q2 = 0,
      q3 = 0
    const positions = []
    for (const r of robots) {
      const { row: r0, col: c0 } = r.position
      const { row: vr, col: vc } = r.velocity
      const x = (((c0 + vc * t) % maxCol) + maxCol) % maxCol
      const y = (((r0 + vr * t) % maxRow) + maxRow) % maxRow
      positions.push({ x, y })
    }

    for (const p of positions) {
      if (p.y === halfRows || p.x === halfCol) continue
      if (p.y < halfRows && p.x < halfCol) q0++
      else if (p.y < halfRows && p.x > halfCol) q1++
      else if (p.y > halfRows && p.x > halfCol) q2++
      else if (p.y > halfRows && p.x < halfCol) q3++
    }

    if (q0 === 0 || q1 === 0 || q2 === 0 || q3 === 0) continue
    const danger = q0 * q1 * q2 * q3
    if (danger < bestDanger) {
      bestDanger = danger
      bestTime = t
    }
  }
  printMatrixAtTime(robots, bestTime)
  return bestTime
}

function printMatrixAtTime(robots, t, maxRow = 103, maxCol = 101) {
  const grid = Array.from({ length: maxRow }, () => Array(maxCol).fill(' '))
  for (const r of robots) {
    const { row: r0, col: c0 } = r.position
    const { row: vr, col: vc } = r.velocity
    const x = (((c0 + vc * t) % maxCol) + maxCol) % maxCol
    const y = (((r0 + vr * t) % maxRow) + maxRow) % maxRow
    grid[y][x] = '.'
  }
  for (let row = 0; row < maxRow; row++) {
    process.stdout.write(grid[row].join('') + '\n')
  }
}

module.exports = { solvePuzzle1, solvePuzzle2 }
