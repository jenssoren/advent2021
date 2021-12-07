const Task1 = require('./task1.js')

class Task extends Task1.Task {
  fuelCost (position, data) {
    let fuelCost = 0
    for (let i = 0; i < data.length; i++) {
      let perCrapFuelCost = 0
      let change = 0
      if (data[i] < position) {
        change += position - data[i]
      } else if (data[i] > position) {
        change += data[i] - position
      }

      for (let i = 0; i <= change; i++) {
        perCrapFuelCost += i
      }

      fuelCost += perCrapFuelCost
    }

    return fuelCost
  }
}

exports.Task = Task
