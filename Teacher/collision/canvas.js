
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function draw(){
    context.beginPath();
    context.arc(200, 200, 100, 0, 2*Math.PI);
     context.fillStyle = 'rgb(102,204,0)';
    context.fill();
    context.closePath();
}


function render(){
    draw();
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

console.log("JJOng");