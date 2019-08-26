const canvas = document.getElementById("mundo");
const ctx = canvas.getContext("2d");

const Personaje = {
  x: 0,
  y: 100,
  size: 50,
  color: "brown",

  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
};

Personaje.draw();
