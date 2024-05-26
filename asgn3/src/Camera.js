class Camera{
  constructor(){
    this.fov = 60;
    this.eye = new Vector3([0,0,0]);
    this.at = new Vector3([0,0,-1]);
    this.up = new Vector3([0,1,0]);

  }

  moveFoward(){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();

    f.elements[1] = 0;

    this.eye = this.eye.add(f);
    this.at = this.at.add(f);
  }

  moveBackward(){
    let b = new Vector3();
    b.set(this.eye);
    b.sub(this.at);
    b.normalize();

    b.elements[1] = 0;

    this.eye = this.eye.add(b);
    this.at = this.at.add(b);
  }

  moveLeft(){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);

    let s = Vector3.cross(this.up, f);
    s.normalize();

    this.eye = this.eye.add(s);
    this.at = this.at.add(s);
  }

  moveRight(){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);

    let s = Vector3.cross(f, this.up);
    s.normalize();

    this.eye = this.eye.add(s);
    this.at = this.at.add(s);
  }

  viewRoam(x){

    if(x > 0){
      this.panRight(-1);
    }

    if(x < 0){
      this.panLeft(1);
    }



  }

  panLeft(alpha){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);

    //let alpha = 1;

    let rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(alpha,
    this.up.elements[0], this.up.elements[1], this.up.elements[2]);

    let f_prime = new Vector3();
    f_prime = rotationMatrix.multiplyVector3(f);

    let temp_eye = new Vector3;
    temp_eye.set(this.eye);

    this.at = temp_eye.add(f_prime);

  }

  panRight(alpha){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);

    //let alpha = -1;

    let rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(alpha,
    this.up.elements[0], this.up.elements[1], this.up.elements[2]);

    let f_prime = new Vector3();
    f_prime = rotationMatrix.multiplyVector3(f);

    let temp_eye = new Vector3;
    temp_eye.set(this.eye);

    this.at = temp_eye.add(f_prime);

  }

  projection(){
    let projMat = new Matrix4();
    projMat.setPerspective(this.fov, canvas.width/canvas.height, .1, 1000);

    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);
    //return projMat;
  }

  view(){
    let viewMat = new Matrix4();
    //this.up.elements[0]
    viewMat.setLookAt(
      this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
      this.at.elements[0],this.at.elements[1],this.at.elements[2],
      this.up.elements[0],this.up.elements[1],this.up.elements[2]
    );


    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  }

}
