var g_startTime = performance.now()/10000;
var g_seconds = performance.now()/10000 - g_startTime;
function tick(){
  g_seconds = performance.now()/10000 - g_startTime;
  //console.log(g_seconds);

  /*if(g_seconds % 100){
    renderAllShapes();
    //requestAnimationFrame(tick);
  }*/
  updateAnimation();

  renderAllShapes();

  requestAnimationFrame(tick);
}

function updateAnimation(){
  if (animate){
    let t = 360 * Math.sin(g_seconds);
    g_beakAngle = 2*t;
    g_neckAngle = 2*t;
    g_headAngle = 2*t;
  }

  if(g_position[0] > 32 || g_position[0] < -32){
    g_position[0] *= -1;
  }else{
    g_position[0] += -1;
  }


}
