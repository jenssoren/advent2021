const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    let increments = 0
    let prevSum = null
    for (let i = 0; i < data.length; i++) {
      let sum = data[i]
      if (i + 1 <= data.length - 1) {
        sum += data[i + 1]
      }
      if (i + 2 <= data.length - 1) {
        sum += data[i + 2]
      }

      if (prevSum) {
        if (sum > prevSum) {
          increments++
        }
      }

      prevSum = sum
    }

    console.log('Increments: ' + increments)
  }
}

exports.Task = Task
