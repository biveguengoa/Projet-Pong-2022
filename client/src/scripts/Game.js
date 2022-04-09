import Ball from './Ball.js';
import Paddle from './Paddle.js';
import { io } from 'socket.io-client';




/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  #socket;

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.paddle = new Paddle(40, this.canvas.height/2, this);
    this.ball = new Ball(this.paddle.y, this.paddle.x, this);
    this.paddle2 = new Paddle(this.canvas.width-60, this.canvas.height/2, this);

    this.#socket = io();
    this.playing = false;
    this.setup();

  }

  get socket() {
    return this.#socket;
  }


  setup() {

    this.socket.on('LimitReached', () => {
      console.log('Vous avez été deconnecté');
      this.displayMessage('There are currently 2 clients connected... Try later !');
      document.getElementById('joinPrivate').disabled = true;
    });

    this.socket.on('welcome', (num) => {
      if (num === 1) {
        this.displayMessage('First');

        //gestion du mouvement de l'adversaire
        this.socket.on('paddle moved up', () => {
          console.log('Other paddle moved up');
          this.moveUpRightPaddle();
        });
    
        this.socket.on('paddle moved down', () => {
          console.log('Other paddle moved down');
          this.moveDownRightPaddle();
        });
    
        this.socket.on('paddle stopped', () => {
          console.log("Other paddle stopped");
          this.paddle2.stopMoving();
        });

        //gestion des points
        this.socket.on('left wall touched', () => {
          this.ball.updateScore2();
        });
        this.socket.on('right wall touched', () => {
          this.ball.updateScore1();
        });

        //this.socket.emit('move the ball');

      }
      else if (num === 2) {
        this.displayMessage('Second');
        this.socket.on('paddle moved up', () => {
          console.log('Other paddle moved up');
          this.moveUpRightPaddle();
        });
    
        this.socket.on('paddle moved down', () => {
          console.log('Other paddle moved down');
          this.moveDownRightPaddle();
        });
    
        this.socket.on('paddle stopped', () => {
          console.log("Other paddle stopped");
          this.paddle2.stopMoving();
        });

         //gestion des points
        this.socket.on('left wall touched', () => {
          this.ball.updateScore2();
        });
        this.socket.on('right wall touched', () => {
          this.ball.updateScore1();
        });

      }

    });

    this.socket.on('game has started', () => this.ball.x = 41);

    this.socket.on('start game', () => this.startGame() );
    this.socket.on('stop game', () => this.stop());

  }

  wantToStart() {
    this.socket.emit('want to start');
  }

  /** display a message to a player */
  displayMessage(msg) {
    document.getElementById('player').textContent = `${msg}`;
  }

  buildMessage(msg) {
    const elt = document.createElement('p');
    const eltMsg = document.createTextNode(msg);
    elt.appendChild(eltMsg);
    return elt;
  }

  informations(msg) {
    document.getElementById('information').appendChild(this.buildMessage(msg));
  }

  moveUpLeftPaddle() {
    this.paddle.moveUp();
  }

  moveDownLeftPaddle() {
    this.paddle.moveDown();
  }

  moveUpRightPaddle() {
    this.paddle2.moveUp();
  }

  moveDownRightPaddle() {
    this.paddle2.moveDown();
  }


  /** start this game animation */
  start() {
    this.animate();
  }
  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }

  /** move then draw the bouncing ball */
  moveAndDraw() {
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paddle.move();
    this.paddle.draw(ctxt);

    this.paddle2.move();
    this.paddle2.draw(ctxt);

    // draw and move the ball
    this.ball.move();
    this.ball.draw(ctxt);

  }



  keyDownActionHandler1(event) {
    switch (event.key) {
      case "ArrowUp" :
      case "Up" :
        this.paddle.moveUp();
        this.socket.emit('up');
        break;
      case "ArrowDown" :
      case "Down" :
        this.paddle.moveDown();
        this.socket.emit('down');
        break;
      case " " :
        this.playing = true;
        //this.start();
        this.socket.emit('move the ball');
        break;
      default : return;
    }
    event.preventDefault();
  }



  keyUpActionHandler(event) {
    switch (event.key) {
        case "ArrowDown":
        case "Down":
          this.paddle.stopMoving();
          this.socket.emit('updown');
          break;
        case "ArrowUp":
        case "Up":
          this.paddle.stopMoving();
          this.socket.emit('updown');
          break;
        default: return;
    }
    event.preventDefault();
}


startGame() {
  console.log('start game');
  if (! this.playing) {
    this.start();
    document.getElementById('start').value = 'Stop';
  }
  else {
    document.getElementById('start').value = 'Jouer';
    this.stop();
  }
  this.playing = ! this.playing;
}


}
