
const mouse= {
    x:undefined,
    y:undefined
}

addEventListener('mousemove',function(event){
    mousePoint(event)
})

function mousePoint(event){
    mouse.x = event.x
    mouse.y = event.y
}

const canvas = document.getElementById('backCanvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight -100

const colors = ['#000026', '#03A596', '#03A596', '#F38626', '#F0412C' ]

class Particles{
    constructor(x, y, radius){
        this.x = x
        this.y = y
        this.velocity = {
            x: (Math.random() - 0.5)*3,
            y: (Math.random() - 0.5)*3
        }
        this.radius = radius
        this.color = randomColor(colors)
        this.mass = 1

        const ballCanvas = document.createElement('canvas')
        ballCanvas.width = window.innerWidth
        ballCanvas.height = window.innerHeight
        this.context = ballCanvas.getContext('2d')
        this.canvas = ballCanvas
    }
    update(particles, mainContext){
        this.draw(mainContext)
        for(let i=0; i < particles.length; i++){
            if(this === particles[i]){continue;}
            //↑ 무슨말이죠? Continue 사용벙?
            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
                // console.log('has collided')

                resolveCollision(this, particles[i])
            }
        }

        if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
            this.velocity.x = -this.velocity.x
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y
        }
        if (distance(mouse.x, mouse.y, this.x, this.y) - this.radius * 2 < 30){
            console.log("mouseTouch")
        }

        this.x += this.velocity.x
        this.y += this.velocity.y
    }

    draw(mainContext){
        this.context.clearRect(0, 0, canvas.width, canvas.height)
        this.context.beginPath()
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        // this.context.fillStyle = this.color
        this.context.strokeStyle = this.color
        this.context.stroke()
        // this.context.fill()
        this.context.closePath()

        mainContext.drawImage(this.canvas, 0,0)
    }
}

const ball = new Particles(300, 300, 50, 'red')

let particles

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2){
    const xDist = x2 - x1
    const yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max -min + 1) + min)
}

console.log(distance(1,1,4,4))

function init(){
    particles = []

    for(let i =0; i < 40; i++){
        const radius = 10
        let x = randomIntFromRange(radius, canvas.width - radius)
        let y = randomIntFromRange(radius, canvas.height - radius)
        // const radius = (Math.random() * 10) + 1
        
        const color = randomColor(colors)

        if(i !== 0){
            for(let j = 0; j < particles.length; j++){
                if (distance(x, y, particles[j].x, particles[j].y)-radius *2 <0){
                    x = randomIntFromRange(radius, canvas.width - radius)
                    y = randomIntFromRange(radius, canvas.height - radius)
                    
                    j = -1;
                }
                //console.log(distance(x, y, particles[j].x, particles[j].y))
            }
        }


        particles.push(new Particles(x, y, radius, color))
        // particles[i].draw(context)
        particles[i].update(particles, context)
        
    }
}
init()
console.log(particles)

function render(){
    
    context.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle =>{
        particle.update(particles, context)
    })

    requestAnimationFrame(render)
}
requestAnimationFrame(render)


const currentText = document.getElementById('currentText')
currentText.innerHTML = 'HI'




/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}