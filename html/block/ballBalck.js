//마우스 이벤트 받기
document.addEventListener('mousemove', mouseMoveHandler, false)

function mouseMoveHandler(e){
    const relativeX = e.clientX - canvas.offsetLeft
    if(relativeX > 0 && relativeX < canvas.width){
        paddle.paddleX = relativeX - paddle.paddleWidth/2
    }

}

//Canvas생성하기
const canvas = document.getElementById('backCanvas')
const context = canvas.getContext('2d')

//Canvas 크기 윈도우 사이즈로 변경
const WIDTH = window.innerWidth - 100
const HEIGHT = window.innerHeight - 100

canvas.width = WIDTH
canvas.height = HEIGHT

// 이벤트 처리 하기
let rightPressed = false
let leftPressed = false

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

// 여기서 'e'는 무엇일까요? 그냥 parmeter?
function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true
    }
    else if(e.keyCode == 37){
        leftPressed = true
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false
    }
    else if (e.keyCode == 37) {
        leftPressed = false
    }
}



class Ball {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.vx = 5
        this.vy = 5
        this.radius = radius

        const canvas = document.createElement('canvas')
        canvas.width = WIDTH
        canvas.height = HEIGHT
        this.context = canvas.getContext('2d')
        this.canvas = canvas
    }

    update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x + this.vx > canvas.width - this.radius || this.x + this.vx < this.radius) {
            this.vx = -this.vx
        }


        if (this.y + this.vy < this.radius) {
            this.vy = -this.vy
        } else if (this.y + this.vy > canvas.height - this.radius){
            if (this.x > paddle.paddleX && this.x < paddle.paddleX + paddle.paddleWidth){
                this.vy = -this.vy
            } else{
                this.vy = -this.vy
            // alert("Game Over")
            console.log('Game Over')
            // document.location.reload()
            }
        }

    }
    draw(mainContext) {
        this.context.fillStyle = 'rgba(0,0,0,0.5)'
        this.context.fillRect(0, 0, canvas.width, canvas.height)
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.context.closePath()
        this.context.fillStyle = 'rgb(200, 100, 50)'
        this.context.fill()

        mainContext.drawImage(this.canvas, 0, 0)
    }
}

class Paddle {
    constructor() {
        this.paddleHeight = 10;
        this.paddleWidth = 200;
        this.paddleX = (canvas.width - this.paddleWidth) / 2

        this.brickRowCount = 3;
        this.brickColumnCount = 5;

        this.score = 0;

        // this.brickHeight = 20;
        this.brickPadding = WIDTH * 0.03;
        this.brickWidth = (WIDTH - (this.brickPadding * (this.brickColumnCount + 1))) / this.brickColumnCount
        console.log(this.brickWidth)

        this.brickHeight = (HEIGHT * 0.05)

        this.bricks = []
        for(let c=0; c<this.brickColumnCount; c++){
            this.bricks[c] = [];
            for(let r=0; r < this.brickRowCount; r++){
                this.bricks[c][r] = { x:0, y:0, status: 2}
            }
        }
    }
    update() {
        if (rightPressed && this.paddleX < canvas.width - this.paddleWidth){
            this.paddleX += 7;
        }
        else if(leftPressed && this.paddleX > 0){
            this.paddleX -= 7;
        }
    }
    draw() {
        context.beginPath()
        context.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight)
        context.fillStyle = "#0095DD"
        context.fill()
        context.closePath()
    }

    drawBricks(){
        for(let c=0; c<this.brickColumnCount; c++){
            for(let r=0; r<this.brickRowCount; r++){
                if (this.bricks[c][r].status >0){
                    let brickX = (c * (this.brickWidth + this.brickPadding) + this.brickPadding);
                    let brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickPadding;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    
                    context.beginPath();
                    context.rect(brickX, brickY, this.brickWidth, this.brickHeight)
                    switch (this.bricks[c][r].status){
                        case 0 :
                            context.fillStyle = "#1E4363";
                            break;
                        case 1 : 
                            context.fillStyle = "#FF8926";
                            break;
                        case 2 :
                            context.fillStyle = "#FFB00D";

                    }
                    context.fill()
                    context.closePath()
                }
            }
        }
    }
    collisionDetection(a, b){

        for (let v = 0; v < this.brickColumnCount; v++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                this.box = this.bricks[v][r]
                if (this.box.status > 0){
                    if(a > this.box.x && a < this.box.x + this.brickWidth && b > this.box.y && b < this.box.y + this.brickHeight){
                        ball.vy = - ball.vy
                        console.log("Success")
                        this.box.status -= 1;
                        this.score ++;
                        if(this.score == this.brickColumnCount * this.brickRowCount * 2){
                            alert("YOU WIN")
                            document.location.reload()
                        }
                    }
                }
            }
        }
    }
    drawScore(){
        context.font = '16px Arial'
        context.fillStyle = '#FFFFFF'
        context.fillText('Score : '+ this.score, 8 ,20)
    }
}

const ball = new Ball(200, 200, 10)
const paddle = new Paddle()

function render() {
    ball.update()
    ball.draw(context)

    paddle.update()
    paddle.draw()
    paddle.drawBricks()
    paddle.collisionDetection(ball.x, ball.y)
    paddle.drawScore()
    requestAnimationFrame(render)
}


requestAnimationFrame(render)

