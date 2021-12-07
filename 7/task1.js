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
    return data.reduce((totalFuel, crab) => {
      let fuel = position - crab
      if (crab > position) {
        fuel = fuel * -1
      }

      return totalFuel + fuel
    }, 0)
  }
}

exports.Task = Task
