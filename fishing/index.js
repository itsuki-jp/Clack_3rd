const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const w = canvas.width;
const h = canvas.clientHeight;

const fishes = [
    {
        name: "サンマ",
        size: { x: 100, y: 50 },
        pos: { x: 10, y: 0 },
        speed: 2,
        weight: 10
    },
    {
        name: "ブリ",
        size: { x: 50, y: 30 },
        speed: 1,
        weight: 20
    },
    {
        name: "タイ",
        size: { x: 15, y: 20 },
        speed: 4,
        weight: 5
    }
]

const fishOnScreen = [];

function initScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    // ctx.strokeStyle = 'deepskyblue';
    // ctx.lineWidth = 4;
    // ctx.stroke();
    ctx.fillStyle = 'grey'
    ctx.fill();
}

function drawFish(fish) {
    ctx.beginPath();
    ctx.rect(fish.pos.x, fish.pos.y, fish.size.x, fish.size.y);
    ctx.fillStyle = 'red';
    ctx.fill()
}
initScreen()
drawFish(fishes[0])