const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

class GameObject {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    isCollided(Obj) {
        // Todo: Square Collision Detection
    }
}

class Obstacle extends GameObject {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
}

function drawObj(Obj) {
    // Todo: Draw Object
}

function claerCanvas() {
    // Todo: Clear canvas 
}

function main(player, obstacles) {
    claerCanvas();
    const newObstacles = []
    for (let obstacle of obstacles) {
        if (player.isCollided(obstacle)) {
            console.log('Collided!!!');
            // Todo: Stop interval
            // TOdo: Show Game Over and Result
        }
        obstacle.move(10, 0);
        newObstacles.push(obstacle);
    }
}

window.onload = () => {
    const player = new Player(0, 0, 100, 100);
    const obstacles = [];
    const interval = setInterval(() => {
        main(player, obstacles);
    }, 60);
}