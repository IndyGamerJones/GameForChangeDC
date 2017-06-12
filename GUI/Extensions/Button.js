class Button {
  constructor(x1,y1,x2,y2,text,textColor,textSize,outlineColor,textUpdateAction,action,parent,desc) {
    this.rect = new Rectangle(x1,y1,x2,y2);
    this.action = action;
    this.parent = parent;
    this.outlineColor = outlineColor;
    this.lastClick = -1;
    this.desc = desc;
    this.isVisible = this.parent.isVisible;
    this.label = new Label((this.rect.x1+this.rect.x2)/2-1.5,(this.rect.y1+this.rect.y2)/2,text,textColor,textSize + " Verdana",this,textUpdateAction);
  }
  Update(game) {
    this.HandleInput(game.inputHandler,game.graphicsHandler);
  }
  HandleInput(inputHandler,graphicsHandler) {
    if (this.rect.containsPoint(inputHandler.mouseX,inputHandler.mouseY)) {
      if (inputHandler.mouseBtn[0] && this.lastClick != inputHandler.lastClick) {
        this.lastClick = inputHandler.lastClick;
        this.action();
        this.Draw(graphicsHandler,"Pressed");
      }else {
        this.Draw(graphicsHandler, "Hover",inputHandler);
      }
    }
    else {
      this.Draw(graphicsHandler, "Idle");
    }
  }
  Draw(graphicsHandler,e,i) {
    if (this.isVisible) {
      graphicsHandler.displayRoundedRect(this.rect.x1,this.rect.y1,this.rect.x2,this.rect.y2,2,this.outlineColor);
      this.label.Draw(game.graphicsHandler);
      if (e === "Hover") {
          graphicsHandler.displayTooltip(this.desc,i.mouseX,i.mouseY);
      }
    }
  }
}
