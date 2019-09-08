class BulletBase {
  constructor(x, y, width = 15, height = 3, speed = 15, color = "#fafafa") {
    this.speed = speed;
    this.iteration = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;

    this.xVelocity = 0;
    this.yVelocity = 0;
    this.exists = true;
  }
  setTravelSpeedRight() {
    this.xVelocity = this.speed;
  }
  setTravelSpeedLEft() {
    this.yVelocity -= this.speed;
  }
  travel() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
  disable() {
    this.exists = false;
  }
  update() {
    /** va a requerir más funciones como updetear si debería seguir en pantalla */
    if (this.iteration > 0 && this.iteration < 2) {
      this.setTravelSpeedRight();
    }
    this.iteration++;
    this.travel();
    //this.disable();
  }
}

export class NormalBullet extends BulletBase {
  constructor(x, y) {
    super(x, y);
    this.width = 10;
  }
}
