var nconf = require("nconf");
var bodyParser = require('body-parser')
var dataUriToBuffer = require('data-uri-to-buffer')
var express = require('express')
var app = express()

nconf.argv().env().file({ file: 'local.json'});

/**
 * This is your custom transform function
 * move it wherever, call it whatever
 */
var transform = require("./transformer")

// Set up some Express settings
app.use(bodyParser.json({ limit: '1mb' }))
app.use(express.static(__dirname + '/public'))

/**
 * Home route serves index.html file, and
 * responds with 200 by default for revisit
 */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

/**
 * Service route is where the magic happens.
 */
app.post('/service', function(req, res) {

  var imgBuff = dataUriToBuffer(req.body.content.data)

  // Transform the image
  var transformed = transform(imgBuff)

  var dataUri = 'data:' + imgBuff.type + ';base64,' + transformed.toString('base64')
  req.body.content.data = dataUri
  req.body.content.type = imgBuff.type
  res.json(req.body)

})

var port = nconf.get("port");
app.listen(port)
console.log('server running on port: ', port)
