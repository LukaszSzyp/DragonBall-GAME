const borderSprite = new Image();
borderSprite.src = './images/board.png';
var borders = [];

function Border(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.draw = function () {
        switch (this.type) {
            case 1: ctx.drawImage(borderSprite, 115, 11, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 2: ctx.drawImage(borderSprite, 8, 117, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 3: ctx.drawImage(borderSprite, 61, 64, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 4: ctx.drawImage(borderSprite, 61, 117, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 5: ctx.drawImage(borderSprite, 61, 11, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 6: ctx.drawImage(borderSprite, 168, 11, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 7: ctx.drawImage(borderSprite, 115, 64, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 8: ctx.drawImage(borderSprite, 168, 64, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 9: ctx.drawImage(borderSprite, 115, 118, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 10: ctx.drawImage(borderSprite, 168, 118, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 11: ctx.drawImage(borderSprite, 221, 118, 48, 48, this.x, this.y, this.width, this.height);
                break;
            case 12: ctx.drawImage(borderSprite, 61, 170, 48, 34, this.x, this.y, this.width, this.height);
                break;
            case 13: ctx.drawImage(borderSprite, 115, 170, 48, 34, this.x, this.y, this.width, this.height);
                break;
            case 14: ctx.drawImage(borderSprite, 168, 170, 48, 34, this.x, this.y, this.width, this.height);
                break;
            case 15: ctx.drawImage(borderSprite, 221, 64, 47, 47, this.x, this.y, this.width, this.height);
                break;
        }
    }
}


// posY ground => 185
const createHill = (length, posX, posY) => {
    borders.push(new Border(posX, posY, 20, 20, 2));
    borders.push(new Border(posX + 80 + ((length - 1) * 20), posY, 20, 20, 11));
    borders.push(new Border(posX + 20, posY - 10, 20, 20, 3));
    borders.push(new Border(posX + 60 + ((length - 1) * 20), posY - 10, 20, 20, 8));
    borders.push(new Border(posX + 20, posY - 1, 20, 20, 4));
    borders.push(new Border(posX + 60 + ((length - 1) * 20), posY - 1, 20, 20, 10));
    borders.push(new Border(posX + 20, posY - 20, 20, 20, 5));
    borders.push(new Border(posX + 60 + ((length - 1) * 20), posY - 20, 20, 20, 6));
    for (let i = 0; i < length; i++) {
        borders.push(new Border(posX + 40 + (i * 20), posY - 20, 20, 20, 1));
        /* borders.push(new Border(posX + 40 + (i * 20), posY - 10, 20, 20, 7)); */
        borders.push(new Border(posX + 40 + (i * 20), posY - 1, 20, 20, 9));
    }
}

const createIslet = (length, posX, posY) => {
    borders.push(new Border(posX, posY, 20, 20, 12));
    for (let i = 0; i < length; i++) {
        borders.push(new Border(posX + 20 + (i * 20), posY, 20, 20, 13));
    }
    borders.push(new Border(posX + 40 + ((length - 1) * 20), posY, 20, 20, 14));
}

const createGround = (length, posX, posY) => {
    for (let i = 0; i < length; i++) {
        borders.push(new Border(posX + (i * 20), posY, 20, 20, 1));
    }
}

const createWater = (length, posX, posY) => {
    for (let i = 0; i < length; i++) {
        borders.push(new Border(posX + (i * 20), posY, 20, 20, 15));
    }
}
for (let i = 0; i < 13; i++) {
    borders.push(new Border(0 + 20 * i, 185, 20, 20, 1));
}
createHill(5, 260, 185);
createIslet(3, 400, 105);
createGround(20, 440, 185);
createIslet(3, 670, 120);
createGround(15, 840, 185);
createIslet(3, 800, 100);
createIslet(3, 1000, 80);
createHill(8, 1070, 185);
createGround(23, 1300, 185);
createWater(30, 1760, 185);
createIslet(2, 1760, 120);
createIslet(2, 1860, 90);
createIslet(2, 2020, 120);
createIslet(2, 2200, 150);
createGround(30, 2260, 185);


