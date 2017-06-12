class Label {
  constructor(x,y,text,color,font,parent,textUpdateAction) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.font = font;
    this.parent = parent;
    this.isVisible = this.parent.isVisible;
    this.textUpdateAction = textUpdateAction;
  }
  Update(game) {
    this.isVisible = this.parent.isVisible;
    this.textUpdateAction();
    this.Draw(game.graphicsHandler);
  }
  Draw(graphicsHandler) {	
    if (this.isVisible) {
      graphicsHandler.displayText(this.x,this.y,this.text,this.color,this.font);
    }
  }
}
