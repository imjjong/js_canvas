// Referece Tutorial 
// https: //www.youtube.com/watch?v=oUKk4JiqAIw


// 모듈이 작동하지 않는 이유
// import fs from './test.js';

const canvas = document.getElementById('backCanvas')
const ctx = canvas.getContext('2d')

WIDTH = window.innerWidth - 20
HEIGHT = window.innerHeight - 50

function init(){
    canvas.width = WIDTH
    canvas.height = HEIGHT
}

init()

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class MiniStar{
    constructor(x, y, radius, color){
        //Call이 무엇일까요?
        // star.call(this, x, y, radius, color)

        this.x = x
        this.y = y
        this.radius = radius
        this.color = color

        this.velocity ={
            x: randomIntFromRange(-5, 5),
            y: randomIntFromRange(-15, 15)
        }
        this.friction = 0.8
        this.gravity = 0.1
        this.ttl = 100
        this.opacity = 1
    }
    update(){
        this.draw()

        if (this.y + this.radius + this.velocity.y > HEIGHT) {
            this.velocity.y = -this.velocity.y * this.friction
        } else {
            this.velocity.y += this.gravity
        }

        this.x += this.velocity.x
        this.y += this.velocity.y
        
        this.ttl -= 1
        this.opacity -= 1 / this.ttl
    }
    draw(){
        //스타일 저장하기 save function
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(227, 234, 239,'+ this.opacity.toString()+')'
        ctx.shadowColor = "#E3EAEF"
        ctx.shadowBlur = 20
        // ES 문자열 처리가 안되는 이유?
        // ctx.fillStyle = 'rgaba(255, 0, 0, ${this.opacity})'
        ctx.fill()
        ctx.closePath()

        //스타일 리셋하기
        ctx.restore()
    }
}

class Star{
    constructor(x, y, radius, color){
        this.x = x
        this.y = y

        this.radius =radius
        this.color = color

        this.velocity = {
            x: (Math.random() -0.5) * 8,
            y: 3
        }
        this.friction = 0.8
        this.gravity = 1
    }
    update(){
            // When ball hits bottom of screen
            if(this.y + this.radius + this.velocity.y > HEIGHT){
                this.velocity.y = -this.velocity.y * this.friction
                this.shatter()
            } else{
                this.velocity.y += this.gravity
            }
        
        // Hits side of screen
        if(this.x + this.radius + this.velocity.x > WIDTH || this.x - this.radius <=0){
            this.velocity.x =  - this.velocity.x * this.friction
            this.shatter()
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.draw()
    }
    draw(){
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.shadowColor = "#E3EAEF"
        ctx.shadowBlur = 20
        ctx.fill()
        ctx.closePath()
        ctx.restore()

    }
    shatter(){
        this.radius -= 3
        for(let i =0; i < 8; i++){
            miniStars.push(new MiniStar(this.x, this.y, 3, 'red'))
        }
    }
    
}

function createMountainRange(mountainAmount, heightM, color){
    for(let i = 0; i < mountainAmount; i++){
        
        const mountainWidth = WIDTH / mountainAmount
        ctx.beginPath()
        ctx.moveTo(i * mountainWidth, HEIGHT)
        ctx.lineTo(i * mountainWidth + mountainWidth, HEIGHT)
        ctx.lineTo(i * mountainWidth + mountainWidth / 2, HEIGHT - heightM)
        ctx.lineTo(i * mountainWidth, HEIGHT)
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
    }
}

const backgroundGradient = ctx.createLinearGradient(0,0,0, HEIGHT)
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')

let stars =[]
let miniStars = []
let backgroundStars =[]
let ticker = 0
let randomSpawRate = 75
let groundHeight = 0

function starsMake(){
    // for(let i =0; i < 2; i++){
    //     stars.push(new Star(100+ i * Math.random() * 400, 100, 30, '#E3EAEF'))
    // }

    for(let i = 0; i < 150; i ++){
        const x = Math.random() * WIDTH
        const y = Math.random() * HEIGHT
        const radius = Math.random () * 3
        backgroundStars.push(new Star(x, y, radius, ' white'))
    }
}
starsMake()

function render(){

    requestAnimationFrame(render)

    ctx.fillStyle = backgroundGradient
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    // ctx.clearRect(0, 0, WIDTH, HEIGHT)

    backgroundStars.forEach(backgroundStar => {
        backgroundStar.draw()
    })

    createMountainRange(1, HEIGHT - 50, '#384551')
    createMountainRange(2, HEIGHT - 100, '#2B3843')
    createMountainRange(3, HEIGHT - 300 , '#26333E')
    ctx.fillStyle = '#182028'
    ctx.fillRect(0, HEIGHT-groundHeight, WIDTH, groundHeight)

    stars.forEach((star, index) => {
        star.update()
        if (star.radius == 0) {
            stars.splice(index, 1)
            // Array 삭제하기
        }
    })

    // for(const val of miniStars){
    //     val.update()
    // }
    miniStars.forEach((miniStar, index) => {
        miniStar.update()
        if (miniStar.ttl == 0) {
            miniStars.splice(index, 1)
        }
    })

    ticker++
    if (ticker % randomSpawRate == 0){
        const radius = 12
        const x = Math.max(radius, Math.random() * WIDTH - radius)
        stars.push(new Star(x, -100, radius, 'white'))
        randomSpawRate = randomIntFromRange(75, 300)
    }
}

requestAnimationFrame(render)