;(function(){
  var file = document.querySelector('input[type=file]')
  var submitBtn = document.querySelector('.submit')
  var img = document.createElement('img')
  var payload = {
    content: {},
    meta: {}
  }

  var submitHandler = function(e){
    e.preventDefault()
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(){
      var parsed
      if (xhr.readyState === 4) {
        parsed = JSON.parse(xhr.responseText)
        img.src = parsed.content.data
      }
    }
    xhr.open('POST', '/service')
    xhr.setRequestHeader('Content-Type', 'application/json')
    if (payload.content.data) {
      xhr.send(JSON.stringify(payload))
    }
  }

  var fileHandler = function(e) {
    var reader = new FileReader()
    reader.onloadend = function() {
      document.querySelector('#preview').appendChild(img)
      img.src = reader.result
      payload.content.type = e.target.files[0].type
      payload.content.data = reader.result
    }

    if (e.target.files[0].type.indexOf('image') !== 0) {
      alert('Nah, this is for images')
    } else {
      reader.readAsDataURL(e.target.files[0])
    }
  }

  submitBtn.addEventListener('click', submitHandler)
  file.addEventListener('change', fileHandler)
})()
