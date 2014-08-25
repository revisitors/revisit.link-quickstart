var nconf = require('nconf')
var bodyParser = require('body-parser')
var dataUriToBuffer = require('data-uri-to-buffer')
var express = require('express')
var twitterAPI = require('node-twitter-api')
var app = express()
nconf.argv().env().file({ file: 'local.json'})

var twitter = new twitterAPI({
  consumerKey: nconf.get('consumerKey'),
  consumerSecret: nconf.get('consumerSecret'),
  callback: ''
})

app.use(bodyParser.json({limit: '2mb'}))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.sendFile( __dirname + '/index.html')
})


app.post('/service', function(req, res) {
  var imgBuff = dataUriToBuffer(req.body.content.data)
  var payload = {
    media: [imgBuff],
    status: ''
  }
  twitter.statuses('update_with_media', payload, nconf.get('accessKey'), nconf.get('accessSecret'), function(err, data) {
    if (err) console.log(err)
  })
  res.json(req.body)
})

var port = nconf.get('port')
app.listen(port)
console.log('server running on port: ', port)
