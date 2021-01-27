var image = null;
var grayimage = null;
var redimage = null;
var rainbowimage = null;
var output;
var canvas;
var pixel;

function loadImage() {
  var file = document.getElementById("img");
  image = new SimpleImage(file);
  grayimage = new SimpleImage(file);
  redimage = new SimpleImage(file);
  rainbowimage = new SimpleImage(file);
  canvas = document.getElementById("cnvs");
  image.drawTo(canvas);
  
}

function makeGray() {
  imageIsLoaded(grayimage);
  for(pixel of grayimage.values()) {
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayimage.drawTo(canvas);
}

function makeRed() {
  imageIsLoaded(redimage);
  for(pixel of redimage.values()) {
    if(pixel.getRed()<255){
      pixel.setRed(255);
    }
  }
  redimage.drawTo(canvas);
}

function makeRainbow() {
  imageIsLoaded(rainbowimage);
  for(var pix of rainbowimage.values()) {
    var x = pix.getX();
    var y = pix.getY();
    var avg = pix.getRed()+pix.getGreen()+pix.getBlue();
    var h = rainbowimage.getHeight()/7;
    if(y<h){
      if(avg<128){
          pix.setRed(2*avg);
      }
      if(avg>=128){
          pix.setRed(255);
          pix.setGreen(2*avg-255);
          pix.setBlue(2*avg-255);
      }
    }
    if(y >= h && y <= 2*h){
      if(avg<128){
          pix.setRed(2*avg);
          pix.setGreen(0.8*avg);
          pix.setBlue(0);
      }if(avg>=128){
          pix.setRed(255);
          pix.setGreen(1.2*avg-51);
          pix.setBlue(2*avg-255);
      }
    }
    if(y >= 2*h && y <= 3*h){
        if(avg<128){
          pix.setRed(2*avg);
          pix.setGreen(2*avg);
          pix.setBlue(0);
        }else if(avg>=128){
          pix.setRed(255);
          pix.setGreen(255);
          pix.setBlue(2*avg-255);
        }
    }
    if(y > 3*h && y < 4*h) {
       if(avg<128){
          pix.setRed(0);
          pix.setGreen(2*avg);
          pix.setBlue(0);
        }if(avg>=128){
          pix.setRed(2*avg-255);
          pix.setGreen(255);
          pix.setBlue(2*avg-255);
        }
    }
    if(y > 4*h && y< 5*h) {
        if(avg<128){
          pix.setRed(0);
          pix.setGreen(0);
          pix.setBlue(2*avg);
        }if(avg>=128){
          pix.setRed(2*avg-255);
          pix.setGreen(2*avg-255);
          pix.setBlue(255);
        }
    }
    if(y>5*h && y<6*h){
        if(avg<128){
          pix.setRed(0.8*avg);
          pix.setGreen(0);
          pix.setBlue(2*avg);
        }if(avg>=128){
          pix.setRed(1.2*avg-51);
          pix.setGreen(2*avg-255);
          pix.setBlue(255);
        }
    }
    if(y>6*h && y<=7*h) {
        if(avg<128){
          pix.setRed(1.6*avg);
          pix.setGreen(0);
          pix.setBlue(1.6*avg);
        }if(avg>=128){
          pix.setRed(0.4*avg+153);
          pix.setGreen(2*avg-255);
          pix.setBlue(0.4*avg+153);
        }
    }
  }
  rainbowimage.drawTo(canvas);
}
function resetImage() {
  imageIsLoaded(image);
  image.drawTo(canvas);
}
function imageIsLoaded(img) {
  if(img == null || !img.complete()){
    alert("Image not loaded");
  }
}

function makeBlur(){
   imageIsLoaded(image);
  output = new SimpleImage(image.getWidth(), image.getHeight());
  for(pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var random = Math.random();
    if(random < 0.5){
      output.setPixel(x, y, pixel);
    }
    if(random > 0.5){
      getNearbyPixel();
    }                  
  }
  function getNearbyPixel() {
    var x = pixel.getX();
    var y = pixel.getY();
    var z = Math.floor(Math.random() * 10 + 1);
    var x2 = x + z;
    var y2 = y + z;
    if(x >= image.getWidth() - 10){
      x2 = x;
    }
    if(y >= image.getHeight() - 10){
      y2 = y;
    }
    var temp = image.getPixel(x2, y2);
    output.setPixel(x, y, temp);
    return output;
  }
  output.drawTo(canvas);
}