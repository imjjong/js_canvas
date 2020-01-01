// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

var song;
var fft;
var button;
var x_array = [];
var y_array = [];
var circleSetp = 16;

var yoff = 0.0;

function preload() {
    song = loadSound('test.mp3');
}

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    button = createButton('toggle');
    button.mousePressed(toggleSong);
    song.play();
    song.setVolume(0.6);
    fft = new p5.FFT(0.9, circleSetp);

    for (var i = 0; i < circleSetp; i++) {
        x_array.push(i);
        y_array.push(i);
    }

}


function draw() {

    background("#f1dfdd");
    var spectrum = fft.analyze();

    translate(width / 2, height / 2);

    // var radius = 100;


    stroke(0, 50);
    strokeWeight(0.75);
    noFill();


    var xoff = 0;

    for (var i = 0; i < spectrum.length; i++) {

        var angle = map(i, 0, spectrum.length, 0, 360);

        var amp = spectrum[i];
        var radius = map(amp, 0, spectrum.length, 100, 104);
        var offset = map(noise(xoff, yoff), 0, 1, -20, 20);
        var r = radius + offset;

        x_array[i] = r * cos(angle);
        y_array[i] = r * sin(angle);

        xoff += 0.1;
    }
    beginShape();


    curveVertex(x_array[spectrum.length - 1], y_array[spectrum.length - 1]);

    for (var k = 0; k < spectrum.length; k++) {
        curveVertex(x_array[k], y_array[k]);
    }
    curveVertex(x_array[0], y_array[0]);
    curveVertex(x_array[1], y_array[1]);


    endShape();

    yoff += 0.01;
    translate(0, 0);
    fill(200, 200, 200);
    ellipse(mouseX, mouseY, 50, 50);
}