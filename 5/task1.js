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
      result.push(this.findLineHits({
        from: {
          x: parseInt(from[0]),
          y: parseInt(from[1])
        },
        to: {
          x: parseInt(to[0]),
          y: parseInt(to[1])
        }
      }))
    }

    return result
  }

  handle (data) {
    data = this.filterData(data)

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
    return data.filter(row => row.dir === 'vertical' || row.dir === 'horizontal')
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
    return data.filter(row => {
      return row.points.filter(point => point.x === x && point.y === y).length >= 1
    }).length
  }

  findLineHits (line) {
    const points = []
    let dir = null
    // if line is vertical
    if (line.from.x === line.to.x) {
      dir = 'vertical'
      let min = 0
      let max = 0
      if (line.from.y <= line.to.y) {
        min = line.from.y
        max = line.to.y
      } else {
        min = line.to.y
        max = line.from.y
      }

      for (let i = min; i <= max; i++) {
        points.push({ x: line.from.x, y: i })
      }
    // if line is horizontal
    } else if (line.from.y === line.to.y) {
      dir = 'horizontal'
      let min = 0
      let max = 0
      if (line.from.x <= line.to.x) {
        min = line.from.x
        max = line.to.x
      } else {
        min = line.to.x
        max = line.from.x
      }

      for (let i = min; i <= max; i++) {
        points.push({ x: i, y: line.from.y })
      }
    // The line is diagonal
    } else {
      dir = 'diagonal'

      let xChange = 1
      let yChange = 1

      if (line.from.x > line.to.x) {
        xChange = -1
      }

      if (line.from.y > line.to.y) {
        yChange = -1
      }

      if (xChange === 1) {
        let startY = line.from.y
        if (yChange === 1) {
          for (let i = line.from.x; i <= line.to.x; i++) {
            points.push({ x: i, y: startY })
            startY++
          }
        } else {
          for (let i = line.from.x; i <= line.to.x; i++) {
            points.push({ x: i, y: startY })
            startY--
          }
        }
      } else {
        let startY = line.from.y
        if (yChange === 1) {
          for (let i = line.from.x; i >= line.to.x; i--) {
            points.push({ x: i, y: startY })
            startY++
          }
        } else {
          for (let i = line.from.x; i >= line.to.x; i--) {
            points.push({ x: i, y: startY })
            startY--
          }
        }
      }
    }
    return {
      points: points,
      dir: dir,
      ...line
    }
  }

  print (data) {
    for (let y = 0; y <= 9; y++) {
      let line = ''
      for (let x = 0; x <= 9; x++) {
        const point = data.filter(row => row.x === x && row.y === y)[0]
        line = line + (point.matches > 0 ? point.matches.toString() : '.')
      }

      console.log(line)
    }
  }
}

exports.Task = Task
