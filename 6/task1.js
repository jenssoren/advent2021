const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split(',').map(num => parseInt(num))
  }

  days () {
    return 80
  }

  handle (data) {
    for (let i = 0; i < this.days(); i++) {
      let add = 0
      for (let j = 0; j < data.length; j++) {
        data[j]--
        if (data[j] < 0) {
          data[j] = 6
          add++
        }
      }

      for (let k = 0; k < add; k++) {
        data.push(8)
      }

      console.log('After', i + 1, 'theres is', data.length, 'Lanternfish')
    }
  }
}

exports.Task = Task
