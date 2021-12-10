const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data.split('\n').map(row => row.split(''))
  }

  handle (data) {
    const corruptedChars = []
    for (let i = 0; i < data.length; i++) {
      const corruptedChar = this.findCorruptChar(data[i], true)
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

  findCorruptChar (line, debug) {
    const starters = ['(', '[', '{', '<']
    const openers = []
    let expected = null
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
          expected = open
        }
      }
    }

    if (found && debug) {
      console.log('Expected', this.closer(expected), 'but found', found, 'instead')
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

  closer (start) {
    switch (start) {
      case '(':
        return ')'
      case '[':
        return ']'
      case '{':
        return '}'
      case '<':
        return '>'
      default:
        console.log('Start is', start)
    }
  }
}

exports.Task = Task
