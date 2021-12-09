const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split('').map(point => parseInt(point)))
  }

  handle (data) {
    const lowPoints = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (this.isLow(i, j, data)) {
          lowPoints.push(data[i][j])
        }
      }
    }

    console.log('Low points sum of risk', lowPoints.reduce((sum, point) => { return sum + point + 1 }, 0))
  }

  isLow (x, y, data) {
    let lowerThenUp = false
    let lowerThenDown = false
    let lowerThenLeft = false
    let lowerThenRight = false
    // Check up

    if (x === 0) {
      lowerThenUp = true
    } else {
      lowerThenUp = data[x][y] < data[x - 1][y]
    }

    // Check down
    if (x === data.length - 1) {
      lowerThenDown = true
    } else {
      lowerThenDown = data[x][y] < data[x + 1][y]
    }

    // Check left
    if (y === 0) {
      lowerThenLeft = true
    } else {
      lowerThenLeft = data[x][y] < data[x][y - 1]
    }

    // Check down
    if (y === data[x].length - 1) {
      lowerThenRight = true
    } else {
      lowerThenRight = data[x][y] < data[x][y + 1]
    }

    return lowerThenUp && lowerThenDown && lowerThenLeft && lowerThenRight
  }
}

exports.Task = Task
