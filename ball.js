////////////////////////////////////////////
// 초기 화면 설정
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

WIDTH = window.innerWidth
HEIGHT = window.innerHeight

function init(){
    canvas.width = WIDTH
    canvas.height = HEIGHT
    // ctx.translate(WIDTH/2, HEIGHT/2)
}
init()
////////////////////////////////////////////
// Mouse 이벤트 처리
let mouse={
    x : 0,
    y : 0
}

addEventListener('mousemove', function(e){
    
    mouse.x = e.clientX
    mouse.y = e.clientY
    // mouse.x = e.clientX - WIDTH/2
    // mouse.y = -(e.clientY - HEIGHT/2)

    // console.log(mouse.x, mouse.y)
})

///////////////////////////////////////////
// 사용할 Class 정의
class PVector{
    constructor(){
        this.x = x
        this.y = y
    }
}

//////////////////////////////////////////

class Ball{
    constructor(x, y, radius, mainContext, color){
        this.x = x
        this.y = y

        this.vx = 0
        this.vy = 0

        this.dx = 0
        this.dy = 0

        this.distance = 0.0000001
        this.radius = radius
        this.context = mainContext  
        this.color = color
        
    }
    // 1. 마우스와 원 사이의 벡터 구하기
    sub(){
        this.dx = mouse.x - this.x
        this.dy = mouse.y - this.y

    }
    // 2. 벡터를 거리로 환산
    distanceCalculator(){
        this.distance = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2))
    }
    // 3. Normalize 거리로 나눠줘서 일정화시키기
    normarlize(){
        if(this.distance != 0){
            this.dx /= this.distance
            this.dy /= this.distance 
        }
    }

    // 4. 가속도 정의, 적절한 비율을 찾기 위한 X
    acceleration(m){
        this.dx = this.dx.toFixed(6) * m
        this.dy = this.dy.toFixed(6) * m
    }

    // 6. 속도 정의
    velocity(){
        this.vx += this.dx
        this.vy += this.dy
    }
        
    // 7. 속도 일정값 도달 시, 멈추기 하기
    limit(n){
        if(this.vx > n){
            this.vx = n
        }
        if(this.vy > n){
            this.vy = n
        }
    }
    // 8. 위치 반영하기
    location(){
        this.x += this.vx
        this.y += this.vy
    }

    // 9. display wall Check
    edgeCheck(){
        if(this.x  < 0){
           this.x = 0 
        } else if(this.x > WIDTH - this.radius){
         this.x = WIDTH
        }
        if(this.y < 0 ){
            this.y = 0
         } else if(this.y > HEIGHT -this.radius){
          this.y = HEIGHT
         }
    }

    update(){
        this.sub()
        this.distanceCalculator()
        this.normarlize()
        this.acceleration(0.5)
        this.velocity()
        this.limit(2)
        this.location()
        this.edgeCheck()


        // console.log(`acceleration : ${this.dx.toFixed(2)} ${this.dy.toFixed(2)} velocity : ${this.vx.toFixed(2)} ${this.vy.toFixed(2)}`)
    }
    

    draw(){
        this.update()
        // this.context.clearRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT)
        // this.context.clearRect(0, 0, WIDTH, HEIGHT)
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.context.fillStyle = `rgba(255, 255, 255, ${this.color})`
        this.context.fill()
        this.context.closePath()
    }
}

///////////////////////////////////////////
// 
const ballList = [];

for(let i=0; i < 20; i++){
    ballList.push(new Ball(WIDTH * Math.random(), HEIGHT * Math.random(), WIDTH/32*Math.random(), ctx, Math.random()*1))
}


///////////////////////////////////////////
// Main display


function draw(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    requestAnimationFrame(draw)
    for(i=0; i<20; i++){
        ballList[i].draw()
        // console.log(ballList[i])
    }   
}
requestAnimationFrame(draw)

//////////////////////////////////////////
