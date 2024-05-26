class Triangle{
  constructor(){
    this.type = "trianle";
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
    // for non right angle triangles
    this.regular = true;
    this.oddities = [0.0, 0.0];

    this.buffer = null;
    this.vertices = null;
  }
  render(){
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    //gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    //gl.uniform1f(u_Size, size);

    //var d = this.size/200.0;

    if(this.regular){
      this.oddities = [this.size/200.0, this.size/200.0];
    }else{
      this.oddities = [(this.oddities[0])/200, (this.oddities[1])/200];
    }

    drawTriangle([xy[0], xy[1], xy[0] + this.oddities[0], xy[1], xy[0], xy[1] + this.oddities[1]]);
  }

}
function drawTriangle(vertices){
  var n = 3;

  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    console.log("Failed to create the buffer object.");
    return -1;
  }

  /*if (this.buffer = null){
    this.buffer = gl.createBuffer();
    if(!this.buffer){
      console.log("Failed to create the buffer object.");
      return -1;
    }
  }*/

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //gl.bindBuffer(gl.ARRAY_BUFFER, this.Buffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function draw3DTriangle(vertices){
  var n = 3;

  /*var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    console.log("Failed to create the buffer object.");
    return -1;
  }*/
  if (this.buffer == null){
    this.buffer = gl.createBuffer();
    if(!this.buffer){
      console.log("Failed to create the buffer object.");
      return -1;
    }
  }

  //gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function draw3DUVTriangle(vertices, uv){
  var n = 3;

  if (this.buffer == null){
    this.buffer = gl.createBuffer();
    if(!this.buffer){
      console.log("Failed to create the buffer object.");
      return -1;
    }
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);


  var uvBuffer = gl.createBuffer();
  if(!uvBuffer){
    console.log("Failed to create the uvbuffer object.");
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_UV);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
