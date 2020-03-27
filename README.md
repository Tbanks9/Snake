# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 

# Software Engineering Immersive: Project 1

This is my first project completed during the General Assembly Software Engineering Immersive course (Week 4).

---

# Snake

This project is a browser version of the classic game Snake, built using Vanilla JavaScript

## Built using

1. HTML5
   * Audio
2. CSS3
   * Animation
3. JavaScript
4. GitHub

## Deployment

The game is deployed on GitHub Pages, and can be found here: https://snake-project.herokuapp.com/

## Getting started

Use the clone button to download the game source code. Open the index.html file in your browser, and the game should start. If not, check your console for any issues. The images used in this game are stored in the images folder and are all png files.

## Game Architecture

Snake is a single player game where user moves around, eats, and essentially tries to survive the gameplay for as long as they can. 

As the player eats, the snake increases size and speeds up. If the snake collides with either itself or the walls of the playing grid, it's game-over.

![Snake screenshot 1](/assets/Snake-1.png)

To start the game, the player can use the left, right, up and down arrows to move the snake around the game screen. Once an apple is eaten, another is randomly spawned elsewhere in the 225 squares within the player grid (Excluding the snake).

Below is an example code snippet for the following:

* Movement of the snake (Right direction in this example)
* The snake increasing size and speeding up
* The food respawning elsewhere on the playing grid
* The score tally increasing by 10 points each time the snake eats

```
  function snakeSpeedUp() {
    console.log('snake speed up')
    interval = (interval - 1)
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
```

As you can also see above, if the snake collides with either itself or the walls of the playing grid, it's game-over.

Once the game ends, the following is displayed:

* An overall score
* Option to submit your score
* Option to play again

![Snake screenshot 2](/assets/Snake-2.png)

## Challenges and future improvements

1. Implementing a leaderboard took some time, and although I would've ideally liked a feature where you can submit more than one entry along with a username, due to time I opted for having the option to display the overall highest score instead.

2. The Pause and Replay buttons are sometimes sticky, and require hovering the mouse away from the button before clicking for it to work properly. A future improvement for me would be to identify and fix this issue.

3. Some functions can be broken up (Move functions as seen in the above code snippet for example). I would ideally have the snake increasing size as its own function to avoid repeating code.




