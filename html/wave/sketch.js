let t = 0;
function setup(){
  createCanvas(400, 400);

  angleMode(DEGREES);
  //각도 TYPE 정의하기
}


function draw(){
  background(0);
  stroke(255);
  noFill();
  beginShape();

  let spacing = map(mouseX, 0, width, 5, 100);

  for (let a = 0; a < 360; a += spacing){
    let x = 100*sin(a) + 200;
    let y = 100*cos(a) + 200;
    vertex(x,y);
  }


  // vertex(100, 50);
  // vertex(200, 20);
  // vertex(200, 100);
  // vertex(50, 75);
  endShape(CLOSE);
  // endShape();
}


console.log("Hello JJong!");
