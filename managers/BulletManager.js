export class BulletManager {
  constructor(bulletsPool, bulletsDisplayed) {
    this.bulletsPool = bulletsPool;
    this.bulletsDisplayed = bulletsDisplayed;
  }

  enableBullet() {
    this.bulletsDisplayed.push(this.bulletsPool.pop());
  }
  disableBullet(bulletIndex) {
    this.bulletsPool.push(this.bulletsDisplayed.splice(bulletIndex, 1)[0]);
  }
}
