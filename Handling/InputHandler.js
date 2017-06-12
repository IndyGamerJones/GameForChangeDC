class InputHandler {
  constructor() {
    this.keys = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastClick = 0;
    this.mouseBtn = [false,false,false];
    var obj = this;
    window.addEventListener("keydown", function(e) {obj.keys[e.keycode] = true;});
    window.addEventListener("keyup", function(e) {obj.keys[e.keycode] = false;});
    window.addEventListener("mousedown", function(e) {obj.mouseBtn[e.button] = true;});
    window.addEventListener("mouseup", function(e) {obj.mouseBtn[e.button] = false;obj.lastClick++;});
    window.addEventListener("mousemove", function(e) {obj.mouseX = (e.clientX/game.graphicsHandler.context.canvas.width)*100; obj.mouseY = (e.clientY/game.graphicsHandler.context.canvas.height)*100;});
  }
}
