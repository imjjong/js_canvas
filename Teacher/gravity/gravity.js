

const canvas = document.getElementById('backCanvas')
const context = canvas.getContext('2d')

mousePosition = { x: 0, y: 0 }

// const color = [#393E46, #00ADB5, #FFF4E0, #F8B500, #FC3C3C]



class BallMouse {
    constructor(x, y, radius) {
        this.radius = radius
    }
    draw() {
        context.beginPath()
        context.arc(this.x, this.y, 40, 0, Math.PI * 2, 0)
        context.closePath()
        context.fillStyle = "#FFF4E0"
        context.fill()
    }
    update() {
        this.x = mousePosition.x
        this.y = mousePosition.y
    }
    int() {

    }
}

const gravity = 1
const friction = 0.7

class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.color = color

        const ballCanvas = document.createElement('canvas')

        ballCanvas.width = window.innerWidth
        ballCanvas.height = window.innerHeight
        this.ballContext = ballCanvas.getContext('2d')

        this.canvas = ballCanvas
        // document.body.appendChild(this.ballCanvas)
    }
    setup() {

    }
    draw(context) {

        this.ballContext.clearRect(0, 0, window.innerWidth, window.innerHeight)

        this.ballContext.beginPath()
        this.ballContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.ballContext.closePath()
        this.ballContext.fillStyle = this.color
        this.ballContext.fill()
        this.ballContext.stroke()
        // this.ballCantext.fill
        // 


        // Context 합치기
        context.drawImage(this.canvas, 0, 0)
    }
    update() {
        if (this.y + this.radius + this.dy> window.innerHeight) {
            this.dy = -this.dy * friction
            //        Friction 마찰
        } else {
            this.dy += gravity;
        }

        if(this.x + this.radius +this.dx > canvas.width ||  this.x - this.radius -this.dx <0){
            this.dx = -this.dx
        }
        this.x += this.dx
        this.y += this.dy
        // console.log(this.y, this.dy)
    }
}

window.addEventListener('mousemove', function (mouse) {
    mousePosition.x = mouse.x
    mousePosition.y = mouse.y
    // this.console.log(mousePosition.x, mousePosition.y)
    ballMouse.int()
    ballMouse.update()


})

function initialize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // 
}

initialize()

const ballMouse = new BallMouse(500, 200, 30)
const ball = new Ball(window.innerWidth / 2, window.innerHeight / 2, 1, 150, '#F8B500')


const ballArray = []
function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max-min) + min)
}

for (let i = 0; i < 10; i++) {
    const radius = randomIntFromRange(8, 20)
    let c = '#' + Math.floor(Math.random() * 16777215).toString(16)
    let x = randomIntFromRange(0, canvas.width-radius)
    let y = randomIntFromRange(0, canvas.height-radius)
    let dx = randomIntFromRange(-2,2)
    const ball = new Ball(x, y, dx, 1, radius, c)
    ballArray.push(ball)
} console.log(ballArray)



function render() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i = 0; i < ballArray.length; i++) {
        const ball = ballArray[i]
        // console.log(ball)

        ball.draw(context)
        ball.update()
    }
    // 
    // ball.update()
    


    ballMouse.draw()

    requestAnimationFrame(render)
}

requestAnimationFrame(render);