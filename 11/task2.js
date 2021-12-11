const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    let step = 1
    let allFlash = false
    while (!allFlash) {
      data = data.map(row => row.map(line => line + 1))
      const flashes = []
      let flashedCount = 0
      do {
        flashedCount = this.checkFlashes(data, flashes)
      } while (flashedCount > 0)

      data = this.reset(data)

      if (data.filter(row => row.filter(point => point === 0).length === row.length).length === data.length) {
        allFlash = true
      } else {
        step++
      }
    }

    console.log('All octopuses flash at step', step)
  }
}

exports.Task = Task
