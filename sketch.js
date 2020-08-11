let time_step = 0.5;
let gravitational_constant = 1000000;
let body_one;
let body_two;


function setup() {
  createCanvas(800, 800);
  
  body_one = new Body(100, 200, 100, 100);
  body_two = new Body(300, 400, 100, 100);
  
  
}

function draw() {
  background(50, 89, 100);
  
  move_the_system(body_one, body_two);
  
  body_one.display_bodies();
  body_two.display_bodies();
  
  
  
}


function calculate_distance(body1, body2, n){
  
  let body1_pos = body1.position_vector;
  let body2_pos = body2.position_vector;
  
  let body1_pos_to_body2_pos = p5.Vector.sub(body1_pos, body2_pos);
  let body2_pos_to_body1_pos = p5.Vector.sub(body2_pos, body1_pos);
    
  if (n == 12){
    return body1_pos_to_body2_pos;
  }
  else if (n == 21){
    return body2_pos_to_body1_pos;
  }
  
}


function calculate_forces(body1, body2, n){
  
  let dist = calculate_distance(body1, body2, 12).mag();
  let norm_12 = calculate_distance(body1, body2, 12).normalize();
  let norm_21 = calculate_distance(body1, body2, 21).normalize();
  
  acceleration_1 = ((norm_21.mult(gravitational_constant * body1.mass * body2.mass)).div(pow(dist, 3) * body1.mass));
  
  acceleration_2 = ((norm_12.mult(gravitational_constant * body1.mass * body2.mass)).div(pow(dist, 3) * body2.mass));
  
  if (n == 1){
    return acceleration_1;
  }
  else if (n == 2){
    return acceleration_2;
  }

  
}


function move_the_system(body1, body2){
  
  let pos_1 = body1.position_vector;
  let velo_1 = body1.velocity_vector;
  let acc_1 = calculate_forces(body1, body2, 1);
  let pos_2 = body2.position_vector;
  let velo_2 = body1.velocity_vector;
  let acc_2 = calculate_forces(body1, body2, 2);
  
  pos_1.add(velo_1.mult(time_step).add(acc_1.mult(pow(time_step, 2)).div(2)));
  
  velo_1.add(velo_1.add(acc_1.mult(time_step).div(2)));
  
  
  
  pos_2.add(velo_2.mult(time_step).add(acc_2.mult(pow(time_step, 2)).div(2)));
  
  velo_2.add(velo_2.add(acc_2.mult(time_step).div(2)));
  


}