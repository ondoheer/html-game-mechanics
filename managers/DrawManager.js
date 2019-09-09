export class DrawManager {
  constructor(canvas, bulletManager, hero) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.bulletManager = bulletManager;
    this.hero = hero;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  drawHero() {
    this.ctx.fillStyle = this.hero.color;
    this.ctx.fillRect(this.hero.x, this.hero.y, this.hero.size, this.hero.size);
  }
  drawBullet(bullet) {
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }
  drawExistingBullets() {
    const bullets = this.bulletManager.bulletsDisplayed;

    for (let index = 0; index < bullets.length; index++) {
      this.drawBullet(bullets[index]);
    }
  }

  isElementOutOfBounds(element) {
    return element.x > this.canvasWidth - element.width || element.x < 0;
  }

  disableBullets() {
    // method 1 is checking if they are out of the screen
    for (let i = 0; i < this.bulletManager.bulletsDisplayed.length; i++) {
      const bullet = this.bulletManager.bulletsDisplayed[i];
      if (this.isElementOutOfBounds(bullet)) {
        this.bulletManager.disableBullet(i);
      }
    }
    // method 2 is checking if they collisioned with something
  }
  blockHeroMovement() {
    if (this.isElementOutOfBounds(this.hero)) {
      this.hero.x = this.hero.x < 0 ? 0 : this.canvasWidth - this.hero.size;
      this.hero.stopMoving();
    }
  }
  draw() {
    this.drawHero();
    this.drawExistingBullets();
    this.disableBullets();
    this.blockHeroMovement();
  }
}
