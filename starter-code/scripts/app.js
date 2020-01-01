function init() {
  //!  dom variables
  const grid = document.querySelector('.grid')
  const squares = []
  // let snake = [squares[213], squares[214], squares[215]]
  // const squares = document.querySelectorAll('.squares')
  // const cell = document.createElement('div')
  // cell.classList.add('cell')

  //! game variables
  const width = 21
  let playerIndex = 215
  let snakeUp
  let snakeRight
  let snakeDown
  let snakeLeft

  function clear() {
    clearInterval(snakeUp)
    clearInterval(snakeRight)
    clearInterval(snakeDown)
    clearInterval(snakeLeft)
  }

  function move(e) {
    if (e.keyCode === 39) {
      clear()
      snakeRight = setInterval(moveRight, 1000)
    } else if (e.keyCode === 37) {
      clear()
      snakeLeft = setInterval(moveLeft, 1000)
    } else if (e.keyCode === 40) {
      clear()
      snakeDown = setInterval(moveDown, 1000)
    } else if (e.keyCode === 38) {
      clear()
      snakeUp = setInterval(moveUp, 1000)
    }
  }

  const square = document.createElement('div')
  function moveRight() {
    square.classList.add('snake')
    console.log('move right')
  }
  function moveLeft() {
    console.log('move left')
  }
  function moveDown() {
    console.log('move down')
  }
  function moveUp() {
    console.log('move up')
  }

  // loop as many times as width times the width to fill the grid
  Array(width * width).join('.').split('.').forEach(() => {
    //! create 
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  // places snake at the starting position when grid has finished building
  squares[playerIndex].classList.add('snake')
  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 39:
        if (playerIndex % width < width - 1) {
          playerIndex++
        }
        break
      case 37:
        if (playerIndex % width > 0) {
          playerIndex--
        }
        break
      case 40:
        if (playerIndex + width < width * width) {
          playerIndex += width
        }
        break
      case 38:
        if (playerIndex - width >= 0) {
          playerIndex -= width
        }
        break
      default:
        console.log('player shouldnt move')
    }
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    console.log('current snake index is', playerIndex)
  }

  // function gameStart() {
  // }

  //! event handlers
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keydown', move)

}
window.addEventListener('DOMContentLoaded', init)

//! PSEUDOCODE

// TODO: snake
// snake starts being 3 squares long
// snake moves forward by itself
// snake's direction is controlled using arrow keys
// snake grows one square everytime it eats
// snake speeds up everytime it eats

// TODO: snakeFood
// appears on random square as game starts
// each time snake eats one, it adds length to the snake
// each time snake eats one, the square loses its value
// food appears on another random square



// TODO: gameOver
// Displays 'gameover' message 
// Displays 'Press any key to restart the game
// 


//! GameOver function
// If Snake hits self
// Or snake hits wall
// Display gameOver

//! Game rules
// Snake cannot hit the border (Game ends there)
// Snake cannot hit itself
// Snake speeds up each time it eats
// It's 100 points each time the snake eats something
// 
