const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    let horizontal = 0
    let depth = 0
    let aim = 0

    for (let i = 0; i < data.length; i++) {
      switch (data[i].instruction) {
        case 'forward':
          horizontal += data[i].ammount
          depth += data[i].ammount * aim
          break
        case 'up':
          aim -= data[i].ammount
          break
        case 'down':
          aim += data[i].ammount
          break
        default:
          console.log('Unknown instruction: ' + data[i].instruction)
          break
      }
    }

    console.log('Horizontal: ' + horizontal + ' Depth: ' + depth + ' Answer: ' + horizontal * depth)
  }
}

exports.Task = Task
