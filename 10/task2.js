const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    data = data.filter(line => this.findCorruptChar(line, false) === null)

    data = data.map(line => this.score(this.findCompletion(line))).sort((a, b) => a - b)

    console.log('Middle score:', data[Math.floor(data.length / 2)])
  }

  score (completion) {
    return completion.reduce((score, char) => {
      score = score * 5
      switch (char) {
        case ']':
          score += 2
          break
        case ')':
          score += 1
          break
        case '}':
          score += 3
          break
        case '>':
          score += 4
          break
      }

      return score
    }, 0)
  }

  findCompletion (line) {
    const starters = ['(', '[', '{', '<']
    const openers = []
    for (let i = 0; i < line.length; i++) {
      if (starters.indexOf(line[i]) !== -1) {
        openers.push(line[i])
      } else {
        openers.pop()
      }
    }

    return openers.map(open => this.closer(open)).reverse()
  }
}

exports.Task = Task
