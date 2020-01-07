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
  let interval = 250

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
  //   if (squares[snakeArray[0]].classList.contains(snakeArray.length - 1)) {
  //     clear()
  //   }
  // }

  // places snake at the starting position when grid has finished building
  snakeArray.map(index => squares[index].classList.add('snake')) //TODO: adds a three-square snake
  function move(e) {
    if (e.keyCode === 39) { // && playerIndex % width < width - 1
      clear()
      snakeRight = setInterval(moveRight, interval)
      console.log('move right')
    } else if (e.keyCode === 37) { // && playerIndex % width > 0
      clear()
      snakeLeft = setInterval(moveLeft, interval)
      console.log('move left')
    } else if (e.keyCode === 40) { // && playerIndex + width < width * width
      clear()
      snakeDown = setInterval(moveDown, interval)
      console.log('move down')
    } else if (e.keyCode === 38) { // && playerIndex - width >= 0
      clear()
      snakeUp = setInterval(moveUp, interval)
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
    for (let i = 3; i < snakeArray.length; i++) {
      const head = snakeArray[0]
      const body = snakeArray[i]
      if (head === body) {
        console.log('snake hit')
        clear()
      }
    } if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      console.log('snake speed up')
      interval = (interval - 1)
      console.log(interval)
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
    for (let i = 3; i < snakeArray.length; i++) {
      const head = snakeArray[0]
      const body = snakeArray[i]
      if (head === body) {
        console.log('snake hit')
        clear()
      }
    }
    if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      interval = (interval - 1)
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
    for (let i = 3; i < snakeArray.length; i++) {
      const head = snakeArray[0]
      const body = snakeArray[i]
      if (head === body) {
        console.log('snake hit')
        clear()
      }
    }
    if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      interval = (interval - 1)
      squares[snakeArray[0]].classList.remove('food')
      snakeArray.push(snakeArray.length)
      food()
    }  if (squares[snakeArray[0]].classList.contains('bottomWall')) {
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
    for (let i = 3; i < snakeArray.length; i++) {
      const head = snakeArray[0]
      const body = snakeArray[i]
      if (head === body) {
        console.log('snake hit')
        clear()
      }
    }
    if (squares[snakeArray[0]].classList.contains('food')) {
      console.log('food eaten')
      console.log(squares[snakeArray[0]])
      interval = (interval - 1)
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

  // function snakeSpeedUp() {
  //   if (squares[snakeArray[0]].classList.contains('food')) {
  //     console.log('snake speed up')
  //     snakeRight--
  //   }
  // }
  // snakeSpeedUp()

  // function gameStart() {
  //   if (squares === playerIndex) {
  //     console.log('gamestart')
  //   }
  // }

  // TODO: 

  //! EVENT HANDLERS
  window.addEventListener('keydown', move)
}
window.addEventListener('DOMContentLoaded', init)

//! PSEUDOCODE

// TODO: snake
// snake speeds up everytime it eats

// TODO: snakeFood

// TODO: gameOver
// Displays 'gameover' message 
// Displays 'Press any key to restart the game
// 


//! GameOver function
// If Snake hits self
// Or snake hits wall
// Display gameOver

//! Game rules
// It's 10 points each time the snake eats something
