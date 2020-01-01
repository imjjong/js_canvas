var song;
var amp;
var button;

var volHistory = [];

function preload(){
  song = loadSound('test.mp3');
}

function toggleSong(){
  if(song.isPlaying()){
    song.pause();
  } else{
    song.play();
  }
}

function setup(){
  createCanvas(200, 200);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  song.setVolume(1);
  amp = new p5.Amplitude();
}

function draw(){
  background(0);
  var vol = amp.getLevel();
  volHistory.push(vol);
  stroke(255);
  noFill();

  translate(width/2, height/2);
  beginShape();
  for(var i = 0; i < 360; i++){
    var r = map(volHistory[i], 0, 1, 10, 100);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if(volHistory.length > 360){
    volHistory.splice(0, 1);
  }

  // elli pse(100, 100, 100, vol*200);

}
