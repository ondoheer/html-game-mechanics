import { Entity } from "../Entity.js";

export class NormalBullet extends Entity {
  constructor(x, y) {
    super(x, y);
    this.width = 10;
    this.height = 3;
    this.color = "#fafafa";
    this.speed = 15;
  }

  setTravelSpeedRight() {
    this.xVelocity = this.speed;
  }
  setTravelSpeedLeft() {
    this.yVelocity -= this.speed;
  }
  travel() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  update() {
    this.setTravelSpeedRight();

    this.travel();
  }
}
