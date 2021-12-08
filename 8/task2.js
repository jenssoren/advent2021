const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    return data
      .split('\n')
      .map(row => row.split(' | '))
      .map(row => {
        return {
          input: row[0].split(' ').map(input => input.split('').sort().join('')),
          output: row[1].split(' ').map(output => output.split('').sort().join(''))
        }
      })
  }

  handle (data) {
    data = data.map(row => {
      let output = ''
      const map = this.findSegmentMap(row.input)
      for (let i = 0; i < row.output.length; i++) {
        if (map[row.output[i]] !== undefined) {
          output += map[row.output[i]].toString()
        } else {
          console.error('Cant translate segment')
        }
      }
      console.log(row.output.join(' '), ':', output)
      return parseInt(output)
    })

    const answer = data.reduce((total, cur) => { return total + cur }, 0)
    console.log('Sum of output is: ', answer)
  }

  findSegmentMap (data) {
    const segments = {
      top: null,
      ltop: null,
      lbottom: null,
      rtop: null,
      rbottom: null,
      middle: null,
      bottom: null
    }

    segments.top = this.findTop(data, segments)
    segments.bottom = this.findBottom(data, segments)
    segments.lbottom = this.findLBottom(data, segments)
    segments.middle = this.findMiddle(data, segments)
    segments.ltop = this.findLTop(data, segments)
    segments.rtop = this.findRTop(data, segments)
    segments.rbottom = this.findRBottom(data, segments)

    const segmentsMap = {}
    segmentsMap[this.findSegmentKey(segments.top + segments.rtop + segments.rbottom + segments.ltop + segments.lbottom + segments.bottom)] = 0
    segmentsMap[this.findSegmentKey(segments.rtop + segments.rbottom)] = 1
    segmentsMap[this.findSegmentKey(segments.top + segments.rtop + segments.lbottom + segments.bottom + segments.middle)] = 2
    segmentsMap[this.findSegmentKey(segments.top + segments.rtop + segments.rbottom + segments.bottom + segments.middle)] = 3
    segmentsMap[this.findSegmentKey(segments.rtop + segments.rbottom + segments.ltop + segments.middle)] = 4
    segmentsMap[this.findSegmentKey(segments.top + segments.rbottom + segments.ltop + segments.bottom + segments.middle)] = 5
    segmentsMap[this.findSegmentKey(segments.top + segments.rbottom + segments.ltop + segments.lbottom + segments.bottom + segments.middle)] = 6
    segmentsMap[this.findSegmentKey(segments.rtop + segments.rbottom + segments.top)] = 7
    segmentsMap[this.findSegmentKey(segments.top + segments.rtop + segments.rbottom + segments.ltop + segments.lbottom + segments.bottom + segments.middle)] = 8
    segmentsMap[this.findSegmentKey(segments.top + segments.rtop + segments.rbottom + segments.ltop + segments.bottom + segments.middle)] = 9

    return segmentsMap
  }

  findTop (data, segments) {
    // Diff between one with 2 length and 3 length
    const one = data.filter(row => row.length === 2)[0]
    const seven = data.filter(row => row.length === 3)[0]

    return this.getDifference(one, seven)
  }

  findLTop (data, segments) {
    // 4 - 1 - middle = X (3)

    // Find 4 by selecting the one with length of 4
    const four = data.filter(row => row.length === 4)[0].split('').sort().join('')
    // Find 1
    const one = data.filter(row => row.length === 2)[0].split('').sort().join('')
    // Add middle to 0
    let compare = one.split('')
    compare.push(segments.middle)
    compare = compare.sort().join('')

    return this.getDifference(compare, four)
  }

  findLBottom (data, segments) {
    // Diff between 8 and 9
    // Find 8
    const eight = data.filter(row => row.length === 7)[0]

    // Find 4 by selecting the one with length of 4
    const four = data.filter(row => row.length === 4)[0]

    // Add top and bottom to 4
    const compare = four.split('')
    compare.push(segments.top)
    compare.push(segments.bottom)

    // Now we got nine
    const nine = compare.sort().join('')

    return this.getDifference(nine, eight)
  }

  findRTop (data, segments) {
    // 8 - one part of 1. If result is 6 Then result is the RTop else it's the other part

    // Find 8
    const eight = data.filter(row => row.length === 7)[0]

    // Find 1
    const one = data.filter(row => row.length === 2)[0].split('')

    // Remove on part of 1 from 8
    let compare = eight.split('')
    compare = compare.filter(part => part !== one[0])
    compare = compare.sort().join('')

    if (data.filter(row => row.split('').sort().join('') === compare).length === 1) {
      return one[0]
    } else {
      return one[1]
    }
  }

  findRBottom (data, segments) {
    // This is the last segment, so add the other ones together and find the diff with 8

    const compare = [segments.top, segments.bottom, segments.lbottom, segments.middle, segments.ltop, segments.rtop].sort().join('')

    // Find 8
    const eight = data.filter(row => row.length === 7)[0].split('').sort().join('')

    return this.getDifference(compare, eight)
  }

  findMiddle (data, segments) {
    // Diff between 8 and 0
    // Find 0

    // Find 8
    const eight = data.filter(row => row.length === 7)[0]
    // Find 1
    const one = data.filter(row => row.length === 2)[0]

    // Find 4 by selecting the one with length of 4
    const four = data.filter(row => row.length === 4)[0]

    // Add top and bottom to 4
    const compare = four.split('')
    compare.push(segments.top)
    compare.push(segments.bottom)

    // Now we got nine
    const nine = compare.sort().join('')

    // Find 0 by selecting all with length of 6
    let zero = data.filter(row => row.length === 6)
    // Remove 9
    zero = zero.filter(row => row !== nine)
    // Remove 6 but selecting the one containing both parts of 1
    zero = zero.filter(row => {
      const oneParts = one.split('')
      return row.split('').indexOf(oneParts[0]) !== -1 && row.split('').indexOf(oneParts[1]) !== -1
    })[0]

    return this.getDifference(zero, eight)
  }

  findBottom (data, segments) {
    // Find 9 by selecting all with length of 6
    let nine = data.filter(row => row.length === 6)
    // Find 4 by selecting the one with length of 4
    const four = data.filter(row => row.length === 4)[0]

    // Add top to 4
    let compare = four.split('')
    compare.push(segments.top)
    compare = compare.sort().join('')
    // Remove 6 and 0
    nine = nine.filter(row => this.getDifference(compare, row).length === 1)[0]

    return this.getDifference(compare, nine)
  }

  getDifference (a, b) {
    let i = 0
    let j = 0
    let result = ''

    while (j < b.length) {
      if (a[i] !== b[j] || i === a.length) {
        result += b[j]
      } else {
        i++
      }
      j++
    }

    return result
  }

  findSegmentKey (key) {
    return key.split('').sort().join('')
  }
}

exports.Task = Task
