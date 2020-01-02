function init() {
  //!  dom variables
  const grid = document.querySelector('.grid')
  const squares = []

  //! game variables
  const width = 21
  let playerIndex = [215, 214, 213]
  let snakeUp
  let snakeRight
  let snakeDown
  let snakeLeft

  // loop as many times as width times the width to fill the grid
  Array(width * width).join('.').split('.').forEach(() => {
    //! create 
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  function clear() {
    clearInterval(snakeUp)
    clearInterval(snakeRight)
    clearInterval(snakeDown)
    clearInterval(snakeLeft)
  }

  // if gameStart, food index is 220
  // else, food is randomly generated
  // if food classlist contains snake classlist, console log "food eaten"
  // food()
  // function food() {
  //   Math.floor(Math.random() * 440)
  //   squares.classList('food')
  //   console.log('food')
  // }

  // places snake at the starting position when grid has finished building
  squares[playerIndex].classList.add('snake')
  function move(e) {
    if (e.keyCode === 39 && playerIndex % width < width - 1) {
      clear()
      snakeRight = setInterval(moveRight, 200)
    } else if (e.keyCode === 37 && playerIndex % width > 0) {
      clear()
      snakeLeft = setInterval(moveLeft, 200)
    } else if (e.keyCode === 40 && playerIndex + width < width * width) {
      clear()
      snakeDown = setInterval(moveDown, 200)
    } else if (e.keyCode === 38 && playerIndex - width >= 0) {
      clear()
      snakeUp = setInterval(moveUp, 200)
    }
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    console.log('current snake index is', playerIndex)
  }

  function moveRight() {
    playerIndex++
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    console.log('move right')
    console.log('current snake index is', playerIndex)
  }

  function moveLeft() {
    playerIndex--
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    console.log('move left')
    console.log('current snake index is', playerIndex)
  }

  function moveDown() {
    playerIndex += width
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    console.log('move down')
    console.log('current snake index is', playerIndex)
  }

  function moveUp() {
    playerIndex -= width
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    console.log('move up')
    console.log('current snake index is', playerIndex)
  }

  // function gameStart() {
  //   if (squares === playerIndex) {
  //     console.log('gamestart')
  //   }
  // }
  // TODO: 

  //! event handlers
  window.addEventListener('keydown', move)
  // window.addEventListener('keydown', gameStart)
  // window.addEventListener('keydown', food)
}
window.addEventListener('DOMContentLoaded', init)

//! PSEUDOCODE

// TODO: snake
// snake starts being 3 squares long
// snake moves forward by itself by pressing arrow keys
// snake's direction is controlled using arrow keys
// snake grows one square everytime it eats food
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
