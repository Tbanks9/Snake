function init() {

  //! DOM variables
  const grid = document.querySelector('.grid')
  const score = document.querySelector('.tally')
  const loser = document.querySelector('.game-over')
  const pausePlay = document.querySelector('.pause-game')
  const paused = document.querySelector('.paused')
  const eachScore = document.querySelector('.highScoreList')
  const squares = []

  //! Game variables
  const width = 15
  const biteSound = new Audio('sounds/bite.wav')
  let playerIndex = 108
  let snakeArray = [playerIndex, 107, 106]
  let foodStartIndex = 112
  let snakeUp
  let snakeRight
  let snakeDown
  let snakeLeft
  let interval = 150
  let scoreTally = 0

  //! Create your variables to get your data from local storage 

  // The first one allows you to get the data from local storage so that you can manipulate it however you need to and returns null if there is no data available in local storage
  let storedHighScore = localStorage.getItem('storedHighScore') ? JSON.parse(localStorage.getItem('storedHighScore')) : null
  // The second one gives you a copy of that data which you can display in the browser however you choose to
  const data = JSON.parse(localStorage.getItem('storedHighScore'))

  // Function to set up your page to display your high score  
  function highScoreCreate() {
    const highScore = document.createElement('div')
    highScore.classList.add('high-score')
    highScore.innerHTML = storedHighScore
    eachScore.appendChild(highScore)
  }

  // Function to store your score into local storage - it's up to you at what point in the game to call this function
  function storeScores() {
    if (scoreTally > storedHighScore) { // if the current points value is higher than the value stored in local storage
      storedHighScore = scoreTally // assign storedHighScore to equal the current value of points
      localStorage.setItem('storedHighScore', JSON.stringify(storedHighScore)) // set storedHighScore into local storage
      // this is a key value pair - you are setting the key above and then giving it the value of your latest high score
      highScoreCreate() // this will enable you to display the score immediately if needed
    }
  }
  // Create a function to check if there is any data in local storage when the page is loaded, if so - 
  // display this data using the highScoreCreate function, otherwise - do nothing.
  // Invoke this function immediately so that it is run as soon as the DOM content is loaded   
  function displayHighScore() {
    data ? highScoreCreate(data) : null
  }
  displayHighScore()

  //! FUNCTIONS

  Array(width * width).join('.').split('.').forEach(() => {
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

  function pauseGame(e) {
    if (e.target.classList.contains('pause-game')) {
      console.log('paused')
      clear()
      paused.style.display = 'block'
    }
  }

  function restartGame(e) {
    if (e.target.classList.contains('play-again')) {
      console.log('restart game')
      loser.style.display = 'none'
      playerIndex = 108
      snakeArray = [playerIndex, 107, 106]
      scoreTally = 0
      score.innerHTML = 'Score:' + ' ' + (scoreTally)
      pausePlay.style.display = 'block'
      snakeArray.map(index => squares[index].classList.add('snake'))
      foodStartIndex = 112
      squares[foodStartIndex].classList.add('food')
      interval = 150
      window.addEventListener('keydown', move)
    }
  }

  for (let i = 0; i < squares.length; i += 15) {
    squares[i].classList.add('leftWall')
  } for (let i = 14; i < squares.length; i += 15) {
    squares[i].classList.add('rightWall')
  } for (let i = 0; i < 15; i++) { // Will figure out a less rubbish way of doing this
    squares[i].classList.add('topWall')
  } for (let i = 210; i < 225; i++) { // Likewise here
    squares[i].classList.add('bottomWall')
  }

  function gameOver() {
    pausePlay.style.display = 'none'
    loser.style.display = 'block'
    console.log('gameover')
    score.innerHTML = 'Total Score:' + ' ' + (scoreTally)
    squares.map(square => square.classList.remove('snake'))
    squares.map(square => square.classList.remove('food'))
    window.removeEventListener('keydown', move)
    clear()
  }

  function scoreSubmit(e) {
    if (e.target.classList.contains('score-submit')) {
      console.log('submitted score')
      storeScores()
    }
  }

  // places snake at the starting position when grid has finished building
  snakeArray.map(index => squares[index].classList.add('snake'))
  function move(e) {
    if (e.keyCode === 39) {
      clear()
      snakeRight = setInterval(moveRight, interval)
      console.log('move right')
    } else if (e.keyCode === 37) {
      clear()
      snakeLeft = setInterval(moveLeft, interval)
      console.log('move left')
    } else if (e.keyCode === 40) {
      clear()
      snakeDown = setInterval(moveDown, interval)
      console.log('move down')
    } else if (e.keyCode === 38) {
      clear()
      snakeUp = setInterval(moveUp, interval)
      console.log('move up')
    }
    paused.style.display = 'none'
  }
  squares[foodStartIndex].classList.add('food')
  score.innerHTML = 'Score:' + ' ' + (scoreTally)
  // grass()

  function snakeSpeedUp() {
    console.log('snake speed up')
    interval = (interval - 1)
  }

  function foodEaten() {
    console.log('food eaten')
    console.log(squares[snakeArray[0]])
    score.innerHTML = 'Score:' + ' ' + (scoreTally += 10)
    squares[snakeArray[0]].classList.remove('food')
    snakeArray.push(snakeArray.length)
    biteSound.play()
    food()
  }

  function moveRight() {
    if (squares[snakeArray[0]].classList.contains('rightWall')) {
      gameOver()
    } else {
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
          gameOver()
        }
      } if (squares[snakeArray[0]].classList.contains('food')) {
        foodEaten()
        snakeSpeedUp()
      }
    }
  }

  function moveLeft() {
    if (squares[snakeArray[0]].classList.contains('leftWall')) {
      gameOver()
    } else {
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
          gameOver()
        }
      } if (squares[snakeArray[0]].classList.contains('food')) {
        foodEaten()
        snakeSpeedUp()
      }
    }
  }

  function moveDown() {
    if (squares[snakeArray[0]].classList.contains('bottomWall')) {
      gameOver()
    } else {
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
          gameOver()
        }
      } if (squares[snakeArray[0]].classList.contains('food')) {
        foodEaten()
        snakeSpeedUp()
      }
    }
  }

  function moveUp() {
    if (squares[snakeArray[0]].classList.contains('topWall')) {
      gameOver()
    } else {
      squares.map(square => square.classList.remove('snake'))
      snakeArray.pop()
      snakeArray.unshift(snakeArray[0] - width)
      snakeArray.map(index => squares[index].classList.add('snake'))
      console.log(snakeArray[0])
      for (let i = 3; i <= snakeArray.length; i++) {
        const head = snakeArray[0]
        const body = snakeArray[i]
        if (head === body) {
          console.log('snake hit')
          gameOver()
        }
      } if (squares[snakeArray[0]].classList.contains('food')) {
        foodEaten()
        snakeSpeedUp()
      }
    }
  }

  function food() {
    const foodGenerator = Math.floor(Math.random() * 225)
    if (!squares[foodGenerator].classList.contains('snake')) {
      squares[foodGenerator].classList.add('food')
    } else {
      foodGenerator
      food()
    }
  }

  // function grass() {
  //   const randomGrass = new Set()
  //   while (randomGrass.size < 40) {
  //     const grassGenerator = Math.floor(Math.random() * 225)
  //     randomGrass.add(grassGenerator)
  //     if (!squares[grassGenerator].classList.contains('food')) {
  //       squares[grassGenerator].classList.add('grass')
  //     } else {
  //       grassGenerator
  //     }
  //   }
  // }

  //! EVENT HANDLERS
  window.addEventListener('keydown', move)
  window.addEventListener('click', pauseGame)
  window.addEventListener('click', restartGame)
  window.addEventListener('click', scoreSubmit)
}
window.addEventListener('DOMContentLoaded', init)


// userName.addEventListener('keyup', () => {
//   scoreSubmit.disabled = !userName.value
// })

// const userName = document.querySelector('.username')
// const mostRecentScore = localStorage.getItem('mostRecentScore')
// const maxHighScore = 10

// saveHighScore = e => {
//   console.log('clicked save')
//   e.preventDefault()
//   const hiScore = {
//     hiScore: mostRecentScore,
//     name: userName.value
//   }
//   data.push(hiScore)
//   data.sort((a, b) => b.hiScore - a.hiScore)
//   data.splice(10)
//   console.log(data)

//   localStorage.setItem('storedHighScore', JSON.stringify(data))
// }