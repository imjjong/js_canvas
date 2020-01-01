var mic;

function setup(){
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();

}

function draw(){
  background(0);
  var vol = mic.getLevel();

  ellipse(100, 100, 100, vol*1000);
  console.log(vol);

}
