const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const width = 1000;
const height = 500;
canvas.width = width;
canvas.height = height;

class GameObject {
    constructor(x, y, w, h, ctx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        this.imgs = {};
        this.imgIdx = 0;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    setImage(name, src) {
        const imgs = [];
        for (let i = 0; i < src.length; i++) {
            const imgTmp = new Image();
            imgTmp.src = `${src[i]}.png`;
            imgs.push(imgTmp);
        }
        this.imgs[name] = imgs;
    }
    drawImg(name) {
        const nowImg = this.imgs[name];
        try {
            this.ctx.drawImage(nowImg[Math.floor(this.imgIdx / 25) % nowImg.length], this.x, this.y, this.w, this.h);
        } catch (error) {
            console.log(error)
        }

        this.imgIdx++;
        this.imgIdx %= (25 * nowImg.length);
    }
}

class Player extends GameObject {
    constructor(x, y, w, h, ground, ctx) {
        super(x, y, w, h, ctx);
        this.ground = ground;
        this.canJump = true;
        this.dy = -10;
        this.velocity = 0;
        this.acceleration = 0.1;
    }
    isCollided(Obj) {
        const buff = -5;
        if ((Math.abs(this.x - Obj.x) < (this.w + Obj.w) / 2 + buff) && (Math.abs(this.y - Obj.y) < (this.h + Obj.h) / 2 + buff)) {
            return true;
        }
        return false;
    }
    jump() {
        this.velocity = -5.5;
    }
    jumpUpdate() {
        if (this.canJump) return;
        this.velocity += this.acceleration;
        this.y += this.velocity;

        if (this.y > this.ground - this.h) {
            this.y = this.ground - this.h;
            this.velocity = 0;
            this.canJump = true;
        }
    }
}

class Obstacle extends GameObject {
    constructor(x, y, w, h, ctx) {
        super(x, y, w, h, ctx);
    }
}

function drawObj(Obj) {
    ctx.fillStyle = Obj.colour;
    ctx.fillRect(Obj.x, Obj.y, Obj.w, Obj.h);
}

function claerCanvas() {
    ctx.fillStyle = '#A8B1B8';
    ctx.fillRect(0, 0, width, height);
}

function setPlayerMoves(player) {
    window.addEventListener("keydown", (event) => {
        const speed = 15;
        if (event.key !== ' ') return;
        if (!player.canJump) return;
        player.jump();
        player.canJump = false;

    }, true);
}

function main(player, obstacles, interval) {
    claerCanvas();
    player.jumpUpdate();
    player.drawImg("move");

    let hasCollided = false;
    const newObstacles = [];
    for (let obstacle of obstacles) {
        obstacle.move(-1.2, 0);
        if (player.isCollided(obstacle)) {
            console.log('Collided!!!');
            hasCollided = true;
            obstacle.colour = 'green';
            // Todo: Show Game Over and Result
        } else {
            newObstacles.push(obstacle);
        }
        obstacle.drawImg("move");

    }
    if (hasCollided) {
        clearInterval(interval);
    }
    if (Math.random() < 0.005) {
        const obstacleSize = { w: 30, h: 40 };
        const tmp = new Obstacle(width - obstacleSize.w, height - obstacleSize.h, obstacleSize.w, obstacleSize.h, ctx);
        tmp.setImage("move", ["unchi"]);
        newObstacles.push(tmp);
    }

    return newObstacles;
}

window.onload = () => {
    const playerSize = { w: 40, h: 50 };
    const player = new Player(50, height - playerSize.h, playerSize.w, playerSize.h, height, ctx);
    player.setImage("move", [1, 2, 3, 4]);
    setPlayerMoves(player);
    let obstacles = [];
    const interval = setInterval(() => {
        obstacles = main(player, obstacles, interval);
    }, 60 / 1000);
}