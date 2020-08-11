let time_step = 0.5;
let gravitational_constant = 1000;
let body_one;
let body_two;


function setup() {
  createCanvas(1000, 1000);

  body_one = new Body(50, 700, 5, -5, 10, 300, 0); // Black

  body_two = new Body(800, 100, -5, 5, 10, 300, 255); // White


}

function draw() {
  background(50, 89, 100);

  move(body_one, body_two);

  body_one.display_bodies();

  body_two.display_bodies();


}


function move(body1, body2){

  let body1_pos = body1.position_vector;
  let body2_pos = body2.position_vector;

  let body1_pos_to_body2_pos = p5.Vector.sub(body1_pos, body2_pos);
  let body2_pos_to_body1_pos = p5.Vector.sub(body2_pos, body1_pos);

  let dist = body1_pos_to_body2_pos.mag();
  let norm_12 = body1_pos_to_body2_pos.normalize();
  let norm_21 = body2_pos_to_body1_pos.normalize();


  let velo_1 = body1.velocity_vector;
  let velo_2 = body2.velocity_vector;

  let norm_12_array = norm_12.array();
  let norm_21_array = norm_21.array();


  let pos_1_array = body1_pos.array();
  let pos_2_array = body2_pos.array();

  acceleration_1 = ((norm_21.mult(gravitational_constant * body1.mass * body2.mass)).div(pow(dist, 3) * body1.mass));

  acceleration_2 = ((norm_12.mult(gravitational_constant * body1.mass * body2.mass)).div(pow(dist, 3) * body2.mass));


  body1_pos.add(velo_1.mult(time_step).add(acceleration_1.mult(pow(time_step, 2)).div(2)));

  velo_1.add(velo_1.add(acceleration_1.mult(time_step).div(2)));



  body2_pos.add(velo_2.mult(time_step).add(acceleration_2.mult(pow(time_step, 2)).div(2)));

  velo_2.add(velo_2.add(acceleration_2.mult(time_step).div(2)));


  if (pos_1_array[0] > width - 10 || pos_1_array[0] < 10) {
    norm_12_array[0] *=(-1);
  }
  if (pos_1_array[1] > height - 10 || pos_1_array[1] < 10)  {
    norm_12_array[1] *= (-1);
  }

  if (pos_2_array[0] > width - 10 || pos_2_array[0] < 10) {
    norm_21_array[0] *=(-1);
  }
  if (pos_2_array[1] > height - 10 || pos_2_array[1] < 10)  {
    norm_21_array[1] *= (-1);
  }



}
