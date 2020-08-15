
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

let mass_1 = 1 // Initially set to zero, the object diameter will depend on this.
let mass_2 = 1 // Initially set to zero, the object diameter will depend on this.



function setup() {

  createCanvas(500, 500); // Canvas size will be adjusted for the website.

  textSize(10);

  draggable_body_1 = new Draggable_Body(initial_position_1_x, initial_position_1_y, initial_velocity_1_x, initial_velocity_1_y, mass_1, color("Magenta")); // Create the first object.

  draggable_body_2 = new Draggable_Body(initial_position_2_x, initial_position_2_y, initial_velocity_2_x, initial_velocity_2_y, mass_1, color(0, 0, 255)); // Create the second onject.

  //Button Definitions Start.

  button_start = createButton("START"); // Initialize the button name.
  button_start.position(19, 19); // Inıtialize the button position.
  button_start.mousePressed(Start_Sim); // Redirect to a function when the button is clicked.


  button_reset = createButton('RESET'); // Initialize the button name.
  button_reset.position(19, 57); // Initialize the button position.
  button_reset.mousePressed(Reset_Bodies); // Redirect to a function when the button is clicked.

  // Button Definitions End.


  // Slider Definitions Start.
  slider_body_1_x_axis = createSlider(-100, 100, 5);
  slider_body_1_x_axis.position(100, 19);
  slider_body_1_x_axis.style('width', '80px');

  slider_body_1_y_axis = createSlider(-100, 100, 5);
  slider_body_1_y_axis.position(100, 38);
  slider_body_1_y_axis.style('width', '80px');

  slider_body_1_mass = createSlider(1, 500, 5);
  slider_body_1_mass.position(100, 57);
  slider_body_1_mass.style('width', '80px');



  slider_body_2_x_axis = createSlider(-100, 100, 5);
  slider_body_2_x_axis.position(200, 19);
  slider_body_2_x_axis.style('width', '80px');

  slider_body_2_y_axis = createSlider(-100, 100, 5);
  slider_body_2_y_axis.position(200, 38);
  slider_body_2_y_axis.style('width', '80px');

  slider_body_2_mass = createSlider(1, 500, 5);
  slider_body_2_mass.position(200, 57);
  slider_body_2_mass.style('width', '80px');



  slider_gravitational_constant = createSlider(0, 1000, 20);
  slider_gravitational_constant.position(300, 38);
  slider_gravitational_constant.style('width', '80px');
  // Slider Definitions End.

}

function draw() {

  background(255);

  draggable_body_1.update();
  draggable_body_1.over();
  draggable_body_1.show();
  draggable_body_1.edge_bounce();

  draggable_body_2.update();
  draggable_body_2.over();
  draggable_body_2.show();
  draggable_body_2.edge_bounce();

  Gravity_Move(draggable_body_1, draggable_body_2);

  text('Body 1, x-axis:', 100, 100);

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


  draggable_body_1.position_vector  = createVector(initial_position_1_x, initial_position_1_y);
  draggable_body_1.velocity_vector = createVector(initial_velocity_1_x, initial_velocity_1_y);

  draggable_body_2.position_vector  = createVector(initial_position_2_x, initial_position_2_y);
  draggable_body_2.velocity_vector = createVector(initial_velocity_2_x, initial_velocity_2_y);


}



function Start_Sim(){

  // New velocity values after the start button is pressed.
  let start_velocity_1_x = slider_body_1_x_axis.value();
  let start_velocity_1_y = slider_body_1_y_axis.value();

  let start_velocity_2_x = slider_body_2_x_axis.value();
  let start_velocity_2_y = slider_body_2_y_axis.value();


  gravitational_constant = slider_gravitational_constant.value(); // Give a value to the gravitational constant after the button is pressed.

  draggable_body_1.velocity_vector = createVector(start_velocity_1_x, start_velocity_1_y);
  draggable_body_2.velocity_vector = createVector(start_velocity_2_x, start_velocity_2_y);

  mass_1 = slider_body_1_mass.value();
  mass_2 = slider_body_2_mass.value();


}
