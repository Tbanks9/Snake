function init() {

  //! DOM variables
  const grid = document.querySelector('.grid')
  const squares = []

  //! Game variables
  const width = 21
  const playerIndex = 215
  const snakeArray = [playerIndex, 214, 213]
  const foodStartIndex = 220
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

  // function play() {
  //   for (var i = 0; i < squares[snakeArray].length; i++) {
  //     snakeArray[i].classList.add('inplay')
  //   }
  // }

  // play()

  for (let i = 0; i < squares.length; i += 21) {
    squares[i].classList.add('leftWall')
  } for (let i = 20; i < squares.length; i += 21) {
    squares[i].classList.add('rightWall')
  } for (let i = 0; i < 21; i++) { // Will figure out a less rubbish way of doing this
    squares[i].classList.add('topWall')
  } for (let i = 420; i <= 440; i++) { // Likewise here
    squares[i].classList.add('bottomWall')
  }

  // function gameOver() {
  // }

  // places snake at the starting position when grid has finished building
  snakeArray.map(index => squares[index].classList.add('snake')) //TODO: adds a three-square snake
  function move(e) {
    if (e.keyCode === 39) { // && playerIndex % width < width - 1
      clear()
      snakeRight = setInterval(moveRight, 200)
      console.log('move right')
    } else if (e.keyCode === 37) { // && playerIndex % width > 0
      clear()
      snakeLeft = setInterval(moveLeft, 200)
      console.log('move left')
    } else if (e.keyCode === 40) { // && playerIndex + width < width * width
      clear()
      snakeDown = setInterval(moveDown, 200)
      console.log('move down')
    } else if (e.keyCode === 38) { // && playerIndex - width >= 0
      clear()
      snakeUp = setInterval(moveUp, 200)
      console.log('move up')
    }
  }
  squares[foodStartIndex].classList.add('food')

  function moveRight() {
    squares.map(square => square.classList.remove('snake'))
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] + 1)
    snakeArray.map(index => squares[index].classList.add('snake'))
    console.log(snakeArray[0])
    if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      squares[snakeArray[0]].classList.remove('food')
      snakeArray.push(snakeArray.length)
      food()
    } if (squares[snakeArray[0]].classList.contains('rightWall')) {
      console.log('gameover')
      clear()
    }
  }

  function moveLeft() {
    squares.map(square => square.classList.remove('snake'))
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] - 1)
    snakeArray.map(index => squares[index].classList.add('snake'))
    console.log(snakeArray[0])
    if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      squares[snakeArray[0]].classList.remove('food')
      snakeArray.push(snakeArray.length)
      food()
    } if (squares[snakeArray[0]].classList.contains('leftWall')) {
      console.log('gameover')
      clear()
    }
  }

  function moveDown() {
    squares.map(square => square.classList.remove('snake'))
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] + width)
    snakeArray.map(index => squares[index].classList.add('snake'))
    console.log(snakeArray[0])
    if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      squares[snakeArray[0]].classList.remove('food')
      snakeArray.push(snakeArray.length)
      food()
    } if (squares[snakeArray[0]].classList.contains('bottomWall')) {
      console.log('gameover')
      clear()
    }
  }

  function moveUp() {
    squares.map(square => square.classList.remove('snake'))
    snakeArray.pop()
    snakeArray.unshift(snakeArray[0] - width)
    snakeArray.map(index => squares[index].classList.add('snake'))
    console.log(snakeArray[0])
    if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      squares[snakeArray[0]].classList.remove('food')
      snakeArray.push(snakeArray.length)
      food()
    } if (squares[snakeArray[0]].classList.contains('topWall')) {
      console.log('gameover')
      clear()
    }
  }

  function food() {
    const foodGenerator = Math.floor(Math.random() * 440)
    if (!squares[foodGenerator].classList.contains('snake')) {
      squares[foodGenerator].classList.toggle('food')
    } else {
      foodGenerator
      food()
    }
  }

  // if (!squares[ranNum].classList.contains('snake')) {
  // } else if (squares[ranNum].classList.contains('snake')) {
  // ranNum = Math.floor(Math.random() * 440)

  // if gameStart, food index is 220
  // else, food is randomly generated
  // if food classlist contains snake classlist, console log "food eaten"
  // Math.floor(Math.random() * 440)

  // function food() {
  //   Math.floor(Math.random() * 440)
  //   if (!playerIndex.classList.contains('inplay')) {
  //     squares.classList.add('food')
  //   } else if (squares.classList.contains('inplay')) {
  //     console.log('hey')
  //     Math.floor(Math.random() * 440)
  //     food()
  //   }
  // }
  // food()

  // function gameStart() {
  //   if (squares === playerIndex) {
  //     console.log('gamestart')
  //   }
  // }
  // TODO: 

  //! event handlers
  window.addEventListener('keydown', move)
}
window.addEventListener('DOMContentLoaded', init)

//! PSEUDOCODE

// TODO: snake
// snake starts being 3 squares long
//// snake moves forward by itself by pressing arrow keys
//// snake's direction is controlled using arrow keys
// snake grows one square everytime it eats food
// snake speeds up everytime it eats

// TODO: snakeFood
// appears on random square as game starts
// each time snake eats one, it adds length to the snake
//// each time snake eats one, the square loses its value
//// food appears on another random square



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
// It's 10 points each time the snake eats something
