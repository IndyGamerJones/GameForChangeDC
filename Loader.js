var files = ["GUI/Base/Label.js","GUI/Base/Panel.js","GUI/Base/Rectangle.js","GUI/Extensions/Button.js","Handling/TextHandler.js","Handling/GraphicsHandler.js","Handling/InputHandler.js","Main/Game.js"];

function loadFile(file) {
  var tag = document.createElement("script");
  tag.setAttribute("src",file);
  document.body.appendChild(tag);
}
for (var file of files) {
  loadFile(file);
}
var game;
window.onload = function() {
  game = new Game(80);
}
