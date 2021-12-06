const Task1 = require('./task1.js')

class Task extends Task1.Task {
  days () {
    return 256
  }
}

exports.Task = Task
