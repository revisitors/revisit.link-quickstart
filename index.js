var nconf = require('nconf')
var bodyParser = require('body-parser')
var dataUriToBuffer = require('data-uri-to-buffer')
var glitch = require('glitch-jpg')
var express = require('express')
var app = express()

nconf.argv().env().file({ file: 'local.json'})

app.use(bodyParser.json({limit: '2mb'}))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.sendFile( __dirname + '/index.html')
})


app.post('/service', function(req, res) {
  var imgBuff = dataUriToBuffer(req.body.content.data)
  var glitched = glitch(imgBuff)
  var dataUri = 'data:' + imgBuff.type + ';base64,' + glitched.toString('base64')
  req.body.content.data = dataUri
  req.body.content.type = imgBuff.type
  res.json(req.body)
})

var port = nconf.get('port')
app.listen(port)
console.log('server running on port: ', port)
