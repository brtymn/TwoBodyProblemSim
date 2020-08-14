
let draggable_1;
let draggable_2;

let time_step = 0.5;
let gravitational_constant = 1000;


function setup() {
  createCanvas(500, 500);
  draggable_body_1 = new Draggable_Body(100, 100, 0, 0, 100);
  draggable_body_2 = new Draggable_Body(100, 400, 0, 0, 100);
}

function draw() {
  background(200);
  
  
  draggable_body_1.update();
  draggable_body_1.over();
  draggable_body_1.show();
  draggable_body_1.edge_bounce();
  
  draggable_body_2.update();
  draggable_body_2.over();
  draggable_body_2.show();
  draggable_body_2.edge_bounce();
  
  Gravity_Move(draggable_body_1, draggable_body_2);
}

function mousePressed() {
  draggable_body_1.pressed();
  draggable_body_2.pressed();
}

function mouseReleased() {
  // Quit dragging
  draggable_body_1.released();
  draggable_body_2.released();
}


function Gravity_Move(body1, body2){
  
  let draggable_body_1_pos = draggable_body_1.position_vector;
  let draggable_body_2_pos = draggable_body_2.position_vector;
  
  let body1_pos_to_body2_pos = p5.Vector.sub(draggable_body_1_pos, draggable_body_2_pos);
  let body2_pos_to_body1_pos = p5.Vector.sub(draggable_body_2_pos, draggable_body_1_pos);    

  let dist = body1_pos_to_body2_pos.mag();
  
  let norm_12 = body1_pos_to_body2_pos.normalize();
  let norm_21 = body2_pos_to_body1_pos.normalize();
  
    
  let draggable_body_1_velo = draggable_body_1.velocity_vector;
  let draggable_body_2_velo = draggable_body_2.velocity_vector;
  
  let norm_12_array = norm_12.array();
  let norm_21_array = norm_21.array();
  
  
  let draggable_body_1_pos_array = draggable_body_1_pos.array();
  let draggable_body_2_pos_array = draggable_body_2_pos.array();
  
  acceleration_1 = ((norm_21.mult(gravitational_constant * draggable_body_1.mass * draggable_body_2.mass)).div(pow(dist, 3) * draggable_body_1.mass));
  
  acceleration_2 = ((norm_12.mult(gravitational_constant * draggable_body_1.mass * draggable_body_2.mass)).div(pow(dist, 3) * draggable_body_2.mass));
    
  
  draggable_body_1_pos.add(draggable_body_1_velo.mult(time_step).add(acceleration_1.mult(pow(time_step, 2)).div(2)));
  
  draggable_body_1_velo.add(draggable_body_1_velo.add(acceleration_1.mult(time_step).div(2)));
  
  
  
  draggable_body_2_pos.add(draggable_body_2_velo.mult(time_step).add(acceleration_2.mult(pow(time_step, 2)).div(2)));
  
  draggable_body_2_velo.add(draggable_body_2_velo.add(acceleration_2.mult(time_step).div(2)));
  
}
