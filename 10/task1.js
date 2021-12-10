const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split(''))
  }

  handle (data) {
    const corruptedChars = []
    for (let i = 0; i < data.length; i++) {
      const corruptedChar = this.findCorruptChar(data[i], i)
      if (corruptedChar) {
        corruptedChars.push(corruptedChar)
      }
    }

    const answer = corruptedChars.reduce((total, corruptedChar) => {
      let points = 0
      switch (corruptedChar) {
        case ')':
          points = 3
          break
        case ']':
          points = 57
          break
        case '}':
          points = 1197
          break
        case '>':
          points = 25137
          break
      }

      return total + points
    }, 0)

    console.log('Error score', answer)
  }

  findCorruptChar (line) {
    const starters = ['(', '[', '{', '<']
    const openers = []
    let found = null
    for (let i = 0; i < line.length; i++) {
      if (found) {
        continue
      }

      if (starters.indexOf(line[i]) !== -1) {
        openers.push(line[i])
      } else {
        const open = openers.pop()
        if (this.expect(line[i]) !== open) {
          found = line[i]
        }
      }
    }

    if (found) {
      console.log('Found', found)
    }

    return found
  }

  expect (start) {
    switch (start) {
      case ')':
        return '('
      case ']':
        return '['
      case '}':
        return '{'
      case '>':
        return '<'
      default:
        console.log('Start is', start)
    }

    return ''
  }
}

exports.Task = Task
