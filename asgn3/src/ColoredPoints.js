// HelloPoint1.js
// Vertex shader program
var VSHADER_SOURCE =`
precision mediump float;

attribute vec4 a_Position;
attribute vec2 a_UV;

varying vec2 v_UV;

uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotationMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectionMatrix;

void main() {
  gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotationMatrix * u_ModelMatrix * a_Position;
  v_UV = a_UV;
}`;

// Fragment shader program
/*  //gl_FragColor = u_FragColor;
  //gl_FragColor = vec4(v_UV, 1.0, 1.0);*/
var FSHADER_SOURCE =`
precision mediump float;

varying vec2 v_UV;

uniform vec4 u_FragColor;
uniform sampler2D u_Sampler0;
uniform sampler2D u_Sampler1;
uniform sampler2D u_Sampler2;
uniform int u_whichTexture;

void main() {

  if(u_whichTexture == -2){
    gl_FragColor = u_FragColor;

  }else if(u_whichTexture == -1){
    gl_FragColor = vec4(v_UV, 1.0, 1.0);

  }else if(u_whichTexture == 0){
    gl_FragColor = texture2D(u_Sampler0, v_UV);

  }else if(u_whichTexture == 1){
    gl_FragColor = texture2D(u_Sampler1, v_UV);

  }else if(u_whichTexture == 2){
    gl_FragColor = texture2D(u_Sampler2, v_UV);
  }

  else{
    gl_FragColor = vec4(1,.2,.2,1);
  }

}`;

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let a_UV;
let v_UV;
//let u_Size;
let u_whichTexture;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotationMatrix;


function setUpWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function ConnectVariablesToGLS(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.');
    return;
  }

  // Get the storage location of attribute variable
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor variable
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if(!u_FragColor){
    console.log("Failed to get the location of u_FragColor");
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(!u_ModelMatrix){
    console.log("Failed to get the location of u_ModelMatrix");
    return;
  }

  //var idenityM = new Matrix4();
  //gl.uniformMatrix4fv(u_ModelMatrix, false, idenityM.elements);

  u_GlobalRotationMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotationMatrix');
  if(!u_GlobalRotationMatrix){
    console.log("Failed to get the location of u_GlobalRotationMatrix");
    return;
  }

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if(!u_Sampler0){
    console.log("Failed to get the storage location of u_Sampler0");
    return;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if(!u_Sampler1){
    console.log("Failed to get the storage location of u_Sampler1");
    return;
  }

  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if(!u_Sampler2){
    console.log("Failed to get the storage location of u_Sampler2");
    return;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if(!u_Sampler0){
    console.log("Failed to get the storage location of u_whichTexture");
    return;
  }

  //var idenityM = new Matrix4();
  //gl.uniformMatrix4fv(u_ModelMatrix, false, idenityM.elements);
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if(!u_ViewMatrix){
    console.log("Failed to get the location of u_ViewMatrix");
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if(!u_ProjectionMatrix){
    console.log("Failed to get the location of u_ProjectionMatrix");
    return;
  }

}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const ODDTRIANGLE = 3;

let g_selectedColor = [1.0,1.0,1.0,1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 0;
let g_beakAngle = 0;
let g_neckAngle = 0;
let g_headAngle = 0;
let animate = true;
let g_position = [0,-0.5,0];
let camera = new Camera();

function addActionsForHtmlUI(){
  document.getElementById("ani_on").onclick = function(){animate = true};
  document.getElementById("ani_off").onclick = function(){animate = false};

  document.getElementById("beakAngle").addEventListener('mousemove', function(){g_beakAngle = this.value; renderAllShapes(); });
  //document.getElementById("neckAngle").addEventListener('mousemove', function(){g_neckAngle = this.value; renderAllShapes(); });
  //document.getElementById("headAngle").addEventListener('mousemove', function(){g_headAngle = this.value; renderAllShapes(); });
  document.getElementById("cameraAngle").addEventListener('mousemove', function(){g_globalAngle = this.value; renderAllShapes();});

}

let moveCam = false;
function main() {
  //
  setUpWebGL();

  //
  ConnectVariablesToGLS();

  addActionsForHtmlUI();

 // Register function (event handler) to be called on a mouse press
 //canvas.onmousedown = click;

 //canvas.onmousemove = function(ev){if(ev.buttons == 1){click(ev)}};

 // Set the color for clearing <canvas>
 //canvas.onmousedown = ondown;
 canvas.onmousemove = move;

 document.onkeydown = keydown;


 initTexture();
 initTexture1();
 initTexture2();

 gl.clearColor(0.0, 0.0, 0.0, 1.0);

 // Clear <canvas>

 //gl.enable(gl.DEPTH_TEST);
 gl.clear(gl.COLOR_BUFFER_BIT);


 //renderAllShapes();
 requestAnimationFrame(tick);

}

function covertCoordinateEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

  // Store the coordinates to g_points array
  return([x, y]);
}

function renderAllShapes(){

  var startTime = performance.now();
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //gl.clear(gl.COLOR_BUFFER_BIT);

  /*var projMat = new Matrix4();
  projMat.setPerspective(90, canvas.width/canvas.height, .1, 100);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);*/
  //var projMat = camera.projection;
  //console.log(projMat);
  //gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);
  camera.projection();

  /*var viewMat = new Matrix4();
  viewMat.setLookAt(0,0,-2,  0,0,100,  0,1,0);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);*/
  camera.view();

  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, globalRotMat.elements);

  var box3 = new Cube();
  box3.textEnum = 1;
  box3.matrix.scale(64,64,64);
  box3.matrix.translate(-0.5,-0.5,-0.5);
  //box3.matrix.scale(64,64,64);
  box3.render();

  var box = new Cube();
  box.textEnum = 0;
  box.matrix.translate(5,0,5);
  box.matrix.rotate(g_beakAngle, 1, 0, 0 );
  box.matrix.translate(-0.5,-1,-0.5);
  //box.matrix.translate(-0.5,-0.5,0);
  box.render();

  var box2 = new Cube();
  box2.textEnum = 2;
  box2.matrix.translate(0,-1,0);
  box2.matrix.scale(32,0,32);
  box2.matrix.translate(-0.5,0,-0.5);
  box2.render();

  drawAnimal();

  var duration = performance.now() - startTime;
  sendTextToHtml("ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration), "numdot");
}

function sendTextToHtml(text, htmlID){
    var htmlElm = document.getElementById(htmlID);
    if(!htmlID){
      console.log('Failed to get ' + htmlID + "from HTML");
      return;
    }
    htmlElm.innerHTML = text;
}
