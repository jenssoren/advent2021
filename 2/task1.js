const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n')
      .map(row => row.split(' '))
      .map(row => {
        return { instruction: row[0], ammount: parseInt(row[1]) }
      })
  }

  handle (data) {
    let horizontal = 0
    let depth = 0

    for (let i = 0; i < data.length; i++) {
      switch (data[i].instruction) {
        case 'forward':
          horizontal += data[i].ammount
          break
        case 'up':
          depth -= data[i].ammount
          break
        case 'down':
          depth += data[i].ammount
          break
        default:
          console.log('Unkown instruction: ' + data[i].instruction)
          break
      }
    }

    console.log('Horizontal: ' + horizontal + ' Depth: ' + depth + ' Answer: ' + horizontal * depth)
  }
}

exports.Task = Task
