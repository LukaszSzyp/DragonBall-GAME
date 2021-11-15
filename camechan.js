const camechanSprite = new Image();
camechanSprite.src = './images/GOKU.png';
var camechanArray = [];

function Camechan(x, y, width, height, square) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.square = square;

    this.draw = function () {
        switch (this.square) {
            case 1: ctx.drawImage(camechanSprite, 0, 148, 29, 37, this.x, this.y, this.width, this.height);
                break;
            case 2: ctx.drawImage(camechanSprite, 29, 148, 26, 37, this.x, this.y, this.width, this.height);
                break;
            case 3: ctx.drawImage(camechanSprite, 58, 148, 29, 37, this.x, this.y, this.width, this.height);
                break;
        }
    }
}

const drawCamechan = (length, posX, poxY) => {
    camechanArray = [];
    camechanArray.push(new Camechan(posX, poxY, 29, 37, 1))
    for (let i = 0; i < length; i++) {
        camechanArray.push(new Camechan(posX + (i * 29) + 29, poxY, 29, 37, 2))
    }
    camechanArray.push(new Camechan(posX + (length * 29) + 29, poxY, 29, 37, 3))
};

/* drawCamechan(5, 60, 150); */