const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// .png files,
const box = 32;
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";

const snakeImg = new Image(); //use for later to create windows themed snake game
snakeImg.src = "snake.png";

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

let food = { //random location of snake food
    x : Math.floor(Math.random()* 17 + 1) * box,
    y : Math.floor(Math.random()* 15 + 3) * box
}

let score = 0;
let d;

document.addEventListener("keydown", direction); // arrow key functions
function direction(event) {
    if(event.keyCode ==37 && d != "RIGHT") {
        d = "LEFT";
    }
    else if(event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    }
    else if(event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    }
    else if(event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

function collision(head, array){ //checks if snake overlaps same x and y coordinates
    for(let i = 0;i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw() { //draws everything on html canvas
    ctx.drawImage(ground, 0, 0);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green":"green";
        ctx.fillRect(snake[i].x,snake[i].y, box, box);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(snake[i].x,snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){ //regenerate new food if snake eats it
        score++;
        food = {
            x : Math.floor(Math.random()* 17 + 1) * box,
            y : Math.floor(Math.random()* 15 + 3) * box
        }
    }else{
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box //end game
         || snakeY > 17 * box || collision(newHead, snake)){
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillstyle = "white"; //color, font and dimensions for score
    ctx.font = "35px Times";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);