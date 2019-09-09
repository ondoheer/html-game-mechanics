export class BulletManager {
  constructor(bulletsPool, bulletsDisplayed) {
    this.bulletsPool = bulletsPool;
    this.bulletsDisplayed = bulletsDisplayed;
  }

  enableBullet(x, y) {
    let bullet = this.bulletsPool.pop();
    bullet.x = x;
    bullet.y = y;
    this.bulletsDisplayed.push(bullet);
  }
  disableBullet(bulletIndex) {
    this.bulletsPool.push(this.bulletsDisplayed.splice(bulletIndex, 1)[0]);
  }
}
