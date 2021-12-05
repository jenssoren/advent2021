const Task1 = require('./task1.js')

class Task extends Task1.Task {
  handle (data) {
    let numberPos = 0
    let winningBoard = null

    while (!winningBoard && numberPos < data.numbers.length) {
      const number = data.numbers[numberPos]
      const boards = data.boards.filter(board => !board.won)
      for (let i = 0; i < boards.length; i++) {
        let board = boards[i]
        board = this.findNumberOnBoard(board, number)
        if (this.checkIfBoardWon(board, number)) {
          board.won = true
        }

        if (data.boards.filter(board => !board.won).length === 0) {
          winningBoard = board
        }
      }
      numberPos++
    }

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

exports.Task = Task
