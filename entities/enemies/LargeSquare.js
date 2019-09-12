import { Entity } from "../Entity;";

class LargeSquare extends Entity {
  constructor(x, y, width, height, color, speed) {
    super(x, y, width, height, color, speed);
    this.hits = 5;
  }

  setTravelSpeedLeft() {
    this.xVelocity -= this.speed;
  }
  travel() {
    this.x += this.xVelocity;
  }

  update() {
    this.setTravelSpeedLeft();
    this.travel();
  }
}
