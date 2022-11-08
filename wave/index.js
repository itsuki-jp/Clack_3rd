const canvas = document.getElementById('canvas');
console.log(canvas)

const width = 1000;
const height = 500;
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

let time = 0;
function draw() {
    const sepNum = 1000;
    const diff = width / sepNum;
    ctx.fillStyle = 'blue';
    for (let i = 0; i < sepNum; i++) {
        const rad = 0.03 * i + time * 0.3;
        ctx.fillRect(diff * i, Math.sin(rad) * 15 + height / 2, diff, height);
    }
}

function clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
}

setInterval(() => {
    clear();
    draw();
    time += 1;
}, 60);