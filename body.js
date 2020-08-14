
class Draggable_Body {
  constructor(input_x, input_y, input_vx, input_vy, input_mass) {

    this.dragging = false; // The object is not being dragged by default.
    this.rollover = false; // The mouse is not over the object by default.


    this.position_vector = createVector(input_x, input_y);
    this.velocity_vector = createVector(input_vx, input_vy);
    
    this.mass = input_mass;
    
    this.diameter = 10;
    
  }

  over() {
    // Is mouse over object
    if (mouseX > this.position_vector.x && mouseX < this.position_vector.x + this.diameter && mouseY > this.position_vector.y && mouseY < this.position_vector.y + this.diameter) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }

  }

  update() {

    // Adjust location if being dragged
    if (this.dragging) {
      this.position_vector.x = mouseX + this.offsetX;
      this.position_vector.y = mouseY + this.offsetY;
    }

  }

  show() {

    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    circle(this.position_vector.x, this.position_vector.y, this.diameter);
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.position_vector.x && mouseX < this.position_vector.x + this.diameter && mouseY > this.position_vector.y && mouseY < this.position_vector.y + this.diameter) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.position_vector.x - mouseX;
      this.offsetY = this.position_vector.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
  
  edge_bounce() {
    if (this.position_vector.y >= height - this.diameter / 2) {
      this.position_vector.y = height - this.diameter / 2;
      this.velocity_vector = this.velocity_vector.mult(-1);
}
}
}