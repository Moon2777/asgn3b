function move(ev){
  //let last_x = 0;
  //let last_y = 0;

  if(moveCam){
    //let [new_x,new_y] = covertCoordinateEventToGL(ev);
    let [x,y] = covertCoordinateEventToGL(ev);

    //let x = new_x - last_x;
    //let y = new_y - last_y;

    //console.log(x,y);
    camera.viewRoam(x,y);

    //last_x = new_x;
    //last_y = new_y;
  }

}
function ondown(ev){
  moveCam = !moveCam;
  console.log(moveCam);
}
