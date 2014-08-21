var file = document.querySelector('input[type=file]');
var submitBtn = document.querySelector('.submit')

var img = document.createElement('img');

var payload = {}


var submitHandler = function(e){
  e.preventDefault()
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function(){
    var parsed;
    if (xhr.readyState === 4) {
      parsed = JSON.parse(xhr.responseText)
      img.src = parsed.content;
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


submitBtn.addEventListener('click', submitHandler);
file.addEventListener('change', fileHandler);
