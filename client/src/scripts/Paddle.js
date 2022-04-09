import Mobile from './Mobile.js';
import MoveState from './moveState.js';

const RAQUETTE_IMAGE =  './images/paddle.png';

export default class Paddle extends Mobile {

    constructor(x, y, theGame) {
      super(x, y, RAQUETTE_IMAGE, 0, 8);
      this.moving = MoveState.NONE;
      this.theGame = theGame;
    }

    get up() { 
      return this.moving === MoveState.UP;
    }
    
    get down() {  
      return this.moving === MoveState.DOWN;
    }
       
    moveUp(){
      this.shiftY = -10;
      this.moving = MoveState.UP;
    }
       
       
    moveDown() {
      this.shiftY = +10;
      this.moving = MoveState.DOWN;
    }
    
    stopMoving() {
      this.moving = MoveState.NONE;
    }
    

    move() {
      if (this.moving === MoveState.UP) {
        this.y = Math.max(0, this.y + this.shiftY)
      }
      if (this.moving === MoveState.DOWN) {
        this.y = Math.min(this.theGame.canvas.height - this.height, this.y + this.shiftY);
      }
    }

}