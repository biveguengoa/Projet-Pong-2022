import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 8;
const SHIFT_Y = 4;


/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
    this.moving = false;
    this.score1 = 0;
    this.score2 = 0;
  }

  isMoving() {
    return this.moving;
  }


  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.y <= 0 || this.y+this.height >= this.theGame.canvas.height) {
      this.shiftY = - this.shiftY;    // rebond en haut ou en bas
    }

    if (this.x <= 0 ) {
      this.stopMoving();
      this.theGame.socket.emit('collision with left wall');
      this.redrawBall();
    }

    if (this.x + this.width >= this.theGame.canvas.width ) {
      this.stopMoving();
      this.theGame.socket.emit('collision with right wall');
      this.redrawBall();
    }
    // collision avec la raquette de gauche
    if (this.collisionWith(this.theGame.paddle)) {
      this.rebond(this.theGame.paddle);
    }
    // collision avec la raquette de droite
    if (this.collisionWith(this.theGame.paddle2)) {
      this.rebond(this.theGame.paddle2);
    }
    super.move();
  }

  stopMoving() {
    super.stopMoving();
    this.moving = false;
  }

  

  collisionWith(paddle) {
    const p1 = {
      x1 : Math.max(this.x, paddle.x),
      y1 : Math.max(this.y, paddle.y)
    };

    const p2 = {
      x2 : Math.min(this.x + this.width, paddle.x + paddle.width),
      y2 : Math.min(this.y + this.width, paddle.y + paddle.height)
    };

    return (p1.x1 < p2.x2 && p1.y1 < p2.y2);

  }

  rebond(paddle) {
    if(this.collisionWith(paddle)) {
      this.shiftX = - this.shiftX;
    }
  }

  redrawBall()  {
    this.x = 50; //this.theGame.canvas.width/2;
    this.shiftY = SHIFT_Y;
    this.shiftX = SHIFT_X;
    this.moving = false;
  }

  updateScore1() {
    this.score1 += 1;
    document.querySelector("#score1").innerHTML = this.score1;
  }

  updateScore2() {
    this.score2 += 1;
    document.querySelector("#score2").innerHTML = this.score2;
  }


}
