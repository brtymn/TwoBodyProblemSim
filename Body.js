
class Body{
  
  constructor(x, y, d, m){

    this.position_vector = createVector(x, y, 0);
    this.velocity_vector = createVector(0, 0);
    this.diameter = d;
    this.mass = m;
  
  }
  
  display_bodies() {
    noStroke();
    fill(255);
    circle(this.position_vector.x, this.position_vector.y, this.diameter);
  
  }
  
}