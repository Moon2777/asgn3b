function initTexture(){
  var image = new Image();
  if(!image){
    console.log("Failed to create the image object");
    return false;
  }

  image.onload = function(){ sendImage(image);}
  image.src = "../image/bocchi_1.jpg";

  return true;
}

function sendImage(image){

  var texture = gl.createTexture();
  if(!texture){
    console.log("Failed to create Texture");
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  gl.uniform1i(u_Sampler0, 0);

  console.log('finished LoadTexture');
}


function initTexture1(){
  var image1 = new Image();
  if(!image1){
    console.log("Failed to create the image object");
    return false;
  }

  image1.onload = function(){ sendImage1(image1);}
  image1.src = "skybg(1).jpg";

  return true;
}

function sendImage1(image){

  var texture = gl.createTexture();
  if(!texture){
    console.log("Failed to create Texture");
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  gl.uniform1i(u_Sampler1, 1);

  console.log('finished LoadTexture');
}


function initTexture2(){
  var image2 = new Image();
  if(!image2){
    console.log("Failed to create the image object");
    return false;
  }

  image2.onload = function(){ sendImage2(image2);}
  image2.src = "grass.jpg";

  return true;
}

function sendImage2(image){

  var texture = gl.createTexture();
  if(!texture){
    console.log("Failed to create Texture");
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE2);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  gl.uniform1i(u_Sampler2, 2);

  console.log('finished LoadTexture');
}
