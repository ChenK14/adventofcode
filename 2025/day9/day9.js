const getLinesFromPath = require("../index")

const parsePointsFromInput = (input) => {
  return input.map(line => {
    const [x, y] = line.split(',').map(Number)
    return { x, y }
  })
}

const getRectangleArea = (pointA, pointB) => {
  return (Math.abs(pointB.x - pointA.x) + 1) * (Math.abs(pointB.y - pointA.y) + 1)
}

const getRectangleBounds = (pointA, pointB) => ({
  minX: Math.min(pointA.x, pointB.x),
  maxX: Math.max(pointA.x, pointB.x),
  minY: Math.min(pointA.y, pointB.y),
  maxY: Math.max(pointA.y, pointB.y)
})

const buildPolygonSegments = (points) => {
  return points.map((current, index) => {
    const next = points[(index + 1) % points.length]
    if (current.x === next.x) {
      return {
        type: 'vertical',
        x: current.x,
        minY: Math.min(current.y, next.y),
        maxY: Math.max(current.y, next.y)
      }
    }
    return {
      type: 'horizontal',
      y: current.y,
      minX: Math.min(current.x, next.x),
      maxX: Math.max(current.x, next.x)
    }
  })
}

const isPointOnSegment = (x, y, segment) => {
  if (segment.type === 'vertical') {
    return segment.x === x && y >= segment.minY && y <= segment.maxY
  }
  return segment.y === y && x >= segment.minX && x <= segment.maxX
}

const isPointOnPolygonBoundary = (x, y, segments) => {
  return segments.some(segment => isPointOnSegment(x, y, segment))
}

const isPointInsidePolygon = (x, y, verticalSegments) => {
  let crossings = 0
  for (const segment of verticalSegments) {
    if (segment.x > x && y > segment.minY && y < segment.maxY) {
      crossings++
    }
  }
  return crossings % 2 === 1
}

const isPointInsideOrOnPolygon = (x, y, segments, verticalSegments) => {
  return isPointOnPolygonBoundary(x, y, segments) || isPointInsidePolygon(x, y, verticalSegments)
}

const doesSegmentIntersectRectangleInterior = (segment, bounds) => {
  const { minX, maxX, minY, maxY } = bounds

  if (segment.type === 'vertical') {
    const isInsideHorizontally = segment.x > minX && segment.x < maxX
    if (!isInsideHorizontally) return false

    const isEntirelyInsideRectangle = segment.minY >= minY && segment.maxY <= maxY
    const entersFromBelow = segment.minY < minY && segment.maxY > minY
    const entersFromAbove = segment.maxY > maxY && segment.minY < maxY

    return isEntirelyInsideRectangle || entersFromBelow || entersFromAbove
  }

  const isInsideVertically = segment.y > minY && segment.y < maxY
  if (!isInsideVertically) return false

  const isEntirelyInsideRectangle = segment.minX >= minX && segment.maxX <= maxX
  const entersFromLeft = segment.minX < minX && segment.maxX > minX
  const entersFromRight = segment.maxX > maxX && segment.minX < maxX

  return isEntirelyInsideRectangle || entersFromLeft || entersFromRight
}

const areAllCornersInsidePolygon = (bounds, segments, verticalSegments) => {
  const corners = [
    [bounds.minX, bounds.minY],
    [bounds.minX, bounds.maxY],
    [bounds.maxX, bounds.minY],
    [bounds.maxX, bounds.maxY]
  ]
  return corners.every(([x, y]) => isPointInsideOrOnPolygon(x, y, segments, verticalSegments))
}

const doesPolygonCutThroughRectangle = (bounds, segments) => {
  return segments.some(segment => doesSegmentIntersectRectangleInterior(segment, bounds))
}

const isRectangleFullyInsidePolygon = (pointA, pointB, segments, verticalSegments) => {
  const bounds = getRectangleBounds(pointA, pointB)
  return areAllCornersInsidePolygon(bounds, segments, verticalSegments) &&
         !doesPolygonCutThroughRectangle(bounds, segments)
}

const generateAllPointPairsSortedByAreaDescending = (points) => {
  const pairs = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      pairs.push({
        pointA: points[i],
        pointB: points[j],
        area: getRectangleArea(points[i], points[j])
      })
    }
  }
  return pairs.sort((a, b) => b.area - a.area)
}

const solvePuzzle1 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day9/input.txt")
  }

  const points = parsePointsFromInput(lines)
  let largestArea = 0

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      largestArea = Math.max(largestArea, getRectangleArea(points[i], points[j]))
    }
  }

  return largestArea
}

const solvePuzzle2 = (lines, testing) => {
  if (!testing) {
    lines = getLinesFromPath("day9/input.txt")
  }

  const points = parsePointsFromInput(lines)
  const segments = buildPolygonSegments(points)
  const verticalSegments = segments.filter(s => s.type === 'vertical')
  const pairsSortedByArea = generateAllPointPairsSortedByAreaDescending(points)

  for (const pair of pairsSortedByArea) {
    if (isRectangleFullyInsidePolygon(pair.pointA, pair.pointB, segments, verticalSegments)) {
      return pair.area
    }
  }
  return 0
}

module.exports = { solvePuzzle1, solvePuzzle2 }
