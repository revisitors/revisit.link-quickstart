#Glitch Example API
This little project is an example express app that abides by the [revist.link spec.](http://revisit.link/spec.html) and glitches out images!

##Installation:
 - `npm install -g nodemon`
 - `npm install`
 - `cp local.json-dist local.json`

##Usage:
 - `npm start`

The API provides a single `/service` endpoint to POST an image to, which
resonds with the image as modifified by [glitch-jpg](https://github.com/kid-icarus/glitch-jpg).

This also comes with a sample client interface for posting images to, located
at `/`.

By default the app runs on port 8000, this can be configred in local.json.

In order to plug in your own glitching algorithm, take a look at
[glitch-jpg](https://github.com/kid-icarus/glitch-jpg) and make a similar
module to pass the image to! :heart:
