const Task1 = require('./task1.js')

class Task extends Task1.Task {
  fuelCost (position, data) {
    return data.reduce((totalFuel, crab) => {
      let fuel = position - crab
      if (crab > position) {
        fuel = fuel * -1
      }

      return totalFuel + (fuel * (fuel + 1) / 2)
    }, 0)
  }
}

exports.Task = Task
