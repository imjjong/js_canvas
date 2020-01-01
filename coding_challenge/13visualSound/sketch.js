var song;
var fft;
var button;


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
  // createCanvas(displayWidth, displayHeight);
  createCanvas(500, 500);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  song.setVolume(0.1);
  fft = new p5.FFT(0.9, 16) ;

}

function draw(){
  console.log("JJong1");
  background(0);
  var spectrum = fft.analyze();
  console.log(spectrum);

  noStroke();
  translate(width / 2, height / 2);  // translate(0, 0);

  beginShape();
  for(var i = 0; i < spectrum.length; i++){
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 16, 10, 50);
    // fill(i, 255, 255);
    var x = r * cos(angle);
    var y = r * sin(angle);
    stroke(i, 255, 255);
    curveVertex(x, y);
    // vertex(x, y);


  }
  endShape(CLOSE);
}
