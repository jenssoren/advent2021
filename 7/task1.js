const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split(',').map(num => parseInt(num))
  }

  handle (data) {
    const largest = Math.max(...data)
    let cheapest = null
    for (let i = 0; i <= largest; i++) {
      let fuelCost = 0
      for (let j = 0; j < data.length; j++) {
        if (data[j] < i) {
          fuelCost += i - data[j]
        } else if (data[j] > i) {
          fuelCost += data[j] - i
        }
      }

      if (cheapest == null || fuelCost < cheapest) {
        cheapest = fuelCost
      }
    }

    console.log('Cheapest fuel cost is: ', cheapest)
  }
}

exports.Task = Task
