const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split('').map(point => parseInt(point)))
  }

  handle (data) {
    const lowPoints = this.findLowPoints(data).map(([x, y]) => data[x][y])

    console.log('Low points sum of risk', lowPoints.reduce((sum, point) => { return sum + point + 1 }, 0))
  }

  findLowPoints (data) {
    const points = []
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].length; y++) {
        if (this.isLowerThanAdj(x, y, data)) {
          points.push([x, y])
        }
      }
    }
    return points
  }

  isLowerThanAdj (x, y, data) {
    const height = data[x][y]
    const adj = this.findAdj(x, y)
    for (let i = 0; i < adj.length; i++) {
      if (!this.isLower(height, adj[i].x, adj[i].y, data)) {
        return false
      }
    }
    return true
  }

  findAdj (x, y) {
    return [
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x, y: y - 1 },
      { x: x, y: y + 1 }
    ]
  }

  isLower (height, x, y, data) {
    if (data[x] === undefined || data[x][y] === undefined) {
      return true
    }
    return height < data[x][y]
  }
}

exports.Task = Task
