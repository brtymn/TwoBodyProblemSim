
let draggable_1; // Define the first object.
let draggable_2; // Define the second onject.

let time_step = 0.5;
let gravitational_constant = 0; // Initially set to zero to be able to use the start button.

let initial_position_1_x = 200
let initial_position_1_y = 200

let initial_velocity_1_x = 0 // Initially set to zero to be able to use the start button.
let initial_velocity_1_y = 0 // Initially set to zero to be able to use the start button.

let initial_position_2_x = 200
let initial_position_2_y = 500

let initial_velocity_2_x = 0 // Initially set to zero to be able to use the start button.
let initial_velocity_2_y = 0 // Initially set to zero to be able to use the start button.



function setup() {

  createCanvas(500, 500); // Canvas size will be adjusted for the website.

  draggable_body_1 = new Draggable_Body(initial_position_1_x, initial_position_1_y, initial_velocity_1_x, initial_velocity_1_y, 100, color("Magenta")); // Create the first object.

  draggable_body_2 = new Draggable_Body(initial_position_2_x, initial_position_2_y, initial_velocity_2_x, initial_velocity_2_y, 100, color("Yellow")); // Create the second onject.

  //Button Definitions Start.

  button_start = createButton("START"); // Initialize the button name.
  button_start.position(19, 19); // Inıtialize the button position.
  button_start.mousePressed(Start_Sim); // Redirect to a function when the button is clicked.


  button_reset = createButton('RESET'); // Initialize the button name.
  button_reset.position(19, 50); // Initialize the button position.
  button_reset.mousePressed(Reset_Bodies); // Redirect to a function when the button is clicked.

  // Button Definitions End.



}

function draw() {

  background(0);

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

  draggable_body_1_velo.mult(0.999); // Just an addition to prevent the objects go crazy with velocity.



  draggable_body_2_pos.add((draggable_body_2_velo.mult(time_step)).add(acceleration_2.mult(pow(time_step, 2)).div(2)));

  draggable_body_2_velo.add(draggable_body_2_velo.add(acceleration_2.mult(time_step).div(2)));

  draggable_body_2_velo.mult(0.999); // Just an addition to prevent the objects go crazy with velocity.

  if (dist == 2 * draggable_body_1.diameter){

    draggable_body_1.velocity_vector = draggable_body_1.velocity_vector.mult(-0.9);
    draggable_body_2.velocity_vector = draggable_body_2.velocity_vector.mult(-0.9);
  }



}

function Reset_Bodies(){

  gravitational_constant = 0;

  draggable_body_1.position_vector  = createVector(initial_position_1_x, initial_position_1_y);
  draggable_body_1.velocity_vector = createVector(initial_velocity_1_x, initial_velocity_1_y);

  draggable_body_2.position_vector  = createVector(initial_position_2_x, initial_position_2_y);
  draggable_body_2.velocity_vector = createVector(initial_velocity_2_x, initial_velocity_2_y);


}



function Start_Sim(){

  // New velocity values after the start button is pressed.
  let start_velocity_1_x = 5;
  let start_velocity_1_y = 5;

  let start_velocity_2_x = 5;
  let start_velocity_2_y = 5;


  gravitational_constant = 100; // Give a value to the gravitational constant after the button is pressed.

  draggable_body_1.velocity_vector = createVector(start_velocity_1_x, start_velocity_1_y);
  draggable_body_2.velocity_vector = createVector(start_velocity_2_x, start_velocity_2_y);


}
