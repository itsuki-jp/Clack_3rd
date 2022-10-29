class Puyo {
    constructor(x, y, colour, main, dropSpeed) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.main = main;
        this.dropSpeed = dropSpeed;
    }
    move(x, y) {
        this.x += x;
        this.y += y;
    }
}

class Board {
    constructor(x, y, canvasRatio, ctx) {
        this.x = x;
        this.y = y;
        this.canvasRatio = canvasRatio;
        this.ctx = ctx;
        this.empty = 0;
    }
    initBoard() {
        this.board = [];
        for (let i = 0; i < this.y; i++) {
            this.board.push([]);
            for (let j = 0; j < this.x; j++) {
                this.board[i][j] = this.empty;
            }
        }
    }
    drawBoard() {
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                const nowPuyo = this.board[i][j];
                this.ctx.fillStyle = 'grey';
                if (nowPuyo !== this.empty) {
                    this.ctx.fillStyle = nowPuyo.colour;
                }
                this.ctx.fillRect(j * this.canvasRatio, i * this.canvasRatio, this.canvasRatio, this.canvasRatio);
            }
        }
    }
    createPuyoPuyo() {
        const x = Math.floor(Math.random() * this.x);
        const colour = ['red', 'blue', 'yellow', 'green'];
        this.puyopuyo = [
            new Puyo(x, 1, colour[Math.floor(Math.random() * colour.length)], true, 1),
            new Puyo(x, 0, colour[Math.floor(Math.random() * colour.length)], false, 1)];
    }

    setPuyoPuyo() {
        for (const puyo of this.puyopuyo) {
            this.board[puyo.y][puyo.x] = puyo;
        }
    }
    isMovable(dx, dy) {
        let res = true;
        for (const puyo of this.puyopuyo) {
            const [x, y] = [puyo.x + dx, puyo.y + dy];
            if (this.isOnBoard(x, y) && this.board[y][x] === this.empty) {
                continue;
            }
            res = false;
        }
        return res;
    }

    movePuyo(dx, dy, drop = false) {
        if (drop && !this.isMovable(dx, dy)) {
            this.setPuyoPuyo();
            this.createPuyoPuyo();
            return;
        }
        for (const puyo of this.puyopuyo) {
            puyo.x += dx;
            puyo.y += dy;
        }
    }

    drawPuyo() {
        for (const puyo of this.puyopuyo) {
            this.ctx.fillStyle = puyo.colour;
            this.ctx.fillRect(puyo.x * this.canvasRatio, puyo.y * this.canvasRatio, this.canvasRatio, this.canvasRatio);
        }
    }
    isOnBoard(x, y) {
        return (0 <= x && x < this.x && 0 <= y && y < this.y);
    }

    searchDeletable(x, y, visited) {
        const visitingArr = [[x, y]];
        for (; visitingArr.length !== 0;) {
            const [nx, ny] = visitingArr.pop();
            if (this.isOnBoard(nx, ny)) {

            }
        }
    }

    isDeletableArr() {
        const deleteChain = [];
        const visited = [];
        for (let i = 0; i < this.y; i++) { visited.push(Array(this.x).fill(0)) }
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {

            }
        }
    }
}


function init() {
    const canvas = document.getElementById('canvas');
    const x = 6;
    const y = 12;
    const canvasRatio = 30;
    canvas.width = x * canvasRatio;
    canvas.height = y * canvasRatio;

    const board = new Board(x, y, canvasRatio, canvas.getContext('2d'));
    board.initBoard();
    board.drawBoard();
    board.createPuyoPuyo();

    document.onkeydown = (e) => {
        const code = e.code;
        let [dx, dy] = [undefined, undefined];
        if (code === 'ArrowDown') {
            [dx, dy] = [0, 1];
        }
        if (code === 'ArrowLeft') {
            [dx, dy] = [-1, 0];
        }
        if (code === 'ArrowRight') {
            [dx, dy] = [1, 0];
        }
        if (dx !== undefined && board.isMovable(dx, dy)) {
            board.movePuyo(dx, dy);
            board.drawBoard();
            board.drawPuyo();
        }
    }

    setInterval(() => {
        board.movePuyo(0, 1, drop = true)
        board.drawBoard();
        board.drawPuyo();
    }, 1000);

}
init();