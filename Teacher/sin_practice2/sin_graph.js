
console.log("success!")

const canvas = document.getElementById('backCanvas')
const context = canvas.getContext('2d')

function init() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

class LineSetup {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.context = canvas.getContext('2d')
    }

    draw(mainContext) {
        this.context.beginPath()

        for (let i = 0; i < 4; i++) {
            this.context.moveTo(100, 100 * i)
            this.context.lineTo(600, 100 * i)

            for (let j = 0; j < 7; j++) {
                this.context.moveTo(100 * j, 100)
                this.context.lineTo(100 * j, 300)
            }
        }
        this.context.closePath()
        this.context.strokeStyle = "#455C7B"
        this.context.stroke()

        this.context.font = "20px Comic Sans MS"
        this.context.fillStyle = "#F8B500"
        this.context.textAlign = "center"
        this.context.fillText("0", 100, 320)
        this.context.fillText("1π", 200, 320)
        this.context.fillText("2π", 300, 320)
        this.context.fillText("3π", 400, 320)
        this.context.fillText("4π", 500, 320)

        // this.context.font = "20px Comic Sans MS"
        this.context.fillStyle = "#F8B500"
        this.context.textAlign = "left"
        this.context.fillText("100px", 620, 100)
        this.context.fillText("0px", 620, 200)
        this.context.fillText("-100px", 620, 300)


        mainContext.drawImage(this.canvas, 0, 0)
    }
}

const lineSetup = new LineSetup()

class Circle {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius

        this.dy = 1
        this.t = 0.01

        this.graphPoints = []

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

    }
    update(mainContext) {



        this.dy = Math.sin(Math.PI * this.t * 2)
        this.y = 200 + this.dy * (100 - this.radius)


        if (this.t < 2) {
            this.graphPoints.push({
                x: 100 + (this.t * 200),
                y: 200 + this.dy * 100
            })
        } else {
            this.graphPoints = []
            this.t = 0.01
            this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        }

        this.t = this.t + 0.01


        this.circledraw()
        this.lineDraw()
        mainContext.drawImage(this.canvas, 0, 0)
    }
    circledraw() {
        

        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)

        this.context.fillStyle = 'rgba(0,0,0,0.1)'
        this.context.fillRect(0, 0, canvas.width, canvas.height)
        this.context.fillStyle = "#DA727E"
        this.context.closePath()
        this.context.fill()

    }
    lineDraw() {
        this.context.beginPath()
        this.context.moveTo(100, 200)
        for (let i = 0; i < this.graphPoints.length; i++) {
            this.context.lineTo(this.graphPoints[i].x, this.graphPoints[i].y)
        }
        // this.context.closePath()
        this.context.strokeStyle = "#00ADB5"
        this.context.lineWidth = 3
        this.context.stroke()
    }
}

const circle = new Circle(600, 100, 15)

function render() {
    
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    
    circle.update(context)
    lineSetup.draw(context)
    requestAnimationFrame(render)


}
requestAnimationFrame(render)

init()


