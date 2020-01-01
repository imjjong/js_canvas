var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

var c = canvas.getContext('2d');
// 질문 :  const에러 메시지 발생

// c.fillStyle = 'rgba(255, 0, 0, 0.5';
// // c.fillStyle = "rgb(255,165,0)";
// c.fillRect(100, 100, 200, 200);
// c.fillStyle = 'rgba(0,255,0,0.5';
// c.fillRect(200, 200, 200, 200);
// c.fillStyle = 'rgba(0,0,255, 0.5';
// c.fillRect(300, 300, 200, 200);


//Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for(var i =0; i < 100; i++){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2 , false);
//     c.strokeStyle = 'rgba(100, 100,100, 0.5'
//     c.stroke();
// }

var mouse = {
    x: undefined,
    y: undefined
}

// 마우스 이벤트를 받기 위한 선언
window.addEventListener('mousemove',
        function(event){
            mouse.x = event.x;
            mouse.y = event.y;
            console.log(mouse);
        }
)

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    
    this.draw = function(){
        // console.log("new test");
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = '#c5e8d6';
        c.stroke();
        c.fill();
    }

    this.update = function(){
         if (this.x + this.radius >= window.innerWidth || this.x - this.radius < 0) {
             this.dx = -this.dx;
         }

         if (this.y + this.radius >= window.innerHeight || this.y - this.radius < 0) {
             this.dy = -this.dy;
         }

         this.x += this.dx;
         this.y += this.dy;

         this.draw();
    }
}

var circleArray = [];

for(var i =0; i < 100; i++){

    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    var radius = 30;

    circleArray.push(new Circle(x, y, dx, dy, radius));

}

    function animate(){
        requestAnimationFrame(animate);
            
            c.clearRect(0,0,window.innerWidth, window.innerHeight);

            for(var i = 0; i < circleArray.length; i++){
                circleArray[i].update();
                // var circle = new Circle(200, 200, 3, 3, 30);
                
            }
            // circle.draw();



            // c.beginPath();
            // c.arc(x, y, dr, 0, Math.PI*2, false);
            // c.strokeStyle = '#c5e8d6';
            // c.stroke();

            // if( x + dr >= window.innerWidth || x - dr < 0){
            //     dx = -dx;
            // } 
            
            // if(y + dr >= window.innerHeight || y -dr < 0){
            //     dy = -dy;
            // }

            // x += dx;
            // y += dy;

        // console.log('k');
    }

    requestAnimationFrame(animate)


// console.log('r/place');

// 1. Creating and Resizing Your Canvas
// 2. Drawing Elements
// 3. Animating Elements
// 4. Interacting with Elements

// 1. Rectangles
// 2. Lines
// 3. Arcs/Cicles
// 4. Bezier Curves
// 5. Images
// 6. Text