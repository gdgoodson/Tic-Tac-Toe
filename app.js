/*
This was orginially written in python and text based.
I based it off a Tic-tac-toe algorithm from someone.
I didn't write who that was when I first did it.
All javascript conversion is my own, as well a couple of tweaks to the algorithm.
*/
document.addEventListener('DOMContentLoaded', () => {
  const boardIDs = ['#top-left', '#top-center', '#top-right', '#middle-left', '#middle-center', '#middle-right', '#bottom-left', '#bottom-center', '#bottom-right']
  const player = 'X'
  const computer = 'O'
  const computerConsole = document.querySelector('.computer-console')
  const buttonClass = '.button'
  const button = document.querySelector(buttonClass)
  const buttonBox = document.querySelector('.button-box')
  const topLeft = document.querySelector(boardIDs[0])
  const topCenter = document.querySelector(boardIDs[1])
  const topRight = document.querySelector(boardIDs[2])
  const middleLeft = document.querySelector(boardIDs[3])
  const middleCenter = document.querySelector(boardIDs[4])
  const middleRight = document.querySelector(boardIDs[5])
  const bottomLeft = document.querySelector(boardIDs[6])
  const bottomCenter = document.querySelector(boardIDs[7])
  const bottomRight = document.querySelector(boardIDs[8])
  const board = [topLeft, topCenter, topRight, middleLeft, middleCenter, middleRight, bottomLeft, bottomCenter, bottomRight]
  let gameOn = false

  // Player selects a space. This also includes all functions that run the game.
  board.forEach(item => {
    item.addEventListener('click', () => {
      if (gameOn) {
        if (item.textContent !== '') {
          computerConsole.innerHTML = 'Square Already Taken'
        } else {
          computerConsole.innerHTML = ''
          item.innerHTML = player
          updateBoard()
          playerWins()
          noWinner()
          if (gameOn) {
            computerPlays(boardState)
            updateBoard()
            computerWins()
            noWinner()
          }
        }
      }
    })
  })

  // Computer move
  function computerMove (bo, move) {
    bo[move].innerHTML = computer
  }

  // This is the state of the board
  let boardState = []
  function updateBoard () {
    boardState = []
    board.forEach(item => {
      boardState.push(item.textContent)
    })
  }

  // Makes dummy copy of board state
  function copyBoard (bo) {
    let shadowB = []
    bo.forEach(item => {
      shadowB.push(item)
    })
    return shadowB
  }

  // Dummy move
  function dummyMove (bo, index, le) {
    bo.splice(index, 1, le)
  }
  // Checks to see if there is a winner
  function checkWinner (bo, le) {
    // top, middle, bottom, lef col, mid col, rig col, 1to9, 7to3
    return bo[0] === le && bo[1] === le && bo[2] === le || bo[3] === le && bo[4] === le && bo[5] === le || bo[6] === le && bo[7] === le && bo[8] === le || bo[0] === le && bo[3] === le && bo[6] === le || bo[1] === le && bo[4] === le && bo[7] === le || bo[2] === le && bo[5] === le && bo[8] === le || bo[0] === le && bo[4] === le && bo[8] === le || bo[6] === le && bo[4] === le && bo[2] === le
  }

  // Is the space open?
  function spaceFree (bo, move) {
    return bo[move] === ''
  }

  // Check if next move is a checkWinner
  function checkIfWinnerNextMove (le) {
    for (var i = 0; i < 9; i++) {
      if (spaceFree(boardState, i)) {
        const copy = copyBoard(boardState)
        dummyMove(copy, i, le)
        if (checkWinner(copy, le)) {
          return true
        }
      }
    }
  }

  // laying out computer logic
  // checking if corners are open
  function checkCorners (bo) {
    for (var i = 0; i < 9; i++) {
      if (i % 2 === 0) {
        if (bo[i] === '') {
          return true
        }
      }
    }
  }

  // Check if sides are open
  function checkSides (bo) {
    for (var i = 0; i < 9; i++) {
      if (i % 2 === 1) {
        if (bo[i] === '') {
          return true
        }
      }
    }
  }
  // Decision tree for computerMove
  function computerPlays (bo) {
    // Can the computer win on the next move?
    if (checkIfWinnerNextMove(computer)) {
      for (var i = 0; i < 9; i++) {
        if (spaceFree(bo, i)) {
          let copy = copyBoard(bo)
          dummyMove(copy, i, computer)
          if (checkWinner(copy, computer)) {
            computerMove(board, i)
            return
          }
        }
      }
    } else if (checkIfWinnerNextMove(player)) {
      // computer blocks player if player can win on next dummyMove
      for (var i = 0; i < 9; i++) {
        if (spaceFree(bo, i)) {
          let copy = copyBoard(bo)
          dummyMove(copy, i, player)
          if (checkWinner(copy, player)) {
            computerMove(board, i)
            return
          }
        }
      }
    } else if (spaceFree(boardState, 4)) {
      // Computer takes middle if open
      computerMove(board, 4)
    } else if (checkCorners(boardState)) {
      // Computer takes corners if topCenter
      while (checkCorners(boardState)) {
        let j = Math.floor(Math.random() * 9)
        if (j % 2 === 0) {
          if (spaceFree(boardState, j)) {
            computerMove(board, j)
            return
          }
        }
      }
    } else {
      while (checkSides(boardState)) {
        let j = Math.floor(Math.random() * 9)
        if (j % 2 === 1) {
          if (spaceFree(boardState, j)) {
            computerMove(board, j)
            return
          }
        }
      }
    }
  } // end ComputerPlays

  // Game winners
  function playerWins () {
    if (checkWinner(boardState, player)) {
      computerConsole.innerHTML = 'You win!'
      gameOn = false
      buttonBox.innerHTML = '<div id="play-again" class="button" onclick="location.reload()">Play Again</div>'
    }
  }

  function computerWins () {
    if (checkWinner(boardState, computer)) {
      computerConsole.innerHTML = 'I win! Great game.'
      gameOn = false
      buttonBox.innerHTML = '<div id="play-again" class="button" onclick="location.reload()">Play Again</div>'
    }
  }
  // No one win
  function noWinner () {
    let count = 0
    for (var i = 0; i < 9; i++) {
      if (spaceFree(boardState, i)) {
        count += 1
      }
    }
    if (count === 0) {
      computerConsole.innerHTML = 'Rats. No one wins.'
      gameOn = false
      buttonBox.innerHTML = '<div id="play-again" class="button" onclick="location.reload()">Play Again</div>'
    }
  }

  // Starting the game
  button.addEventListener('click', startGame)

  function startGame () {
    gameOn = true
    const goFirst = Math.floor(Math.random() * 10)
    if (goFirst % 2 === 0) {
      computerConsole.innerHTML = 'Awesome! You can go first.'
      button.removeEventListener('click', startGame)
      button.innerHTML = ''
    } else {
      computerConsole.innerHTML = 'Great! I will go first.'
      updateBoard()
      computerPlays(boardState)
      button.removeEventListener('click', startGame)
      button.innerHTML = ''
    }
  }
})
