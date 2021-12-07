const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split(',').map(num => parseInt(num))
  }

  handle (data) {
    const largest = Math.max(...data)
    let cheapest = null
    for (let i = 0; i <= largest; i++) {
      const fuelCost = this.fuelCost(i, data)

      if (cheapest == null || fuelCost < cheapest) {
        cheapest = fuelCost
      }
    }

    console.log('Cheapest fuel cost is: ', cheapest)
  }

  fuelCost (position, data) {
    let fuelCost = 0
    for (let i = 0; i < data.length; i++) {
      if (data[i] < position) {
        fuelCost += position - data[i]
      } else if (data[i] > position) {
        fuelCost += data[i] - position
      }
    }

    return fuelCost
  }
}

exports.Task = Task
