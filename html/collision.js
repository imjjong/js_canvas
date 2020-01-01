

const canvas = document.getElementById('backCanvas')
const context = canvas.getContext('2d')

function ini(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

let mouse = {
    x: 10,
    y: 10
}

// 마우스 이벤트 가장 중요한 족보요
addEventListener("mousemove", function(event){
    mouse.x = event.clientX
    mouse.y = event.clientY
    // console.log(event)
})

ini()

class Ball{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color

        const ballCanvas = document.createElement('canvas')
        ballCanvas.width = window.innerWidth
        ballCanvas.height = window.innerHeight
        this.ballContext = ballCanvas.getContext('2d')
        this.canvas = ballCanvas
    }
    update(){

    }
    draw(conetxt){
        this.ballContext.clearRect(0, 0, canvas.width, canvas.height)

        this.ballContext.beginPath()
        this.ballContext.arc(this.x, this.y, this.radius, 0 ,2*Math.PI)
        this.ballContext.fillStyle = this.color
        this.ballContext.fill()
        this.ballContext.closePath()

        conetxt.drawImage(this.canvas, 0, 0)
    }
}

const ball1 = new Ball(300, 300, 100, '#00ADB5')
const ball2 = new Ball(undefined, undefined, 30, '#FC3C3C')
// console.log(ball.ballContext)

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
    //Math.pow 거듭 제곱을 반환함.
    //Math.sqrt 루트 없애주기. 제곱근 반환하기
}

function render(){
    context.clearRect(0, 0, canvas.width, canvas.height)

    
    context.fillRect(100, 100, 100, 100)
    ball1.draw(context)
    ball2.draw(context)
    ball2.x = mouse.x
    ball2.y = mouse.y
    if (getDistance(ball1.x, ball1.y, ball2.x, ball2.y)<ball1.radius+ball2.radius){
        ball1.color = '#F8B500'
    } else{
        ball1.color = '#00ADB5'
    }

    console.log(getDistance(ball1.x, ball1.y, ball2.x, ball2.y))
    requestAnimationFrame(render)
}

requestAnimationFrame(render)

// const color = [#393E46, #00ADB5, #FFF4E0, #F8B500, #FC3C3C]

