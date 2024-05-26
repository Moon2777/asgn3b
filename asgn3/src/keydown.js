function keydown(ev){

  console.log(ev.keyCode);

  switch(ev.keyCode){
    case 65: // a
      camera.moveLeft();

      break;
    case 68: // d
      camera.moveRight();

      break;
    case 87: // w
      camera.moveFoward();

      break;
    case 83: //s

      camera.moveBackward();

      break;

    case 81: // q

      camera.panLeft(5);
      break;

    case 69: // e

      camera.panRight(-5);
      break;

    case 70:
      moveCam = !moveCam;
      console.log(moveCam);
      break;
  }

    //console.log(camera.eye);
    //console.log(camera.at);
    renderAllShapes();

}
