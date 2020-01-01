var cells=[];
console.log("Fuck");

function setup() {
  createCanvas(400, 400);
  // cell = new Cell();
  cells.push(new Cell());
  cells.push(new Cell());
}

function draw() {
  background(200);
  for (var i =0; i < cells.length; i++){
    cells[i].move();
    cells[i].show();
  }
}

function mousePressed(){
  for (var i = cells.length-1; i >= 0; i--){
    if(cells[i].clicked(mouseX, mouseY)){
      // console.log("Fuck");
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}
