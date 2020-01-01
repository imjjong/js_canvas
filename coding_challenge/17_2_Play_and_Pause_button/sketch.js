
var song;
var button;

function setup() {
  createCanvas(200, 200);
  song = loadSound("rainbow.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  background(51);
}

function loaded(){
  console.log("JJong");
}

function togglePlaying(){
  if (!song.isPlaying()){
  song.play();
  song.setVolume(0.2);
  button.html("STOP");
  }else{
  song.stop();
  button.html("play");
  }
}
