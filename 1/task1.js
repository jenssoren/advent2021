const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => parseInt(row))
  }

  handle (data) {
    let increments = 0
    for (let i = 1; i < data.length; i++) {
      if (data[i] > data[i - 1]) {
        increments++
      }
    }
    console.log('Increments: ' + increments)
  }
}

exports.Task = Task
