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
  createCanvas(500, 500);
  colorMode(HSB);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  song.setVolume(0.1);
  fft = new p5.FFT(0.9, 256) ;

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
    var r = map(amp, 0, 256, 40, 200);
    // fill(i, 255, 255);
    var x = r * cos(angle);
    var y = r * sin(angle);
    vertex(x, y);


  }
  endShape();
}
