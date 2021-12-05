const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    const result = []
    data = data.split('\n')
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      let [from, to] = row.split(' -> ')
      from = from.split(',')
      to = to.split(',')
      result.push({
        from: {
          x: parseInt(from[0]),
          y: parseInt(from[1])
        },
        to: {
          x: parseInt(to[0]),
          y: parseInt(to[1])
        }
      })
    }

    return result
  }

  handle (data) {
    data = data.filter(row => row.from.x === row.to.x || row.from.y === row.to.y)

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

  findMax (data, dir) {
    let val = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].from[dir] > val) {
        val = data[i].from[dir]
      }
      if (data[i].to[dir] > val) {
        val = data[i].to[dir]
      }
    }

    return val
  }

  findMatches (x, y, data) {
    // Find all where X matches
    let matches = [...data]
    matches = matches.filter(row => {
      const range = this.findRange(row, 'x')
      return x >= range.start && x <= range.end
    })

    // Find all where Y matches
    matches = matches.filter(row => {
      const range = this.findRange(row, 'y')
      return y >= range.start && y <= range.end
    })

    return matches.length
  }

  findRange (row, dir) {
    let start = 0
    let end = 0
    if (row.from[dir] <= row.to[dir]) {
      start = row.from[dir]
      end = row.to[dir]
    } else {
      start = row.to[dir]
      end = row.from[dir]
    }

    return { start, end }
  }
}

exports.Task = Task
