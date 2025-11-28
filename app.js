let map = {
    "500":1, "450":2,"400":3,"350":4,"300":5,"250":6,"200":7,"150":8
};
let score = 0, time = 300 , speed = 0, HighSocre = 0;
let highScore = document.querySelector("#high-score");
let speedDown = document.querySelector("#speedDown");
let speedUp = document.querySelector("#speedUp");
let currentSpeed = document.querySelector("#speed");
let speedControl = document.querySelector("#speedControl");
speedDown.addEventListener("click", function(event){
    if(time<500) time += 50;
    currentSpeed.innerText = ` ${map[time]}`;
    speed = map[time];
});
speedUp.addEventListener("click", function(event){
    if(time>150) time -= 50;
    currentSpeed.innerText = ` ${map[time]}`;
    speed = map[time];
});
speed = map[time];
const board = document.querySelector(".board");
const size = 30;
const cols = Math.floor(board.clientWidth/size);
const rows = Math.floor(board.clientHeight/size);
let sc = document.querySelector("#score");
let food = null;
const blocks = [];
for(let row = 0; row<rows; row++){
    for(let col = 0; col<cols; col++){
        const cell = document.createElement("div");
        cell.classList.add('cell');
        board.appendChild(cell);
        blocks[`${row}-${col}`] = cell;
    }
}
let snake = [{x:1, y:3}, {x:1, y:4}, {x:1, y:5}];
let direction = "down";
function render(){
    snake.forEach(ele=>{
        blocks[`${ele.x}-${ele.y}`].classList.add("snake");
    });
}
render();
feedFood();
document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowUp" && direction!="down") {
        direction = "up";
    } else if (event.key == "ArrowDown" && direction!="up") {
        direction = "down";
    } else if (event.key == "ArrowLeft" && direction!="right") {
        direction = "left";
    } else if (event.key == "ArrowRight" && direction!="left") {
        direction = "right";
    }
});

function feedFood(){
    food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
    let flag = true;
    while(flag){
        flag = false;
        for(let i = 0 ; i < snake.length; i++){
            let ele = snake[i];
            if(ele.x==food.x && ele.y==food.y){
                flag = true;
                food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)};
                break;
            }
        }
    }
    blocks[`${food.x}-${food.y}`].classList.add("food");
}
function starts(time, speed, score){
    speedControl.classList.add("displayNone");
    let setIntervalId = setInterval(function(){
        let head = null;
        if(direction=="left"){
            head = {x:snake[0].x, y:snake[0].y-1};
            if(head.y==-1) head.y = cols-1;
        }else if(direction=="right"){
            head = {x:snake[0].x, y:snake[0].y+1};
            if(head.y==cols) head.y = 0;
        }else if(direction=="up"){
            head = {x:snake[0].x-1, y:snake[0].y};
            if(head.x==-1) head.x = rows-1;
        }else if(direction=="down"){
            head = {x:snake[0].x+1, y:snake[0].y};
            if(head.x==rows) head.x = 0;
        }
        snake.forEach(ele=>{
            if(head.x==ele.x && head.y==ele.y){
                alert("Game Over");
                speedControl.classList.toggle("displayNone");
                clearInterval(setIntervalId);
                distroySnake(snake);
                start.classList.toggle("displayNone");
                Score.classList.toggle("displayNone");
                HighSocre = Math.max(score, HighSocre);
                highScore.innerText = `${HighSocre}`;
            }
        });
        if(head.x==food.x && head.y==food.y){
            blocks[`${food.x}-${food.y}`].classList.remove("food");
            score += speed;
            sc.innerText = `${score}`;
            feedFood();
        }else{
            let tail = snake.pop();
            blocks[`${tail.x}-${tail.y}`].classList.remove("snake");
        }
        blocks[`${snake[0].x}-${snake[0].y}`].classList.remove("head");
        blocks[`${snake[0].x}-${snake[0].y}`].classList.remove("snake");
        blocks[`${head.x}-${head.y}`].classList.add("head");
        snake.unshift(head);
        render();
    }, time);
}

let start = document.querySelector("#start");
let Score = document.querySelector("#Score");
Score.classList.toggle("displayNone");
start.addEventListener("click", again);
function again(){
    start.classList.toggle("displayNone");
    Score.classList.toggle("displayNone");
    score = 0;
    sc.innerText = `${score}`;
       direction = "down";
    distroySnake(snake);
    snake = [{x:1, y:3}, {x:1, y:4}, {x:1, y:5}];
    render();
    feedFood();
    starts(time, speed, score);
}
function distroySnake(snake){
    while(snake.length>0){
        let tail = snake.pop();
        blocks[`${tail.x}-${tail.y}`].classList.remove("head");
        blocks[`${tail.x}-${tail.y}`].classList.remove("snake");
    }
    blocks[`${food.x}-${food.y}`].classList.remove("food");
}
