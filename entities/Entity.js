import { LEFT_DIRECTION, RIGHT_DIRECTION } from "../config/entities.js";

export class Entity {
  constructor(x, y, width, height, color, speed, direction) {
    this._state = {
      isJumping: false,
      isFalling: false
    };
    this.x = x;
    this.y = y;
    this.yVelocity = 0;
    this.xVelocity = 0;
    this.height = height;
    this.width = width; // this ought to be refactored around to use height and width instead of size
    this.color = color;
    this.speed = speed;
    this.direction = direction;
  }
  getArea() {
    const area = {
      x1: this.x,
      x2: this.x + this.width,
      y1: this.y,
      y2: this.y + this.height
    };
    return area;
  }
  // For diagonals this should be a state machine?
  setTravelSpeed() {
    switch (this.direction) {
      case LEFT_DIRECTION:
        this.xVelocity = -this.speed;
        break;
      case RIGHT_DIRECTION:
        this.xVelocity = this.speed;
        break;
      default:
        break;
    }
  }

  travel() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  update() {
    this.setTravelSpeed();
    this.travel();
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
