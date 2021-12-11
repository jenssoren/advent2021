const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split('').map(point => Number(point)))
  }

  handle (data) {
    const steps = 100
    let totalFlashedCount = 0
    for (let i = 0; i < steps; i++) {
      data = data.map(row => row.map(line => line + 1))
      const flashes = []
      let flashedCount = 0
      do {
        flashedCount = this.checkFlashes(data, flashes)
        totalFlashedCount += flashedCount
      } while (flashedCount > 0)

      data = this.reset(data)
    }

    console.log('Total flashes: ', totalFlashedCount)
  }

  checkFlashes (data, flashed) {
    let flashedCount = 0
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].length; y++) {
        if (this.flash(x, y, data, flashed) === true) {
          flashedCount++
        }
      }
    }

    return flashedCount
  }

  flash (x, y, data, flashed) {
    if (data[x][y] <= 9) {
      return false
    }

    if (flashed[x] === undefined) {
      flashed[x] = {}
    }

    if (flashed[x][y]) {
      return false
    }

    flashed[x][y] = true

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
