
var game = document.getElementsByClassName('game')[0];
var nowScore = document.getElementById('nowScore');
var loseScore = document.getElementById('loseScore');
var losePage = document.getElementsByClassName('losePage')[0];
var gamePage = document.getElementsByClassName('gamePage')[0];
var startPage = document.getElementsByClassName('startPage')[0];
var close = document.getElementsByClassName('close')[0];
var startBtn = document.getElementsByClassName('startBtn')[0];
var paused = document.getElementsByClassName('control')[0];

function init() {
    this.startPage.style.display = 'block';
    this.gamePage.style.display = 'none';
    this.losePage.style.display = 'none';
    this.totalW = document.body.clientWidth;
    this.totalH = document.body.clientHeight;
    this.gameW = parseInt(window.getComputedStyle(game, null).width) / 100;
    this.gameH = parseInt(window.getComputedStyle(game, null).height) / 100;
    this.mapW = parseInt(gameW * totalW);
    this.mapH = parseInt(gameH * totalH);
    this.snakeW = 20;
    this.snakeH = 20;
    this.foodH = 20;
    this.foodW = 20;
    this.snakeBody = [
        [3, 2, 'head'],
        [2, 2, 'body'],
        [1, 2, 'body']
    ];
    this.direct = 'right';
    this.up = true;
    this.down = true;
    this.left = false;
    this.right = false;
    this.timer = null;
    this.score = 0;
    this.start = true;
    this.playAndPause = true;
    this.haveFood = false;
    bindEvent();
    // startGame();
}

function startGame() {
    this.startPage.style.display = 'none';
    this.gamePage.style.display = 'block';
    createSnake();
    createFood();
    bindEvent();
    this.nowScore.innerText = score;
    timer = setInterval(function () {
        move();
    }, 200)
}

function createFood() {
    if (!haveFood) {
        this.food = document.createElement('div');
        this.food.classList.add('food');
        this.foodX = Math.floor(Math.random() * (mapW / foodW)) * foodW;
        this.foodY = Math.floor(Math.random() * (mapH / foodH)) * foodH;
        this.food.style.position = 'absolute';
        this.food.style.top = foodY + 'px';
        this.food.style.left = foodX + 'px';
        game.appendChild(food);
        this.haveFood = true;
    }

}

function createSnake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        this.snake = document.createElement('div');
        this.snake.classList.add('snake');
        this.snake.classList.add(snakeBody[i][2]);
        this.snake.style.position = 'absolute';
        this.snakeX = snakeBody[i][0] * snakeW;
        this.snakeY = snakeBody[i][1] * snakeH;
        this.snake.style.top = snakeY + 'px';
        this.snake.style.left = snakeX + 'px';
        game.appendChild(snake);
    }
    this.snakeHead = document.getElementsByClassName('snake')[0];
    switch (direct) {
        case 'up':
            this.snakeHead.style.transform = 'rotate(270deg)';
            break;
        case 'down':
            this.snakeHead.style.transform = 'rotate(90deg)';
            break;
        case 'left':
            this.snakeHead.style.transform = 'rotate(180deg)';
            break;
        case 'right':
            this.snakeHead.style.transform = 'rotate(0deg)';
            break;
        default:
            break;
    }

}

function bindEvent() {
    document.addEventListener('keydown', function (e) {
        setDirect(e.keyCode);
    }, false);

    close.onclick = function () {
        losePage.style.display = 'none';
        gamePage.style.opacity = '1';
        paused.style.backgroundImage = 'url(img/start.png)';
        reload();
        nowScore.innerText = score;

    }
    paused.onclick = function () {
        stopAndContain();
    }
    startBtn.onclick = function () {
        stopAndContain();
    }
}

function stopAndContain() {
    if (start) {
        if (playAndPause) {
            startGame();
            paused.style.backgroundImage = 'url(img/pause.png)';
            this.playAndPause = false;
        } else {
            clearInterval(this.timer);
            paused.style.backgroundImage = 'url(img/start.png)';
            this.playAndPause = true;
        }
    }
}

function setDirect(code) {
    switch (code) {
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.up = false;
                this.down = false;
                this.left = true;
                this.right = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.up = false;
                this.down = false;
                this.left = true;
                this.right = true;
            }
            break;
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.up = true;
                this.down = true;
                this.left = false;
                this.right = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.up = true;
                this.down = true;
                this.left = false;
                this.right = false;
            }
            break;
        default:
            break;
    }
}

function move() {
    for (var i = snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (direct) {
        case 'up':
            snakeBody[0][1] -= 1;
            break;
        case 'down':
            snakeBody[0][1] += 1;
            break;
        case 'left':
            snakeBody[0][0] -= 1;
            break;
        case 'right':
            snakeBody[0][0] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    createSnake();
    if (snakeBody[0][0] < 0 || snakeBody[0][0] >= mapW / snakeW) {
        this.losePage.style.display = 'block';
        this.gamePage.style.opacity = '0.5';
        this.loseScore.innerText = score;
        reload();
    }
    if (snakeBody[0][1] < 0 || snakeBody[0][1] >= mapH / snakeH) {
        this.losePage.style.display = 'block';
        this.gamePage.style.opacity = '0.5';
        this.loseScore.innerText = score;
        reload();
    }
    for (var i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]) {
            this.losePage.style.display = 'block';
            this.gamePage.style.opacity = '0.5';
            this.loseScore.innerText = score;
            reload();
        }
    }
    if (snakeBody[0][0] == this.foodX / foodW && snakeBody[0][1] == this.foodY / foodH) {
        this.haveFood = false;
        var snakeEndX = snakeBody[snakeBody.length - 1][0];
        var snakeEndY = snakeBody[snakeBody.length - 1][1];
        switch (direct) {
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'right':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            default:
                break;
        }
        this.score += 1;
        this.nowScore.innerText = score;
        removeClass('food');
        createFood();
    }

}

function reload() {
    this.snakeBody = [
        [3, 2, 'head'],
        [2, 2, 'body'],
        [1, 2, 'body']
    ];
    removeClass('snake');
    removeClass('food');
    this.direct = 'right';
    this.up = true;
    this.down = true;
    this.left = false;
    this.right = false;
    this.score = 0;
    clearInterval(this.timer);
    this.playAndPause = true;
    this.haveFood = false;
}

function removeClass(name) {
    var ele = document.getElementsByClassName(name);
    // 不要用if
    while (ele.length > 0) {
        ele[0].remove();
    }
}
init();