const fs = require('fs').promises

class Base {
  constructor (filename) {
    this.filename = filename
  }

  loadInput (filename) {
    return fs.readFile(filename, 'utf8')
  }

  parseInput (data) {
    return data.split('\n')
  }

  handle () {
    console.error('MISSING IMPLMENTATION OF HANDLE')
  }

  async run () {
    this.handle(this.parseInput((await this.loadInput(this.filename))))
  }
}

exports.Base = Base
