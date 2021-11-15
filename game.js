const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 511;
canvas.height = 199;
let flay = false;
let enableJumpButton = true;
const keys = [];
let camechanLength = 0;
let gamePosition = 0; //start game
let playerEnergy = 100;
let playerMana = 0;

let borderShift = 0;

const widthBar = 250;

document.querySelector('.playerEnergy').style.width = `${widthBar}px`;
document.querySelector('.playerMana').style.width = `${widthBar}px`;

let playerEnergyBar = document.querySelector('.playerEnergy div');
let playerManaBar = document.querySelector('.playerMana div');
let gameLabel = document.querySelector('.gameLabel h3');

const updateEnergy = () => {
    let energy = Math.floor((widthBar / 100) * playerEnergy);
    playerEnergyBar.style.width = `${energy}px`;
}
updateEnergy();

const updateMana = () => {
    let mana = Math.floor((widthBar / 100) * playerMana);
    playerManaBar.style.width = `${mana}px`;
}
updateMana();


const player = {
    x: 35,
    y: 135,
    width: 29,
    height: 37,
    frameX: 0,
    frameY: 0,
    friction: 0.5,
    maxSpeed: 10,
    speedX: 0,
    speedY: 0,
    moving: false,
    jump: false,
    attackType: 0,
};

const camechan = {
    x: 35,
    y: 100,
    frameX: 0,
    frameY: 0,
}

const playerSprite = new Image();
playerSprite.src = './images/GOKU.png';

const background = new Image();
background.src = './images/Plains.png'

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

let backgroundPositionX = 0; //okresla pozycje tla
let backgroundPositionY = 0; //okresla pozycje tla

animate();

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
    player.moving = false;
    player.attackType = 0;
    player.frameY = 0;
    player.frameX = 0;
    camechanArray = [];
    camechanLength = 0;
});

const speedFloor = (speed) => {
    if (speed > 0) {
        return speed = Math.floor(speed);
    } else {
        return speed = Math.ceil(speed);
    }
}
let jumpCounter = 0;
// Player move ---------------------------------------------------------
function movePlayer() {
    //Apply Gravity
    player.speedY += 5;



    //ArrowUp
    if (keys[38]) {
        //check if on ground

        if (player.jump) {
            jumpCounter += 1;
            player.speedY = -15;
            if (jumpCounter > 8) {
                player.jump = false;
                player.speedY = 0;
            }
        }
    }

    // S key attackType = 1
    if (keys[83]) {
        player.frameY = 3;
        player.attackType = 1;
        player.moving = false;
        player.speedY = 0;
    }

    if (!keys[37] && !keys[39] || keys[37] && keys[39]) {
        //Slow down
        player.speedX *= player.friction;
    }
    //ArrowLeft
    else if (keys[37]) {
        player.speedX--;
        player.moving = true;
        player.frameY = 2;
        if (player.x < 35) {
            player.x = 35;
        }
    }
    //ArrowRight
    else if (keys[39]) {
        player.speedX++;
        player.moving = true;
        player.frameY = 1;
        if (gamePosition <= 2340) {
            if (player.x <= 34) {
                player.speedX = 0;
                player.x = 35;
            } else if (player.x >= 160) {
                player.x = 160;
                backgroundPositionX -= speedFloor(player.speedX);
                borderShift = speedFloor(player.speedX) * -1;
            };
        }
        gamePosition += borderShift * -1;
        console.log(gamePosition);
    }

    // drawing map
    borders.forEach(element => {
        element.x += borderShift;
        element.draw();
    });

    // drawing enemy
    enemies.forEach(enemy => {
        enemy.x += borderShift;
        enemy.draw();
    });

    if (player.speedX > player.maxSpeed) {
        player.speedX = player.maxSpeed;
    } else if (player.speedX < -player.maxSpeed) {
        player.speedX = -player.maxSpeed;
    }

    if (player.speedY > player.maxSpeed) {
        player.speedY = player.maxSpeed;
    } else if (player.speedY < -player.maxSpeed) {
        player.speedY = -player.maxSpeed;
    }

    player.speedX = speedFloor(player.speedX)
    player.speedY = speedFloor(player.speedY)

    let collisionFrameX = {
        x: player.x + player.speedX + borderShift,
        y: player.y,
        width: player.width,
        height: player.height
    }

    let collisionFrameY = {
        x: player.x,
        y: player.y + player.speedY,
        width: player.width,
        height: player.height
    }

    borders.forEach(element => {

        if (element.type !== 15) {
            if (checkIntersection(collisionFrameX, element)) {
                while (checkIntersection(collisionFrameX, element)) {
                    collisionFrameX.x -= Math.sign(player.speedX)
                }
                player.x = collisionFrameX.x;
                player.speedX = 0;
            }

            if (checkIntersection(collisionFrameY, element)) {
                while (checkIntersection(collisionFrameY, element)) {
                    collisionFrameY.y -= Math.sign(player.speedY)
                }
                player.y = collisionFrameY.y;
                player.speedY = 0;
                player.jump = true;
                jumpCounter = 0;
            }
        }
    });

    player.x += player.speedX;
    player.y += player.speedY;

    if (player.y > 250 || playerEnergy <= 0) {
        gameLabel.textContent = 'GAME OVER'
        setTimeout(() => {
            location.reload();
            return false;
        }, 2000)
    }
}

function moveCamechan() {
    if (player.frameX >= 5 && player.attackType == 1 && !player.moving) {
        camechanLength++;
        drawCamechan(camechanLength, player.x + 30, player.y);
        camechanArray.forEach(element => {
            element.draw();
            enemies.forEach(enemy => {
                if (checkIntersection(enemy, element)) {
                    enemy.speedX = 0;
                    enemy.energy -= 10;
                    if (playerMana < 100) {
                        playerMana += 2;
                    }
                    updateMana();
                    camechanLength -= 0.5;
                    if (enemy.energy < 0) {
                        enemy.x = -100;
                    }
                }
                enemy.speedX = 10;
            })
        })
        if (camechanLength >= 15) {
            camechanLength = 0;
            camechanArray = [];
        }
    }
    if (enemies[6].energy <= 0) {
        gameLabel.style.color = 'blue'
        gameLabel.textContent = 'YOU WIN'
        setTimeout(() => {
            location.reload();
            return false;
        }, 2000)
    }
    console.log(enemies[6].energy);
}

//-----------------------------------------------------------------------------------
//animation player

function handlePlayerFrame() {
    if (player.frameX < 6 && player.moving) {
        player.frameX++;

    }
    else if (player.frameX >= 6 && player.moving) {
        player.frameX = 0;
    }
    else if (player.frameX < 5 && player.attackType == 1) {
        player.frameX++;
        player.moving = false;
    }
    else if (player.frameX >= 5 && player.attackType == 1) {
        player.moving = false;
    }
}







//animation and move enemies
function handleEnemiesFrame() {

    enemies.forEach(enemy => {
        if (enemy.frameX < enemy.numberOfFrames - 1) {
            enemy.frameX++;
        }
        else if ((enemy.frameX >= enemy.numberOfFrames - 1) /* && !(enemy.frameY === 1) */) {
            enemy.frameX = 0;
        };
        if ((enemy.x - gamePosition) <= 351 && (enemy.x - gamePosition) >= -1000) {
            enemy.x -= (enemy.speedX);
            if (checkIntersection(enemy, player)) {
                if (playerEnergy > 0) {
                    playerEnergy -= 2;
                    enemyCollision = true;
                }
                updateEnergy();
            }
        }
    })
}
//Collision --------------------------------------------------------------------------
const checkIntersection = (r1, r2) => {
    if (r1.x >= r2.x + r2.width) {
        return false;
    } else if (r1.x + r1.width <= r2.x) {
        return false;
    } else if (r1.y >= r2.y + r2.height) {
        return false;
    } else if (r1.y + r1.height <= r2.y) {
        return false
    } else {
        return true;
    }
}
var fps, fpsInterval, startTime, elapsed;
var then;
var now;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.drawImage(background, backgroundPositionX, backgroundPositionY, canvas.width, canvas.height);
        if (backgroundPositionX < 0) {
            ctx.drawImage(background, backgroundPositionX + canvas.width, backgroundPositionY, canvas.width, canvas.height);
        } else if (backgroundPositionX > 0) {
            ctx.drawImage(background, backgroundPositionX - canvas.width, backgroundPositionY, canvas.width, canvas.height);
        }
        if (backgroundPositionX < canvas.width * -1) backgroundPositionX = 0;
        if (backgroundPositionX > canvas.width) backgroundPositionX = 0;

        if (playerEnergy <= 100) {
            playerEnergy += 0.1;
            updateEnergy();
        }

        borderShift = 0;
        handleEnemiesFrame();
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);

        movePlayer();
        moveCamechan();
        handlePlayerFrame();
        requestAnimationFrame(animate);
    }
}

startAnimating(10);