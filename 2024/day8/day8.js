const getLinesFromPath = require('../index')

const getAntennaMap = (input) => {
  return input.reduce((acc, line, row) => {
    const tempLine = line.split('')
    for (let col = 0; col < tempLine.length; col++) {
      if (tempLine[col] !== '.') {
        acc[tempLine[col]] ? acc[tempLine[col]].push({ row, col }) : (acc[tempLine[col]] = [{ row, col }])
      }
    }
    return acc
  }, {})
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day8/input.txt')
  }
  // run over the matrix and create a map: {[key:antennaFreq]:[{row,col}]}
  // calculate where unique signal should be-
  //const uniqueSignal= {} // key is `${row}${col}`
  //  for each antenna create another antenna per another antenna using this logic for the placement: row: otherRow-thisRow+otherRow, col: otherCol-thisCol+otherCol

  const antennaMap = getAntennaMap(lines)
  console.log(antennaMap)
  const antennasRowAndCol = new Set()
  Object.keys(antennaMap).forEach((antennaName) => {
    const locations = antennaMap[antennaName]
    console.log({ antennaName, locations })
    for (let i = 0; i < locations.length; i++) {
      const { row, col } = locations[i]
      antennasRowAndCol.add(`${row},${col}`)
    }
  })
  console.log(antennasRowAndCol)
  const uniqueSignal = new Set() // key is `${row}${col}`
  const antennasFrequencies = Object.keys(antennaMap)

  for (let i = 0; i < antennasFrequencies.length; i++) {
    const antennas = antennaMap[antennasFrequencies[i]]
    for (let j = 0; j < antennas.length; j++) {
      const antenna = antennas[j]
      for (let k = 0; k < antennas.length; k++) {
        if (j === k) {
          continue
        }
        const otherAntenna = antennas[k]
        const newRow = otherAntenna.row - antenna.row + otherAntenna.row
        const newCol = otherAntenna.col - antenna.col + otherAntenna.col
        const uniqueName = `${newRow},${newCol}`

        if (newRow >= 0 && newRow < lines.length && newCol >= 0 && newCol < lines[0].length) {
          uniqueSignal.add(uniqueName)
        }
      }
    }
  }

  // console.log({ uniqueSignal, antennasRowAndCol })
  return uniqueSignal.size
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath('day8/input.txt')
  }

  // run over the matrix and create a map: {[key:antennaFreq]:[{row,col}]}
  // calculate where unique signal should be-
  //const uniqueSignal= {} // key is `${row}${col}`
  //  for each antenna create another antenna per another antenna using this logic for the placement: row: otherRow-thisRow+otherRow, col: otherCol-thisCol+otherCol

  const antennaMap = getAntennaMap(lines)
  const antennasRowAndCol = new Set()
  Object.keys(antennaMap).forEach((antennaName) => {
    const locations = antennaMap[antennaName]
    for (let i = 0; i < locations.length; i++) {
      const { row, col } = locations[i]
      antennasRowAndCol.add(`${row},${col}`)
    }
  })
  const uniqueSignal = new Set() // key is `${row}${col}`
  const antennasFrequencies = Object.keys(antennaMap)

  for (let i = 0; i < antennasFrequencies.length; i++) {
    const antennas = antennaMap[antennasFrequencies[i]]
    for (let j = 0; j < antennas.length; j++) {
      const antenna = antennas[j]
      for (let k = 0; k < antennas.length; k++) {
        if (j === k) {
          continue
        }
        let otherAntenna = antennas[k]
        let reverseOtherAntenna = antennas[k]
        const rowBuffer = otherAntenna.row - antenna.row
        const colBuffer = otherAntenna.col - antenna.col

        while (true) {
          const newRow = rowBuffer + otherAntenna.row
          const newCol = colBuffer + otherAntenna.col
          if (newRow >= 0 && newRow < lines.length && newCol >= 0 && newCol < lines[0].length) {
            otherAntenna = { row: newRow, col: newCol }
            const uniqueName = `${newRow},${newCol}`
            uniqueSignal.add(uniqueName)
          } else {
            break
          }
        }
        while (true) {
          const newRow = -1 * rowBuffer + otherAntenna.row
          const newCol = -1 * colBuffer + otherAntenna.col
          if (newRow >= 0 && newRow < lines.length && newCol >= 0 && newCol < lines[0].length) {
            otherAntenna = { row: newRow, col: newCol }
            const uniqueName = `${newRow},${newCol}`
            uniqueSignal.add(uniqueName)
          } else {
            break
          }
        }
      }
    }
  }

  // console.log({ uniqueSignal, antennasRowAndCol })
  return uniqueSignal.size
}

module.exports = { solvePuzzle1, solvePuzzle2 }
