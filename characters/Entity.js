export class Entity {
  constructor(
    x = 0,
    y = 100,
    width,
    height,
    size = CHARACTER_SIZE,
    color = "brown",
    speed = 5
  ) {
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

  update() {}
}
