const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n')
      .map(row => row.split(''))
  }

  handle (data) {
    let gamma = ''
    let epsilon = ''

    for (let j = 0; j <= 11; j++) {
      let ones = 0
      let zeroes = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i][j] == "1") {
          ones++
        } else {
          zeroes++
        }
      }

      if (ones > zeroes) {
        gamma = gamma + "1"
        epsilon = epsilon + "0"
      } else {
        gamma = gamma + "0"
        epsilon = epsilon + "1"
      }
    }

    gamma = parseInt(gamma, 2)
    epsilon = parseInt(epsilon, 2)

    console.log("Gamma is: " + gamma, " Epsilon: " + epsilon, "Answer: ", epsilon * gamma)
  }
}

exports.Task = Task
