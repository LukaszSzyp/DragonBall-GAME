const enemySprite = new Image();
enemySprite.src = './images/enemy.png'
var enemies = [];

function Enemy(x, y, width, height, frameX, frameY, speedX, numberOfFrames, energy) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.frameX = frameX;
    this.frameY = frameY;
    this.speedX = speedX;
    this.numberOfFrames = numberOfFrames;
    this.energy = energy;

    this.draw = function () {
        switch (this.frameY) {
            case 0: ctx.drawImage(enemySprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 0.7, this.height * 0.7)
                break;
            case 1: ctx.drawImage(enemySprite, this.width * this.frameX, 63, this.width, 160, this.x, this.y, this.width * 0.5, this.height * 0.5)
                break;
        }
    }
}

enemies.push(new Enemy(511, 141.25, 125, 62.5, 0, 0, 5, 8, 100))
enemies.push(new Enemy(663, 141.25, 125, 62.5, 0, 0, 5, 8, 100))
enemies.push(new Enemy(763, 141.25, 125, 62.5, 0, 0, 5, 8, 100))
enemies.push(new Enemy(1100, 141.25, 125, 62.5, 0, 0, 3, 8, 100))
enemies.push(new Enemy(1400, 141.25, 125, 62.5, 0, 0, 3, 8, 100))
enemies.push(new Enemy(1500, 141.25, 125, 62.5, 0, 0, 3, 8, 100))
enemies.push(new Enemy(2800, 110, 80, 158, 0, 1, 0, 6, 1000))