const getLinesFromPath = require('../index')

function isSafe(matrix, row, col, visited, targetChar) {
  const numRows = matrix.length
  const numCols = matrix[0].length

  return row >= 0 && row < numRows && col >= 0 && col < numCols && matrix[row][col] === targetChar && !visited[row][col]
}

function dfs(matrix, row, col, visited, targetChar, group) {
  let rowNbr, colNbr
  rowNbr = [-1, 0, 0, 1]
  colNbr = [0, -1, 1, 0]

  visited[row][col] = true
  group.push({ row, col, numOfNeighbors: getNumOfNeighbors(matrix, row, col) })

  for (let k = 0; k < rowNbr.length; k++) {
    const newRow = row + rowNbr[k]
    const newCol = col + colNbr[k]

    if (isSafe(matrix, newRow, newCol, visited, targetChar)) {
      dfs(matrix, newRow, newCol, visited, targetChar, group)
    }
  }
}

function findGroups(matrix, targetChar) {
  const numRows = matrix.length
  const numCols = matrix[0].length

  const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false))

  const groups = []

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (isSafe(matrix, row, col, visited, targetChar)) {
        const group = []
        dfs(matrix, row, col, visited, targetChar, group)
        groups.push(group)
      }
    }
  }

  return groups
}

const getNumOfNeighbors = (matrix, row, col) => {
  const value = matrix[row][col]
  let numOfNeighbors = 0
  if (row > 0) {
    const neighborValue = `${matrix[row - 1][col]}`
    if (neighborValue === value) {
      numOfNeighbors++
    }
  }
  if (col > 0) {
    const neighborValue = `${matrix[row][col - 1]}`
    if (neighborValue === value) {
      numOfNeighbors++
    }
  }
  if (col < matrix[row].length - 1) {
    const neighborValue = `${matrix[row][col + 1]}`
    if (neighborValue === value) {
      numOfNeighbors++
    }
  }
  if (row < matrix.length - 1) {
    const neighborValue = `${matrix[row + 1][col]}`
    if (neighborValue === value) {
      numOfNeighbors++
    }
  }
  return numOfNeighbors
}

const getRegionsFromInput = (matrix) => {
  const letters = new Set()

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      letters.add(matrix[row][col])
    }
  }

  return [...letters]
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day12/input.txt')
  }

  lines = lines.reduce((acc, line) => {
    acc.push(line.split(''))
    return acc
  }, [])

  const regionsLettersAndPlaces = getRegionsFromInput(lines)

  const groupsByLettersMap = regionsLettersAndPlaces.reduce((acc, letter) => {
    acc[letter] = findGroups(lines, letter)
    return acc
  }, {})

  return Object.keys(groupsByLettersMap).reduce((acc, letter) => {
    const groups = groupsByLettersMap[letter]
    for (let j = 0; j < groups.length; j++) {
      const group = groups[j]
      let groupsFences = 0
      for (let k = 0; k < group.length; k++) {
        groupsFences += 4 - group[k].numOfNeighbors
      }
      acc += group.length * groupsFences
    }
    return acc
  }, 0)
}

const createMaps = (group) => {
  const rowMap = {}
  const colMap = {}

  for (let i = 0; i < group.length; i++) {
    const { row, col } = group[i]
    rowMap[row] ? rowMap[row].push(col) : (rowMap[row] = [col])
    colMap[col] ? colMap[col].push(row) : (colMap[col] = [row])
  }

  const verticalLines = createVerticalLines(rowMap)
  const horizontalLines = createHorizontalLines(colMap)

  return verticalLines + horizontalLines
}

const createVerticalLines = (rowMap) => {
  const rows = Object.keys(rowMap)

  const lines = rows.reduce((acc, row) => {
    const cols = rowMap[row].sort((a, b) => a - b) // Ensure columns are sorted
    acc.push({ row, col: cols[0] - 0.25 })

    if (cols.length === 1) {
      acc.push({ row, col: cols[0] + 0.25 })
    } else {
      let prevColValue = cols[0]
      for (let i = 1; i < cols.length; i++) {
        if (prevColValue + 1 === cols[i]) {
          prevColValue = cols[i]
        } else {
          acc.push({ row, col: prevColValue + 0.25 })
          acc.push({ row, col: cols[i] - 0.25 })
          prevColValue = cols[i]
        }
      }
      acc.push({ row, col: cols[cols.length - 1] + 0.25 })
    }
    return acc
  }, [])

  // Sort lines by column
  const sortedLines = lines.sort((a, b) => a.col - b.col)

  const lineColMap = {}

  for (let i = 0; i < sortedLines.length; i++) {
    const { row, col } = sortedLines[i]
    lineColMap[col] ? lineColMap[col].push(parseInt(row)) : (lineColMap[col] = [parseInt(row)])
  }

  const cols = Object.keys(lineColMap)
    .map(Number)
    .sort((a, b) => a - b)

  return cols.reduce((acc, col) => {
    acc += 1
    const rows = lineColMap[col]
    if (rows.length === 1) {
      return acc
    }
    let prevRowValue = rows[0]
    for (let i = 1; i < rows.length; i++) {
      if (prevRowValue + 1 !== rows[i]) {
        acc += 1
      }
      prevRowValue = rows[i]
    }
    return acc
  }, 0)
}

const createHorizontalLines = (colMap) => {
  const cols = Object.keys(colMap)

  const lines = cols.reduce((acc, col) => {
    const rows = colMap[col].sort((a, b) => a - b) // Ensure rows are sorted
    acc.push({ col, row: rows[0] - 0.25 })

    if (rows.length === 1) {
      acc.push({ col, row: rows[0] + 0.25 })
    } else {
      let prevRowValue = rows[0]
      for (let i = 1; i < rows.length; i++) {
        if (prevRowValue + 1 === rows[i]) {
          prevRowValue = rows[i]
        } else {
          acc.push({ col, row: prevRowValue + 0.25 })
          acc.push({ col, row: rows[i] - 0.25 })
          prevRowValue = rows[i]
        }
      }
      acc.push({ col, row: rows[rows.length - 1] + 0.25 })
    }
    return acc
  }, [])

  // Sort lines by row
  const sortedLines = lines.sort((a, b) => a.row - b.row)

  const lineRowMap = {}

  for (let i = 0; i < sortedLines.length; i++) {
    const { row, col } = sortedLines[i]
    lineRowMap[row] ? lineRowMap[row].push(parseInt(col)) : (lineRowMap[row] = [parseInt(col)])
  }

  const rows = Object.keys(lineRowMap)
    .map(Number)
    .sort((a, b) => a - b)

  return rows.reduce((acc, row) => {
    acc += 1
    const cols = lineRowMap[row]
    if (cols.length === 1) {
      return acc
    }
    let prevColValue = cols[0]
    for (let i = 1; i < cols.length; i++) {
      if (prevColValue + 1 !== cols[i]) {
        acc += 1
      }
      prevColValue = cols[i]
    }
    return acc
  }, 0)
}

// Function to solve Part Two
const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day12/input.txt')
  }

  const matrix = lines.reduce((acc, line) => {
    acc.push(line.split(''))
    return acc
  }, [])

  const regionsLettersAndPlaces = getRegionsFromInput(matrix)

  const groupsByLettersMap = regionsLettersAndPlaces.reduce((acc, letter) => {
    acc[letter] = findGroups(matrix, letter)
    return acc
  }, {})

  return Object.keys(groupsByLettersMap).reduce((acc, letter) => {
    const groups = groupsByLettersMap[letter]
    for (let j = 0; j < groups.length; j++) {
      const group = groups[j]
      const totalSides = createMaps(group)
      acc += group.length * totalSides
    }
    return acc
  }, 0)
}

module.exports = { solvePuzzle1, solvePuzzle2 }

const getRegionsWithFencesCount = (regionsLettersAndPlaces) => {
  const letters = Object.keys(regionsLettersAndPlaces)
  // const letterToGroupNumber = {}

  const finalProduct = []

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]

    const groups = regionsLettersAndPlaces[letter]
    // letterToGroupNumber[letter] = 1
    for (let j = 0; j < groups.length; j++) {
      const places = groups[j]
      let fences = []

      for (let j = 0; j < places.length; j++) {
        const place = places[j]
        const up = `r${+place.row - 0.25}`
        const down = `r${+place.row + 0.25}`
        const left = `c${+place.col - 0.25}`
        const right = `c${+place.col + 0.25}`
        fences.push(up, down, left, right)
      }
      finalProduct.push({ letter, placesCount: places.length, fencesCount: new Set(fences).size })
    }
  }

  return finalProduct
}

const getRegionsFromInput1 = (matrix) => {
  const valueMap = {}
  const initValueMap = (value) => {
    valueMap[value] = 1
    return 1
  }
  const regionsLetterToPlacesMap = {}
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let value = `${matrix[row][col]}`

      // let found = false
      // if (row > 0) {
      //   const neighborValue = `${matrix[row - 1][col]}`
      //   if (neighborValue.startsWith(value)) {
      //     value = neighborValue
      //     found = true
      //   }
      //   // check up
      // }
      // if (!found && col > 0) {
      //   const neighborValue = `${matrix[row][col - 1]}`
      //   if (neighborValue.startsWith(value)) {
      //     value = neighborValue
      //     found = true
      //   }
      //   // check left
      // }
      // if (!found && col < matrix[row].length - 1) {
      //   const neighborValue = `${matrix[row][col + 1]}`
      //   if (neighborValue === value) {
      //     if (valueMap[value]) {
      //       valueMap[value]++
      //       const mapValue = valueMap[value]
      //       value = `${value}${mapValue}`
      //     } else {
      //       valueMap[value] = 1
      //       value = `${value}1`
      //     }
      //     found = true
      //   }
      //   //check right
      // }
      // if (!found && row < matrix.length - 1) {
      //   const neighborValue = `${matrix[row + 1][col]}`
      //   if (neighborValue === value) {
      //     if (valueMap[value]) {
      //       valueMap[value]++
      //       const mapValue = valueMap[value]
      //       value = `${value}${mapValue}`
      //     } else {
      //       valueMap[value] = 1
      //       value = `${value}1`
      //     }
      //     found = true
      //   }
      //   //check down
      // }
      // if (!found) {
      //   if (valueMap[value]) {
      //     valueMap[value]++
      //     const mapValue = valueMap[value]
      //     value = `${value}${mapValue}`
      //   } else {
      //     valueMap[value] = 1
      //     value = `${value}1`
      //   }
      // }

      // if (value === 'I3') console.log(row, col)
      // matrix[row][col] = value
      regionsLetterToPlacesMap[value]
        ? regionsLetterToPlacesMap[value].places.push({ row, col })
        : (regionsLetterToPlacesMap[value] = { places: [{ row, col }] })
    }
  }
  return regionsLetterToPlacesMap
}
function countLineSegments(map) {}

function countTotalSides(group) {}
