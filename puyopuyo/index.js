class Puyo {
    constructor(x, y, colour, main, dropSpeed) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.main = main;
        this.dropSpeed = dropSpeed;
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

}
init();