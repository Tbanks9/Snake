function init() {

  //! DOM variables
  const grid = document.querySelector('.grid')
  const squares = []

  //! Game variables
  const width = 21
  // let playerIndex = [215, 214, 213] //TODO: for three-squared snake
  let playerIndex = 215
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

  function play() {
    for (var i = 0; i < playerIndex.length; i++) {
      playerIndex[i].classList.add('inplay')
    }
  }

  play()

  for (let i = 0; i < squares.length; i += 21) {
    squares[i].classList.add('leftWall')
  } for (let i = 20; i < squares.length; i += 21) {
    squares[i].classList.add('rightWall')
  } for (var i = 0; i < 21; i++) { // Will figure out a less rubbish way of doing this
    squares[i].classList.add('topWall')
  } for (let i = 420; i <= 440; i++) { // Likewise here
    squares[i].classList.add('bottomWall')
  }

  function gameOver() {
  }


  // places snake at the starting position when grid has finished building
  // playerIndex.forEach(index => squares[index].classList.add('snake')) //TODO: adds a three-square snake
  squares[playerIndex].classList.add('snake')
  function move(e) {
    if (e.keyCode === 39 && playerIndex % width < width - 1) {
      clear()
      snakeRight = setInterval(moveRight, 200)
      console.log('move right')
    } else if (e.keyCode === 37 && playerIndex % width > 0) {
      clear()
      snakeLeft = setInterval(moveLeft, 200)
      console.log('move left')
    } else if (e.keyCode === 40 && playerIndex + width < width * width) {
      clear()
      snakeDown = setInterval(moveDown, 200)
      console.log('move down')
    } else if (e.keyCode === 38 && playerIndex - width >= 0) {
      clear()
      snakeUp = setInterval(moveUp, 200)
      console.log('move up')
    }
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    // playerIndex.forEach(index => squares[index].classList.add('snake'))
    // playerIndex.classList.add('snake')
  }

  function moveRight() {
    playerIndex++
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    const tail = 0
    for (let i = 0; i < squares[tail].length - 1; i++) {
      this.tail[i] = this.tail[i + 1]
    }
    if (squares[playerIndex].classList.contains('food')) {
      console.log('food eaten')
      squares[playerIndex].classList.remove('food')
      squares.push(playerIndex.tail)
      food()
    } if (squares[playerIndex].classList.contains('rightWall')) {
      console.log('gameover')
      clear()
    }
    console.log('current snake index is', playerIndex)
  }

  function moveLeft() {
    playerIndex--
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    if (squares[playerIndex].classList.contains('food')) {
      console.log('food eaten')
      squares[playerIndex].classList.remove('food')
      food()
    } if (squares[playerIndex].classList.contains('leftWall')) {
      console.log('gameover')
      clear()
    }
    // playerIndex.forEach(index => squares[index].classList.add('snake'))
    console.log('current snake index is', playerIndex)
  }

  function moveDown() {
    playerIndex += width
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    if (squares[playerIndex].classList.contains('food')) {
      console.log('food eaten')
      squares[playerIndex].classList.remove('food')
      food()
    } if (squares[playerIndex].classList.contains('bottomWall')) {
      console.log('gameover')
      clear()
      gameOver()
    }
    // playerIndex.forEach(index => squares[index].classList.add('snake'))
    // squares[playerIndex].classList.add('snake')
    console.log('current snake index is', playerIndex)
  }

  function moveUp() {
    playerIndex -= width
    squares.forEach(square => square.classList.remove('snake'))
    squares[playerIndex].classList.add('snake')
    if (squares[playerIndex].classList.contains('food')) {
      console.log('food eaten')
      squares[playerIndex].classList.remove('food')
      food()
    } if (squares[playerIndex].classList.contains('topWall')) {
      console.log('gameover')
      clear()
    }
    // playerIndex.forEach(index => squares[index].classList.add('snake'))
    // squares[playerIndex].classList.add('snake')
    console.log('current snake index is', playerIndex)
  }

  food()
  function food() {
    if (playerIndex === 215) {
      squares[foodStartIndex].classList.add('food')
    } else {
      const foodGenerator = Math.floor(Math.random() * 440)
      squares[foodGenerator].classList.toggle('food')
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
