(function() {
  window.addEventListener('DOMContentLoaded', function(e){
    var payload = {}
    var submitBtn = document.querySelector('input[type=submit]')
    var submitHandler = function(e){
      e.preventDefault()

      var xhr = new XMLHttpRequest()
      var img = document.querySelector('img')
      xhr.onreadystatechange = function(){
        var parsed;
        if (xhr.readyState === 4) {
          parsed = JSON.parse(xhr.responseText)
          img.src = parsed.content
          console.log(parsed.content)
        }
      }
      xhr.open('POST', '/service')
      xhr.setRequestHeader('Content-Type', 'application/json')


      var file = document.querySelector('input[type=file]').files[0];
      var reader = new FileReader()
      reader.onloadend = function() {
        img.src = reader.result
        payload.content = reader.result
        console.log(payload)
        xhr.send(JSON.stringify(payload))
      }
      reader.readAsDataURL(file)

    }

    submitBtn.addEventListener('click', submitHandler)
  })
})()
