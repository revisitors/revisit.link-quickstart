var sn = require("spatial-noise");
var raf = require('raf');

var file = document.querySelector('input[type=file]');
var submitBtn = document.querySelector('.submit')
var killswitch = document.querySelector('.kill');

var img = document.createElement('img');
var canvas = document.createElement("canvas");
canvas.id = 'noise';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas)

var context = canvas.getContext("2d")
var pixels = context.getImageData(0, 0, canvas.width, canvas.height)

var payload = {}
var killed = false;

var noiseInterval = setInterval(function() {
  var spread = Math.floor(Math.random()*20);
  killswitch.style['box-shadow'] = '11px 2px 15px '+spread+'px #FE0C0C';
}, 500);

var submitHandler = function(e){
  e.preventDefault()
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function(){
    var parsed;
    if (xhr.readyState === 4) {
      parsed = JSON.parse(xhr.responseText)
      img.src = parsed.content

      var data = _parseB64(parsed.content);
      var arrBuffer = _base64toArrayBuffer(data.base64);
      var blob = new Blob([arrBuffer], {type: data.type});
      img.src = URL.createObjectURL(blob);
    }
  }
  xhr.open('POST', '/service')
  xhr.setRequestHeader('Content-Type', 'application/json')
  if (payload.content) xhr.send(JSON.stringify(payload));
}

var fileHandler = function(e) {
  var reader = new FileReader()
  reader.onloadend = function() {
    document.querySelector('header').appendChild(img);
    img.src = reader.result
    payload.content = reader.result
    console.log(payload)
  }

  if (!~e.target.files[0].type.indexOf("image")) {
    alert('Nah, this is for images');
  } else {
    reader.readAsDataURL(e.target.files[0]);
  }
}

var _base64toArrayBuffer  = function(base64) {
  var binary_string =  window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array( len );
  for (var i = 0; i < len; i++)        {
    var ascii = binary_string.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}

var _parseB64 = function(b64str) {
  return {
    base64: b64str.substr(b64str.indexOf(',') + 1),
    type: b64str.match(/:([^}]*);/)[1]
  }
}

// spatial noise background
raf(function update(dt) {
  var ptr = 0
    , t = Date.now()
  for(var i=0; i<canvas.width; ++i) {
    for(var j=0; j<canvas.height; ++j) {
      var v = Math.floor(sn(t, i - 256, j - 256) * 255)
      pixels.data[ptr++] = v
      pixels.data[ptr++] = v
      pixels.data[ptr++] = v
      pixels.data[ptr++] = 255
    }
  }
  context.putImageData(pixels, 0, 0)
  if (!killed) raf(update);
});

submitBtn.addEventListener('click', submitHandler);
file.addEventListener('change', fileHandler);

// kill the spatial noise and killswitch glow
killswitch.addEventListener('click', function() {
  killed = true;
  clearInterval(noiseInterval);
});