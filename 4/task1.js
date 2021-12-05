const { Base } = require('../lib/base.js')

class Task extends Base {
  parseInput (data) {
    data = data.split('\n\n')
    // console.log(data)

    const result = {
      numbers: data[0].split(',').map(num => parseInt(num)),
      boards: []
    }

    for (let i = 1; i < data.length; i++) {
      const board = {
        id: i,
        numbers: []
      }
      const rows = data[i].split('\n')
      for (let j = 0; j < rows.length; j++) {
        const numbers = rows[j].split(' ')
        let col = 0
        for (let k = 0; k < numbers.length; k++) {
          if (isNaN(parseInt(numbers[k]))) {
            continue
          }

          board.numbers.push({
            number: parseInt(numbers[k]),
            row: j,
            col: col,
            marked: false
          })
          col++
        }
      }

      result.boards.push(board)
    }

    return result
  }

  handle (data) {
    let numberPos = 0
    let winningBoard = null

    while (!winningBoard && numberPos < data.numbers.length) {
      const number = data.numbers[numberPos]
      for (let i = 0; i < data.boards.length; i++) {
        let board = data.boards[i]
        board = this.findNumberOnBoard(board, number)
        if (this.checkIfBoardWon(board, number)) {
          winningBoard = board
        }
      }
      numberPos++
    }

    if (winningBoard) {
      const answer = winningBoard.numbers.filter(num => !num.marked).reduce((prev, current) => { return prev + current.number }, 0) * data.numbers[numberPos - 1]

      console.log(
        'Winning board is: ',
        winningBoard.id,
        ' Unmarked numbers is: ',
        winningBoard.numbers.filter(num => !num.marked),
        ' Last number was: ',
        data.numbers[numberPos - 1],
        ' Answer is: ',
        answer
      )
    }
  }

  findNumberOnBoard (board, number) {
    for (let i = 0; i < board.numbers.length; i++) {
      if (board.numbers[i].number === number && board.numbers[i].marked === false) {
        board.numbers[i].marked = true
      }
    }

    return board
  }

  checkIfBoardWon (board) {
    const marked = board.numbers.filter(num => num.marked)
    let hasWon = false
    for (let i = 0; i < marked.length; i++) {
      // Check if row is marked
      const row = board.numbers.filter(num => num.row === marked[i].row)
      const hasWonOnRow = row.length === row.filter(num => num.marked).length
      // Check if col is marked
      const col = board.numbers.filter(num => num.col === marked[i].col)
      const hasWonOnCol = col.length === col.filter(num => num.marked).length

      if (hasWonOnRow || hasWonOnCol) {
        hasWon = true
      }
    }

    return hasWon
  }
}

exports.Task = Task
