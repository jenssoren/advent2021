const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split(',').map(num => parseInt(num))
  }

  days () {
    return 80
  }

  handle (data) {
    let fish = new Array(9).fill(0)

    for (let i = 0; i < data.length; i++) {
      fish[data[i]] += 1
    }

    for (let i = 0; i < this.days(); i++) {
      const daysFish = new Array(9).fill(0)
      for (let j = 0; j < fish.length; j++) {
        if (j === 0) {
          daysFish[8] = fish[j]
        } else {
          daysFish[j - 1] = fish[j]
        }
      }
      daysFish[6] += daysFish[8]
      fish = daysFish

      console.log('After', i + 1, 'theres is', fish.reduce((count, fish) => count + fish, 0), 'Lanternfish')
    }
  }
}

exports.Task = Task
