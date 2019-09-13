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
    if (this.direction === LEFT_DIRECTION) {
      this.xVelocity = -this.speed;
    } else if (this.direction === RIGHT_DIRECTION) {
      this.xVelocity = this.speed;
    }
  }

  travel() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  isColliding(entity) {
    const _thisArea = this.getArea();
    const entityArea = entity.getArea();
    if (
      _thisArea.x1 > entityArea.x1 &&
      _thisArea.x1 < entityArea.x2 &&
      _thisArea.x2 > entityArea.x1 &&
      _thisArea.x2 > entityArea.x1 &&
      _thisArea.y1 > entityArea.y1 &&
      _thisArea.y1 < entityArea.y2 &&
      _thisArea.y2 > entityArea.y1 &&
      _thisArea.y2 < entityArea.y2
    ) {
      console.log("went through");
    }
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
