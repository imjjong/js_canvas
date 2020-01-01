
var song;
var button;
var jumpButton;

function setup() {
  createCanvas(200, 200);
  song = loadSound("rainbow.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  jumpButton = createButton("Jump");
  jumpButton.mousePressed(jumpSong);
  background(51);

  song.addCue(1, changeBackground, color(0,0,255));
  song.addCue(2, changeBackground, color(0,255,0));
  song.addCue(3, changeBackground, color(255,0,0));
}

function changeBackground(col){
  background(col);
}


function draw(){
  // if(song. > 5){
    // background(song.currentTime() * 20,0, 255);
  // }
}

function jumpSong(){
  var len = song.duration();
  var t = random(len);
  console.log(t);
  song.jump(t);
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
