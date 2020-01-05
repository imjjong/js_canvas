

const canvas = document.getElementById('backCanvas')
const ctx = canvas.getContext('2d')

WIDTH = window.innerWidth
HEIGHT = window.innerHeight


///////////////////////////////////////////////////////
/* H1 Test 글씨 쓰기
                                                     */
////////////////////////////////////////////////////////
function textInit() {
    const mainText = document.getElementsByTagName('h1')[0]
    // const mainText = document.getElementById('mainText')
    mainText.style.left = WIDTH / 2 + "px"
    mainText.style.top = HEIGHT/2 + "px"
    // mainText.style.top = 0
    // mainText.style.background = '#FC3C3C'

    // 글씨 색깔 바꾸기
    mainText.style.color = "white"
    mainText.style.textAlign = "center"
    mainText.style.transform = "translate(-50%, -100%)"
    // mainText.style.transform = "translateY(-50%)"
    // mainText.style.transform = "translateY(-50%)"
    mainText.style.fontSize = ball1.radius / 30 + "rem"
    // mainText.style.fontSize = "10em"

}


function subText(distance) {
    this.distance = Math.floor(distance- ball1.radius-ball2.radius)
    const distacneText = document.getElementById('distanceText')
    distacneText.style.color =' white'
    distacneText.style.left = ball2.x + "px"
    distacneText.style.top = ball2.y + "px"
    distacneText.innerHTML = "Distance \n"+ this.distance +"px"

    distacneText.style.transform = "translate(-50% ,50%)"
}

console.log(mainText.getBoundingClientRect())

function ini() {
    canvas.width = WIDTH
    canvas.height = HEIGHT
}


let mouse = {
    x: 10,
    y: 10
}

// 마우스 이벤트 가장 중요한 족보요
addEventListener("mousemove", function (event) {
    mouse.x = event.clientX
    mouse.y = event.clientY
    // console.log(event)
})

ini()

class Ball {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }  
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
}

function map(value, min1, max1, min2, max2){
    let result =undefined
    result = ((value - min1) / (max1 - min1)) * (max2-min2) + min2
    // console.log(result)
}
map(6, 2, 10, 500, 1000)

class MouseBall extends Ball{

    varliable_y(){
        if (mouse.y > ball1.y - ball1.radius && mouse.y < ball1.y + ball1.radius) {
            return ball1.radius * Math.cos(Math.PI * map(mouse.y, ball1.y - ball1.radius, ball1.y + ball1.radius, -2, 2))
           
        } else{
            return ball1.radius * Math.cos(Math.PI*2)
        }
    }
    update(distance) {
        if (distance <= ball1.radius + this.radius) {
             
        } else if(distance > ball1.radius + this.radius){
             this.x = mouse.x;
             this.y = mouse.y;
        }
        this.draw()
    }
}
class LinePath{
    constructor(x1, y1, x2, y2){
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }
    update(){

    }
    draw(){
        this.update()
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.strokeStyle = 'red'
        ctx.stroke()
    }
}

const ball1 = new Ball(WIDTH / 2, HEIGHT / 2, HEIGHT / 4, '#00ADB5')
const ball2 = new MouseBall(100, 100, 70, '#FC3C3C')
// const linePath = new LinePath(100, 100, 200, 200)
// console.log(ball.ballContext)

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
    //Math.pow 거듭 제곱을 반환함.
    //Math.sqrt 루트 없애주기. 제곱근 반환하기
}
let distance = undefined

function render() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let linePath = new LinePath(ball1.x, ball1.y, ball2.x, ball2.y)
    linePath.draw()
    ball1.draw()
    ball2.update(distance)
    
    
    distance = getDistance(ball1.x, ball1.y, mouse.x, mouse.y)

    if (distance < ball1.radius + ball2.radius) {
        ball1.color = '#F8B500'
            

    } else {
        ball1.color = '#00ADB5'
    }
    textInit()
    subText(distance)

    // console.log(getDistance(ball1.x, ball1.y, ball2.x, ball2.y))
    requestAnimationFrame(render)
}

requestAnimationFrame(render)

// const color = [#393E46, #00ADB5, #FFF4E0, #F8B500, #FC3C3C]

//////////////////////////////////////////////
//                                          //
//                 DAT.GUI                  //
//                                          //
//////////////////////////////////////////////

const gui = new dat.GUI()

gui.add(ball1, 'radius', 0, HEIGHT / 2).step(1)
// gui.add(distance, 'this.prop', 0, WIDTH)

//////////////////////////////////////////////

