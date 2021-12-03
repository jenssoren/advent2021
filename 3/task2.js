const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    let pos = 0
    let oxygenData = [...data]
    while (oxygenData.length > 1) {
      let bit = this.findBitCriteria(oxygenData, pos, true)
      oxygenData = oxygenData.filter(row => row[pos] == bit)
      pos++
    }

    let oxygenGeneratorRating = parseInt(oxygenData[0].join(""), 2)

    pos = 0
    while (data.length > 1) {
      let bit = this.findBitCriteria(data, pos, false)
      data = data.filter(row => row[pos] == bit)
      pos++
    }

    let scrubberRating = parseInt(data[0].join(""), 2)

    console.log(
      "Oxygen:", oxygenGeneratorRating, "CO2 Scrubber:", scrubberRating, "Answer:", oxygenGeneratorRating * scrubberRating
    )
  }

  findBitCriteria(list, pos, most) {
    let zeroes = 0
    let ones = 0
    for(let i = 0; i < list.length; i++) {
      if (list[i][pos] == "1") {
        ones++
      } else {
        zeroes++
      }
    }

    if (ones > zeroes) {
      return most ? 1 : 0
    } else if (zeroes > ones) {
      return most ? 0 : 1
    } else {
      return most ? 1 : 0
    }
  }
}

exports.Task = Task
