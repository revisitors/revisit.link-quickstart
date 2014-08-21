var nconf = require('nconf')
var bodyParser = require('body-parser')
var dataUriToBuffer = require('data-uri-to-buffer')
var glitch = require('glitch-jpg')
var express = require('express')
var app = express()

nconf.argv().env().file({ file: 'local.json'});

app.use(bodyParser.json({limit: '1mb'}))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.sendFile( __dirname + '/index.html')
})


app.post('/service', function(req, res) {
  var imgBuff = dataUriToBuffer(req.body.content)
  var glitchedBuff = glitch(imgBuff)
  res.json({content: 'data:' + imgBuff.type + ';base64,' + glitchedBuff.toString('base64')})
})

var port = nconf.get('port');
app.listen(port)
console.log('server running on port: ', port);
