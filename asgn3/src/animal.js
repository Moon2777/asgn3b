
function drawAnimal(){
  var body = new Sphere();
  body.segment = 6;
  body.color = [0.75, 0.5, 0.5, 1];
  body.matrix.translate(0,-0.5,0);
  body.matrix.rotate(90, 0, 1, 0);
  body.matrix.rotate(20, 1, 0, 0);
  var bodyCoord = new Matrix4(body.matrix);
  //body.matrix.translate(-0.25,-0.25,0.25);
  //var bodyCoord = new Matrix4(body.matrix);
  body.matrix.scale(0.5,0.375,0.6);
  //body.matrix.rotate(180, 0, 0, 0);
  //body.matrix.rotate(15, 1, 0, 0);
  body.render();


  var neck = new Cylinder();
  neck.color = [0.5, 0.5, 0.5, 1];
  neck.segment = 10;
  neck.matrix = new Matrix4(bodyCoord);
  neck.matrix.translate(0,0.05,-0.7);
  neck.matrix.rotate( 45*Math.sin(g_neckAngle * Math.PI/180) , 1, 0, 0);
  var neckCoords = new Matrix4(neck.matrix);
  neck.matrix.scale(0.1,0.1,0.25);
  //var neckCoords = new Matrix4(neck.matrix);
  //neck.matrix.translate(0, -1.5,-1.75);
  //neck.matrix.translate(0, 4,-2);
  //var neckCoords = new Matrix4(neck.matrix);
  neck.render();


  // Head
  var head = new Sphere();
  head.segment = 10;
  head.matrix = neckCoords;
  //head.matrix.rotate(((g_headAngle))/3 - 105, 1, 0, 0);
  head.matrix.translate(0,-0.1,-0.15);
  head.color = [0.5, 0.5, 0.5, 1];
  head.matrix.scale(0.25,0.25,0.25);
  head.matrix.rotate( 45 * Math.sin(g_headAngle * Math.PI/180) , 1, 0, 0);
  var headCoord = new Matrix4(head.matrix);
  head.render();


  // Right eye
  var eye1 = new Sphere();
  eye1.segment = 10;
  eye1.color = [1, 1, 1, 1];
  eye1.matrix = new Matrix4(headCoord);
  eye1.matrix.scale(0.5,0.5,0.5);
  eye1.matrix.translate(1.25,0.25,0);
  eye1.render();


  // Left eye
  var eye2 = new Sphere();
  eye2.segment = 10;
  eye2.color = [1, 1, 1, 1];
  eye2.matrix = new Matrix4(headCoord);
  eye2.matrix.scale(0.5,0.5,0.5);
  eye2.matrix.translate(-1.25,0.25,0);
  eye2.render();

  // Upper beak
  var upper1 = new Pyramid();
  upper1.color = [1, 1, 0, 1];
  upper1.matrix = new Matrix4(headCoord);
  upper1.matrix.scale(1.25,1.25,1.25);
  upper1.matrix.rotate(180, 0, 1, 0);
  upper1.matrix.translate(-0.5,-0.125,0.5);
  var upperCoord = upper1.matrix;
  upper1.render();
  // Lower beak
  var upper2 = new Pyramid();
  upper2.color = [1, 1, 0, 1];
  upper2.matrix = upperCoord;
  upper2.matrix.scale(1,-1,1);
  upper2.matrix.rotate(-90*Math.abs(Math.sin(g_beakAngle * Math.PI/180)), 1, 0, 0);
  upper2.render();


  var leg1 = new Sphere();
  leg1.segment = 4;
  leg1.color = [0.75, 0.5, 0.5, 1];
  leg1.matrix = new Matrix4(bodyCoord);
  leg1.matrix.scale(0.25,0.25,0.25);
  leg1.matrix.translate(1.5,-0.5,1);
  var leg1Coord = new Matrix4(leg1.matrix);
  leg1.render();

  var leg2 = new Sphere();
  leg2.segment = 4;
  leg2.color = [0.75, 0.5, 0.5, 1];
  leg2.matrix = new Matrix4(bodyCoord);
  leg2.matrix.scale(0.25,0.25,0.25);
  leg2.matrix.translate(-1.5,-0.5,1);
  var leg2Coord = new Matrix4(leg2.matrix);
  leg2.render();

  var feet1 = new Pyramid();
  feet1.color = [1, 1, 0, 1];
  feet1.matrix = leg1Coord;
  feet1.matrix.rotate(165, 1, 0, 0);
  feet1.matrix.rotate(180, 0, 0, 1);

  feet1.matrix.rotate(-45*Math.sin(g_neckAngle * Math.PI/180), 1, 0, 0);
  feet1.matrix.translate(-1,-1.25, -0.25);
  feet1.matrix.scale(2, 2, 2);
  feet1.render();

  var feet2 = new Pyramid();
  feet2.color = [1, 1, 0, 1];
  feet2.matrix = leg2Coord;
  feet2.matrix.rotate(165, 1, 0, 0);
  feet2.matrix.rotate(180, 0, 0, 1);

  feet2.matrix.rotate(45*Math.sin(g_neckAngle * Math.PI/180), 1, 0, 0);
  feet2.matrix.translate(-1, -1.25, -0.25);
  feet2.matrix.scale(2, 2, 2);
  feet2.render();
}
