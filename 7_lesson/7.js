// конфиги
const conf = {
  col: 20,
  row: 20,
  cntPoint: 0,
  pointToWin: 5,
  status: false,
  dirrection: "right",
  interval: 200,
};

// игра
const game = {
  randomCoord(max) {  // получаем случайную координату
    if (max > 0) max -= 1;
    else max += 1;
    let coord = Math.floor(Math.random() * max);
    return coord;
  },
  start() {  // начало игры
    conf.status = false;
    conf.cntPoint = 0;
    let status = document.getElementById("status");
    status.innerHTML = `<h1><b>Текущий счет: ${
      conf.cntPoint
    }<br>Очков до победы: ${conf.pointToWin - conf.cntPoint}</b></h1>`;
    snake.body = [[conf.col / 2, -(conf.row / 2)]];
    map.setCoord();
    map.drawMap(
      conf.col,
      -conf.row,
      snake.startPosition,
      [food.x, food.y],
      [barrier.x, barrier.y]
    );
  },
  getDirection(event) {  // получаем направление
    if (event.keyCode == 65 && conf.dirrection != "right")
      conf.dirrection = "left";
    else if (event.keyCode == 87 && conf.dirrection != "down")
      conf.dirrection = "up";
    else if (event.keyCode == 68 && conf.dirrection != "left")
      conf.dirrection = "right";
    else if (event.keyCode == 83 && conf.dirrection != "up")
      conf.dirrection = "down";
  },
  move() {  // двигаемся
    if (conf.status) {
      if (conf.dirrection == "right") {
        if (
          snake.body[snake.body.length - 1][0] + 1 == food.x &&
          snake.body[snake.body.length - 1][1] == food.y
        ) {
          Array.prototype.push.apply(snake.body, [
            [
              snake.body[snake.body.length - 1][0] + 1,
              snake.body[snake.body.length - 1][1],
            ],
          ]);
          map.setCoord();
          conf.cntPoint += 1;
          if (conf.cntPoint == conf.pointToWin) {
            alert("Вы победили");
            game.start();
          }
        } else if (
          (snake.body[snake.body.length - 1][0] + 1 == barrier.x &&
            snake.body[snake.body.length - 1][1] == barrier.y) ||
          snake.body[snake.body.length - 1][0] + 1 >= conf.col ||
          map.snakeEatSelf([
            snake.body[snake.body.length - 1][0] + 1,
            snake.body[snake.body.length - 1][1],
          ])
        ) {
          alert("Вы проиграли");
          game.start();
        }
        Array.prototype.push.apply(snake.body, [
          [
            snake.body[snake.body.length - 1][0] + 1,
            snake.body[snake.body.length - 1][1],
          ],
        ]);
        snake.body.shift();
      } else if (conf.dirrection == "left") {
        if (
          snake.body[snake.body.length - 1][0] - 1 == food.x &&
          snake.body[snake.body.length - 1][1] == food.y
        ) {
          Array.prototype.push.apply(snake.body, [
            [
              snake.body[snake.body.length - 1][0] - 1,
              snake.body[snake.body.length - 1][1],
            ],
          ]);
          map.setCoord();
          conf.cntPoint += 1;
          if (conf.cntPoint == conf.pointToWin) {
            alert("Вы победили");
            game.start();
          }
        } else if (
          (snake.body[snake.body.length - 1][0] - 1 == barrier.x &&
            snake.body[snake.body.length - 1][1] == barrier.y) ||
          snake.body[snake.body.length - 1][0] - 1 <= -1 ||
          map.snakeEatSelf([
            snake.body[snake.body.length - 1][0] - 1,
            snake.body[snake.body.length - 1][1],
          ])
        ) {
          alert("Вы проиграли");
          game.start();
        }
        Array.prototype.push.apply(snake.body, [
          [
            snake.body[snake.body.length - 1][0] - 1,
            snake.body[snake.body.length - 1][1],
          ],
        ]);
        snake.body.shift();
      } else if (conf.dirrection == "up") {
        if (
          snake.body[snake.body.length - 1][0] == food.x &&
          snake.body[snake.body.length - 1][1] + 1 == food.y
        ) {
          Array.prototype.push.apply(snake.body, [
            [
              snake.body[snake.body.length - 1][0],
              snake.body[snake.body.length - 1][1] + 1,
            ],
          ]);
          map.setCoord();
          conf.cntPoint += 1;
          if (conf.cntPoint == conf.pointToWin) {
            alert("Вы победили");
            game.start();
          }
        } else if (
          (snake.body[snake.body.length - 1][0] == barrier.x &&
            snake.body[snake.body.length - 1][1] + 1 == barrier.y) ||
          snake.body[snake.body.length - 1][1] + 1 >= 1 ||
          map.snakeEatSelf([
            snake.body[snake.body.length - 1][0],
            snake.body[snake.body.length - 1][1] + 1,
          ])
        ) {
          alert("Вы проиграли");
          game.start();
        }
        Array.prototype.push.apply(snake.body, [
          [
            snake.body[snake.body.length - 1][0],
            snake.body[snake.body.length - 1][1] + 1,
          ],
        ]);
        snake.body.shift();
      } else if (conf.dirrection == "down") {
        if (
          snake.body[snake.body.length - 1][0] == food.x &&
          snake.body[snake.body.length - 1][1] - 1 == food.y
        ) {
          Array.prototype.push.apply(snake.body, [
            [
              snake.body[snake.body.length - 1][0],
              snake.body[snake.body.length - 1][1] - 1,
            ],
          ]);
          map.setCoord();
          conf.cntPoint += 1;
          if (conf.cntPoint == conf.pointToWin) {
            alert("Вы победили");
            game.start();
          }
        } else if (
          (snake.body[snake.body.length - 1][0] == barrier.x &&
            snake.body[snake.body.length - 1][1] - 1 == barrier.y) ||
          snake.body[snake.body.length - 1][1] - 1 <= -conf.row ||
          map.snakeEatSelf([
            snake.body[snake.body.length - 1][0],
            snake.body[snake.body.length - 1][1] - 1,
          ])
        ) {
          alert("Вы проиграли");
          game.start();
        }
        Array.prototype.push.apply(snake.body, [
          [
            snake.body[snake.body.length - 1][0],
            snake.body[snake.body.length - 1][1] - 1,
          ],
        ]);
        snake.body.shift();
      }
    }
  },
  status() { // старт игры по кнопке
    let status = document.getElementById("status");
    status.innerHTML = `<h1><b>Текущий счет: ${
      conf.cntPoint
    }<br>Очков до победы: ${conf.pointToWin - conf.cntPoint}</b></h1>`;
  },
  toogleStatus() {
    conf.status = true;
  },
};

// змея
const snake = {
  startPosition: [conf.col / 2, -(conf.row / 2)],
  body: [[conf.col / 2, -(conf.row / 2)]],
};

// еда
const food = {
  x: undefined,
  y: undefined,
};

// барьер
const barrier = {
  x: undefined,
  y: undefined,
};

// карта
const map = {
  setCoord() {  // создание координат
    while (true) {
      food.x = game.randomCoord(conf.col, snake.body);
      food.y = game.randomCoord(-conf.row, snake.body);
      barrier.x = game.randomCoord(conf.col, snake.body);
      barrier.y = game.randomCoord(-conf.row, snake.body);
      flag = true;
      for (arr of snake.body) {
        if (food.x === arr[0] && food.y === arr[1]) {
          flag = false;
          break;
        } else if (barrier.x === arr[0] && barrier.y === arr[1]) {
          flag = false;
          break;
        }
      }
      if (food.x != food.y && food.y != barrier.y && flag) break;
    }
  },
  drawMap(col, row, snake, food, barrier) {  // рисуем карту
    let tbl = document.getElementById("tbl");
    tbl.innerHTML = "";
    for (let y = 0; y > row; y--) {
      let tr = document.createElement("tr");
      for (let x = 0; x < col; x++) {
        let td = document.createElement("td");
        if (snake[0] == x && snake[1] == y) td.className = "snake";
        else if (food[0] == x && food[1] == y) td.className = "food";
        else if (barrier[0] == x && barrier[1] == y) td.className = "barrier";
        else td.className = "empty";
        td.innerHTML = "&nbsp";
        td.dataset.x = x;
        td.dataset.y = y;

        tr.appendChild(td);
      }
      tbl.appendChild(tr);
    }
  },
  reDraw() {  // обновляем карту
    for (let y = 0; y > -conf.row; y--) {
      for (let x = 0; x < conf.col; x++) {
        let td = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
        if (x == food.x && y == food.y) {
          td.className = "food";
        } else if (x == barrier.x && y == barrier.y) {
          td.className = "barrier";
        } else {
          td.className = "empty";
        }
        for (arr of snake.body) {
          if (arr[0] == x && arr[1] == y) {
            td.className = "snake";
          }
        }
      }
    }
  },
  snakeEatSelf(nextStep) {  // проверяем что змея не ест себя
    for (arr of snake.body) {
      if (nextStep[0] == arr[0] && nextStep[1] == arr[1]) return true;
    }
    return false;
  },
};

// запуск игры
game.start();

// отлавливаем направление
document.addEventListener("keydown", game.getDirection);
// движемся, обновляем карту, отображаем счет
setInterval(game.move, conf.interval);
setInterval(map.reDraw, conf.interval);
setInterval(game.status, conf.interval);

// назначим управление на кнопки
let startGame = document.getElementById("playButton");
let newgame = document.getElementById("newGameButton");
startGame.onclick = game.toogleStatus;
newgame.onclick = game.start;

// запуск игры
game.start();
