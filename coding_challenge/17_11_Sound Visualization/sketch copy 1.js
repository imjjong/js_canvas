var song;
var fft;
var button;
var w;

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
  createCanvas(256, 256);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  // song.setVolume(1);
  fft = new p5.FFT(0.9, 64);
  w  = width / 64;
}

function draw(){
  background(0);
  var spectrum = fft.analyze();
  console.log(spectrum);
  noStroke();
  translate(width/2, height/2);
  beginShape();
  for(var i = 0; i < spectrum.length; i++){
    var amp = spectrum[i];
    var r = map(amp, 0, 256, 40, 200);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
    // var y = map(amp, 0, 256 , height, 0);
    // fill(i, 255, 255);
    // rect(i * w, y, w - 2, height - y);
  }
  endShape();
  // console.log(spectrum.length);
  stroke(255);
  noFill();
}
