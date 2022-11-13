// CanvasをHTMLから取ってきて、JSで使えるようにする
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 画面のサイズ設定
const width = 1000;
const height = 500;
canvas.width = width;
canvas.height = height;

/** 画面を塗りつぶつ */
const clearCanvas = () => {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, width, height);
}

/** Objを動かすだけ */
const moveObject = (Obj, dx, dy) => {
    Obj.x += dx;
    Obj.y += dy;
}

/** Objを描写する */
const drawObject = (Obj) => {
    ctx.fillStyle = Obj.colour;
    ctx.fillRect(Obj.x, Obj.y, Obj.width, Obj.height);
}

/** Objを新しく作成する */
const createObject = (x, y, width, height, colour) => {
    return { x: x, y: y, width: width, height: height, colour: colour };
}

const isCollisionDetected = (Obj1, Obj2) => {
    if (Math.abs(Obj1.x - Obj2.x) < (Obj1.width + Obj2.width) / 2 && Math.abs(Obj1.y - Obj2.y) < (Obj1.height + Obj2.height) / 2) {
        return true;
    }
}

/** 毎フレームの処理 */
const main = (player, enemies, interval) => {
    clearCanvas();
    drawObject(player);
    let newEnemies = []
    for (let i = 0; i < enemies.length; i++) {
        moveObject(enemies[i], 0, 3);
        if (enemies[i].y > height) continue;
        if (isCollisionDetected(player, enemies[i])) {
            enemies[i].colour = 'green';
            drawObject(enemies[i]);
            clearInterval(interval);
        }
        newEnemies.push(enemies[i]);
        drawObject(enemies[i]);
    }
    if (Math.random() < 0.05) {
        newEnemies.push(createObject(Math.random() * width, -50, 50, 50, 'blue'));
    }
    // Todo:毎回戻り値に設定するのキモいので直す
    return newEnemies;
}

/** キーボードが押されたときの処理 */
const movePlayer = (player) => {
    window.addEventListener("keydown", (event) => {
        const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const speed = 15;
        const dx = [-speed, speed, 0, 0];
        const dy = [0, 0, -speed, speed];
        const pos = keys.indexOf(event.key);
        if (pos === -1) return;
        moveObject(player, dx[pos], dy[pos]);

    }, true);
}

// 画面が読み込まれたときの処理
window.onload = () => {
    const player = createObject(width / 2, height - 100, 50, 50, 'red');
    movePlayer(player);
    let enemies = [];
    clearCanvas();
    const interval = setInterval(() => {
        enemies = main(player, enemies, interval);
    }, 10);
}