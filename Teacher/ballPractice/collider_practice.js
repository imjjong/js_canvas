var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

var c = canvas.getContext('2d');

    function animate(){
        requestAnimationFrame(animate);
            
            // c.clearRect(0,0,window.innerHeight, innerWidth)
            // c.beginPath();
            // c.arc(x, 200, 30, 0, Math.PI*3/4, false);
            // c.strokeStyle = 'blue';
            // c.stroke()

            // if( x >= 400 || x<0){
            //     dx = -dx;
            // } 
            

            // x += dx;

        console.log(mouseX);
    }

    requestAnimationFrame(animate)

