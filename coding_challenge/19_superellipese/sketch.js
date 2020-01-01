
var slider;

function setup(){
  createCanvas(400, 400);
  slider = createSlider(0, 10, 2, 0.01);
}

function sgn(val){
  if(val > 0){
    return 1;
  } else if (val < 0){
    return -1;
  } else{
    return 0;
  }
}


function draw(){
  background(51);
  translate(width/2, height/2);

  var r = 100;
  var a = 100;
  var b = 100;
  var n = slider.value();
  stroke(255);
  noFill();

  beginShape();
  for (var angle =0; angle < TWO_PI; angle += 0.1){
    // var x = r * cos(a);
    // var y = r * sin(a);
    // point(x,y);

    var na = 2 / n;

    var x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    var y = pow(abs(sin(angle)), na) * a * sgn(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);
  //Close를 활성화 시, 원의 끝 부분 닫힘처리됨.
}
  // console.log(TWO_PI);