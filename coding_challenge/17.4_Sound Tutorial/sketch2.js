// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/YcezEwOXun4

var song;
var slider;

function preload(){
  song = loadSound("rainbow.mp3");
}

function setup() {
  createCanvas(200, 200);
  slider = createSlider(0, 1, 0.5, 0.01);
  song.play();
  song.setVolume(0.5);
}

function draw(){
  background(0);
}
