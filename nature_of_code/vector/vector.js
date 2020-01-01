
////////////////////////////////////////////
// 초기 화면 설정
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

WIDTH = window.innerWidth
HEIGHT = window.innerHeight

function init() {
    canvas.width = WIDTH
    canvas.height = HEIGHT
    ctx.translate(WIDTH / 2, HEIGHT / 2)
}
init()
////////////////////////////////////////////
// Mouse 이벤트 처리
let mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', function (e) {
    mouse.x = e.clientX - WIDTH / 2
    mouse.y = e.clientY - HEIGHT / 2
    // console.log(mouse.x, mouse.y)
})

///////////////////////////////////////////
// 사용할 Class 정의
class PVector {
    constructor() {
        this.x = x
        this.y = y
    }
}

//////////////////////////////////////////

class Ball {
    constructor(x, y, radius, mainContext) {
        this.x = x
        this.y = y

        this.vx = 0
        this.vy = 0

        this.dx = 0
        this.dy = 0

        this.distance = 0
        this.radius = radius
        this.context = mainContext

    }
    // 1. 마우스와 원 사이의 벡터 구하기
    sub() {
        this.dx = mouse.x - this.x
        this.dy = mouse.y - this.y
    }
    // 2. 벡터를 거리로 환산
    distanceCalculator() {
        this.distance = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2))
    }
    // 3. Normalize 거리로 나눠줘서 일정화시키기
    normarlize() {
        if (this.distance != 0) {
            this.dx /= this.distance
            this.dy /= this.distance
        }
    }

    // 4. 가속도 정의, 적절한 비율을 찾기 위한 X
    acceleration(m) {
        this.dx = this.dx.toFixed(8) * m
        this.dy = this.dy.toFixed(8) * m
    }

    // 6. 속도 정의
    velocity() {
        // this.vx += this.dx
        // this.vy += this.dy
    }

    // 7. 속도 일정값 도달 시, 멈추기 하기
    limit(n) {
        this.n = n
        if (this.vx > this.n) {
            this.vx = this.n
        } else if (this.vy > this.n) {
            this.vy = this.n
        }
    }
    // 8. 위치 반영하기
    location() {
        this.x += this.vx
        this.y += this.vy
    }

    update() {
        this.sub()
        this.distanceCalculator()
        this.normarlize()
        this.acceleration(0.2)
        this.velocity()

        // this.limit(3)
        this.location()
        console.log("가속도 : " + this.dx, this.dy, +  " 속도 : " + this.vx, this.vy)
    }


    draw() {
        this.update()
        this.context.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.context.fillStyle = '#96ceb4'
        this.context.fill()
        this.context.closePath()
    }
}



///////////////////////////////////////////
// Main display
const ball = new Ball(0, 0, WIDTH / 16, ctx)


function draw() {
    requestAnimationFrame(draw)
    ball.draw()
}
requestAnimationFrame(draw)

//////////////////////////////////////////
