class Panel {
  constructor(visible) {this.elements = [];this.isVisible = visible;}
  addElement(element) {this.elements.push(element);}
  addElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      this.elements.push(elements[i]);
    }
  }
  Update(game) {
    for (var i = 0; i < this.elements.length; i++) {
      this.elements[i].Update(game);
    }
  }
  setVisible(visible) {this.visible = visible;}
}
