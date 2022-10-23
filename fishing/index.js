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
function main() { }

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

let time = 0;

setInterval(() => {
    if (time > 60) {
        console.log("new fish")
        time = 0;
        let newFish = Object.assign({}, JSON.parse(JSON.stringify(fishes[Math.floor(Math.random() * fishes.length)])));;
        newFish.pos = { x: -newFish.size.x, y: Math.random() * h }
        if (Math.random() < 0.5) {
            newFish.speed *= -1;
            newFish.pos.x = w + newFish.pos.x;
        }
        fishOnScreen.push(newFish)
    }
    initScreen()
    for (fish of fishOnScreen) {
        drawFish(fish);
        fish.pos.x += fish.speed;
    }
    time++;
}, 1000 / 60);

drawFish(fishes[0])