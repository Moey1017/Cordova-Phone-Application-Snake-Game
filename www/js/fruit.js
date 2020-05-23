function Fruit() {
  this.x;
  this.y;
  let fruit = new Image();
fruit.src = "./img/food.png";

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() *
      columns - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() *
      rows - 1) + 1) * scale;
  }

  this.draw = function() {
//    ctx.fillStyle = "#F62459"; // fruit color
//    ctx.fillRect(this.x, this.y, scale, scale)
    ctx.drawImage(fruit, this.x, this.y, scale, scale);
    
  }
}