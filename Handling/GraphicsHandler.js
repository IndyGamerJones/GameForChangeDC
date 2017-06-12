class GraphicsHandler {
  constructor() {
    this.gameContext = document.getElementById("gameCanvas").getContext("2d");
    this.overlayContext = document.getElementById("overlayCanvas").getContext("2d");
    this.context = this.gameContext;
    var obj = this;
    obj.overlayContext.canvas.width = window.innerWidth;
    obj.overlayContext.canvas.height = window.innerHeight;
    obj.gameContext.canvas.width = window.innerWidth;
    obj.gameContext.canvas.height = window.innerHeight;
    this.xMul = (this.context.canvas.width/100);
    this.yMul = (this.context.canvas.height/100);
    window.addEventListener("resize", function() {
        obj.overlayContext.canvas.height = window.innerHeight;
        obj.overlayContext.canvas.width = window.innerWidth;
        obj.gameContext.canvas.width = window.innerWidth; 
        obj.gameContext.canvas.height = window.innerHeight;
        obj.xMul = (obj.context.canvas.width/100);
        obj.yMul=(obj.context.canvas.height/100);
    });
  }
  displayRect(x1,y1,x2,y2) {
    this.context.fillStyle = "#000000";
    this.context.fillRect(this.xMul*x1,this.yMul*y1,this.xMul*x2-this.xMul*x1,this.yMul*y2-this.yMul*y1);
  }
  displayTooltip(lines,mouseX,mouseY) {
     var longest = 0;
     for (var i = 0; i < lines.length; i++) {
         if (lines[i].length > longest) {longest = lines[i].length;}
     }
     this.setContext("overlayContext");
     this.displayRoundedRect(mouseX, mouseY, mouseX + longest/1.5, mouseY + 2*(lines.length + 1)+2,1,"#FFFFFF",true,"#000000");
     for (var i = 0; i < lines.length; i++) {
          this.displayText(mouseX+2,mouseY + (i + 1) * 2 + 1, lines[i], "#FFFFFF", "12px Verdana",true);
     }
     this.setContext("gameContext");
  }
  displayRoundedRect(x1,y1,x2,y2,cornerRadius,color,fill=false,fillColor="#000000") {
      x1 *= this.xMul;
      y1 *= this.yMul;
      x2 *= this.xMul;
      y2 *= this.yMul;
      cornerRadius *= (this.xMul+this.yMul)/2
      y2 -= 2*cornerRadius;
      x2 -= cornerRadius;
      this.context.strokeStyle = color;
      this.context.fillStyle = fillColor;
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2 - cornerRadius, y1);
      this.context.arcTo(x2, y1, x2, y1 + cornerRadius, cornerRadius);
      this.context.lineTo(x2, y2);
      this.context.arcTo(x2, y2 + cornerRadius, x2-cornerRadius, y2 + cornerRadius, cornerRadius);
      this.context.lineTo(x1, y2 + cornerRadius);
      this.context.arcTo(x1 - cornerRadius, y2 + cornerRadius, x1 - cornerRadius, y1, cornerRadius);
      this.context.lineTo(x1-cornerRadius, y1 + cornerRadius);
      this.context.arcTo(x1-cornerRadius, y1, x1, y1, cornerRadius);
      this.context.lineWidth = 5;
      this.context.closePath();
      this.context.stroke();
      if (fill) {
          this.context.fill();
      }
  }
  displayText(x,y,text,color,font,notCentered=false) {
    this.context.fillStyle = color;
    this.context.font = font;
    this.context.textAlign = "center";
    if (notCentered) {this.context.textAlign="left";}
    this.context.fillText(text,this.xMul*x,this.yMul*y);
  }
  flushScreen(color) {
    this.context.fillStyle = color;
    this.gameContext.fillRect(0,0,this.context.canvas.width,this.context.canvas.height);
    this.overlayContext.clearRect(0,0,this.context.canvas.width,this.context.canvas.height);
  }
  displayImage(x1,y1,x2,y2,image) {
    this.context.drawImage(image,x1*this.xMul,y1*this.yMul,this.xMul*(x2-x1),this.yMul*(y2-y1));
  }
  setContext(context) {
    if (context === "gameContext") {this.context = this.gameContext;}
    if (context === "overlayContext") {this.context = this.overlayContext;}
  }
}
