const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split(' | ')).map(row => { return { input: row[0].split(' '), output: row[1].split(' ') } })
  }

  handle (data) {
    let counter = 0
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].output.length; j++) {
        switch (data[i].output[j].length) {
          case 2:
          case 4:
          case 3:
          case 7:
            counter++
            break
        }
      }
    }

    console.log('1,4,7 or 8 appears', counter, 'times')
  }
}

exports.Task = Task
