const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split('').map(point => Number(point)))
  }

  handle (data) {
    const steps = 100
    let flashes = 0
    for (let i = 0; i < steps; i++) {
      data = data.map(row => row.map(line => line + 1))
      flashes += this.checkFlashes(data, [], 0)
      data = this.reset(data)
    }

    console.log('Total flashes: ', flashes)
  }

  checkFlashes (data, hasFlashed, stepFlashes) {
    let flashes = 0
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].length; y++) {
        if (this.flash(x, y, data, hasFlashed) === true) {
          flashes++
        }
      }
    }

    if (flashes > 0) {
      return this.checkFlashes(data, hasFlashed, stepFlashes + flashes)
    } else {
      return stepFlashes
    }
  }

  flash (x, y, data, hasFlashed) {
    if (data[x][y] <= 9) {
      return false
    }

    if (hasFlashed[x] === undefined) {
      hasFlashed[x] = {}
    }

    if (hasFlashed[x][y]) {
      return false
    }

    hasFlashed[x][y] = true

    const adj = this.findAdj(x, y)
    for (let i = 0; i < adj.length; i++) {
      if (data[adj[i].x] !== undefined && data[adj[i].x][adj[i].y] !== undefined) {
        data[adj[i].x][adj[i].y]++
      }
    }

    return true
  }

  findAdj (x, y) {
    return [
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
      { x: x - 1, y: y - 1 },
      { x: x - 1, y: y + 1 },
      { x: x + 1, y: y - 1 },
      { x: x + 1, y: y + 1 }
    ]
  }

  reset (data) {
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].length; y++) {
        if (data[x][y] > 9) {
          data[x][y] = 0
        }
      }
    }

    return data
  }

  print (data) {
    for (let x = 0; x < data.length; x++) {
      console.log(data[x].join(''))
    }
  }
}

exports.Task = Task
