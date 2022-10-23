const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const w = canvas.width;
const h = canvas.clientHeight;

const fishes = [
    {
        name: "サンマ",
        size: { x: 100, y: 50 },
        pos: { x: 10, y: 0 },
        speed: 1,
        weight: 10,
        isMovingUp: false,
    },
    {
        name: "ブリ",
        size: { x: 50, y: 30 },
        speed: 2,
        weight: 20,
        isMovingUp: false,
    },
    {
        name: "タイ",
        size: { x: 15, y: 20 },
        speed: 4,
        weight: 5,
        isMovingUp: false,
    }
]


/** 画面を全部塗りつぶす*/
function initScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fillStyle = 'grey'
    ctx.fill();
}

/** 魚を描写する */
function drawFish(fish) {
    ctx.beginPath();
    ctx.rect(fish.pos.x, fish.pos.y, fish.size.x, fish.size.y);
    ctx.fillStyle = 'red';
    ctx.fill()
}

/** 魚が画面外にいたらTrueを返す */
function isOutSideScreen(fish) {
    // Todo: 魚が画面外にいたらTrueを返す
    return false;
}

const player = {
    pos: { x: 50, y: 100 },
    hook: { x: 50, y: 100 },
    size: { x: 100, y: 30 },
    direction: 0,
    isMoving: false,
    isTop: true,
};
document.onkeydown = (event) => {
    console.log(event.code);
    if (event.code !== 'Space') return;
    // 動いている場合
    if (player.isMoving) {
        // 上だったら何もしない
        if (player.direction < 0) return;
        // 下だったら反転する
        player.direction *= -1;
    }
    // 静止していたら
    else {
        player.isMoving = true;
        // 向きを上か下に変更する
        if (player.isTop) player.direction = 1;
        else player.direction = -1;
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.hook.x, player.hook.y, player.size.x, player.size.y);
    ctx.fillStyle = 'black';
    ctx.fill()
}

// Todo
function collisionDetection() {
    return false;
}

/** メイン関数 */
function main() {
    let fishOnScreen = [];
    // 60fpsで画面を更新する
    setInterval(() => {
        initScreen()
        // 魚をいい感じのタイミングで生成して、描写する
        if (Math.random() < 0.01) {
            // Memo: let newFish = fishes[Math.floor(Math.random() * fishes.length)] -> 浅いコピーなのでバグる
            let newFish = Object.assign({}, JSON.parse(JSON.stringify(fishes[Math.floor(Math.random() * fishes.length)])));
            // 初期設定として、魚は左から右に泳ぐようにしてあげると、各コードが少なくて楽
            newFish.pos = { x: -newFish.size.x, y: Math.random() * h }
            if (Math.random() < 0.5) {
                newFish.speed *= -1;
                newFish.pos.x = w + newFish.size.x;
            }
            fishOnScreen.push(newFish)
        }

        // Todo: プレイヤーのフックが上がり/下がりすぎないように上限/下限で止める
        if (player.isMoving) {
            player.hook.y += player.direction;
        }
        drawPlayer();

        // 魚との当たり判定
        if (player.isMoving && player.direction < 0) {
            for (fish of fishOnScreen) {
                // Todo: Collision Detection
                let isColliding = collisionDetection();
                if (isColliding) {
                    fish.isMovingUp = true;
                    fish.speed = 0;
                }

            }
        }


        // 画面内にいる魚を描写する
        let tmpFishOnScreen = [];
        for (fish of fishOnScreen) {
            if (isOutSideScreen()) {
                continue;
            }
            tmpFishOnScreen.push(fish);
            if (fish.isMovingUp) fish.pos.y += player.direction;
            drawFish(fish);
            fish.pos.x += fish.speed;
        }
        fishOnScreen = tmpFishOnScreen;
    }, 1000 / 60);
}

main()
