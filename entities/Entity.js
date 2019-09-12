export class Entity {
  constructor(x, y, width, height, color, speed) {
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
  }

  //update() {}
}
