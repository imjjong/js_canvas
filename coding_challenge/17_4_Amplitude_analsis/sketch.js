
var song;
var button;
var jumpButton;
var amp;

function setup() {
  createCanvas(200, 200);
  song = loadSound("rainbow.mp3", loaded);

  amp = new p5.Amplitude();

  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
  background(51);

  song.addCue(1, changeBackground, color(0,0,255));
  song.addCue(2, changeBackground, color(0,255,0));
  song.addCue(3, changeBackground, color(255,0,0));
}

function loaded(){
  console.log("JJong");
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function changeBackground(col){
  background(random(255));
}


function draw(){
  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 10, 200);
  ellipse(width/2, height/2, diam, diam);
  fill(255, 0, 255);
}

function jumpSong(){
  var len = song.duration();
  var t = random(len);
  console.log(t);
  song.jump(t);
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
