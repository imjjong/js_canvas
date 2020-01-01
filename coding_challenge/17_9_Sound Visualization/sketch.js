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
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();

}

function draw(){
  background(0);
  push();
  var vol = amp.getLevel();
  volHistory.push(vol);
  stroke(255);
  noFill();
  var currentY = map(vol, 0, 1, height, 0);
  translate(0,  height /2 - currentY);
  beginShape();
  for(var i=0; i < volHistory.length; i++){
    var y =map(volHistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  pop();
  if(volHistory.length> width-50){
    volHistory.splice(0,1);
  }
  stroke(255, 0, 0);
  line(volHistory.length , 0, volHistory.length, height);

  // elli pse(100, 100, 100, vol*200);

}
