

console.log('Hi. Sin Method')
// colors = ['#247BA0', '#70C1B3', '#B2DBBF', '#F3FFBD', '#FF1654']

const canvas = document.getElementById('backCanvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


class Ball{
    constructor(x, y, radius){
        this.x = x
        this.y = y
        this.dy = undefined
        this.dy = undefined
        this.t = 1
        this.radius = radius


        const ballCanvas = document.createElement('canvas')
        this.context = ballCanvas.getContext('2d')

        this.canvas = ballCanvas

        this.canvas.height = canvas.height
        this.canvas.width = canvas.width
    }
    update(mainContext){
       
        this.draw(mainContext)
        this.t += 0.01
        

        this.x = 100 + Math.cos(Math.PI * this.t) * (100 - this.radius)
        this.y = 200 + Math.sin(Math.PI * this.t) * (100 - this.radius)
        
    }
    draw(mainContext){
        this.context.clearRect(0, 0, innerWidth, innerHeight)
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.context.fillStyle = '#70C1B3'
        this.context.fill()
        this.context.closePath()

        mainContext.drawImage(this.canvas, 0, 0)
    }
}

const ball = new Ball(100, 100, 30)

function render(){
    
    context.clearRect(0, 0, innerWidth, innerHeight)

    ball.update(context)
    line()
    history()
    requestAnimationFrame(render)
}

requestAnimationFrame(render)

function line() {
    context.moveTo(100, 100)
    context.lineTo(500, 100)

    context.moveTo(100, 200)
    context.lineTo(500, 200)

    context.moveTo(100, 300)
    context.lineTo(500, 300)
    // context.lineTo(200, 500)
    // context.rect(100, 100, 100, 100)
    context.strokeStyle = '#FF1654'
    context.stroke()
    context.closePath()
}

function history(){
    const x_t = ball.t * 100

    // context.strokeStyle = "#FFFFFF"
    // context.moveTo(400, 400)
    context.arc(x_t, ball.y, 3, 0, 2 * Math.PI)
    // context.stroke()
    context.fillStyle = '#F3FFBD'
    context.fill()
}