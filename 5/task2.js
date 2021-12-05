const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    data = this.filterData(data)

    console.log('Hit here')

    const maxX = this.findMax(data, 'x')
    const maxY = this.findMax(data, 'y')

    const card = []

    for (let x = 0; x <= maxX; x++) {
      for (let y = 0; y <= maxY; y++) {
        const matches = this.findMatches(x, y, data)
        card.push({
          x, y, matches
        })
      }
    }

    console.log('More the 2 matches: ', card.filter(point => point.matches >= 2).length)
  }

  filterData (data) {
    return data
  }
}

exports.Task = Task
