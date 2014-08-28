# Starter revisit.link Service

[Ryan](http://github.com/kid-icarus) made [a glitch sample app](https://github.com/revisitors/glitch-api-example) for <revisit.link>. I cloned it and edited it a little to make it more bare bones/general use. You can use it to build your own revisit.link service on top of it, if you want.


## How does it work?

#### Setup

1. Clone this repo
1. Run `npm install` from the new directory
1. Make a new GitHub repo for your code, copy the SSH link
1. Use `git remote set-url <new repo url>` to point your code to your own repo

#### Transform

1. In transformer.js, write code to do your transformation to the image buffer. (See below for examples of how others are doing these transformations.)
1. Add dependencies as needed with `npm install --save <libname>`
1. Test your code locally by running `npm start` from the repo directory

#### Deploy

1. Find hosting for your app (see below for some example options)
1. Deploy code to the hosting provider, copy the URL/port where your app is running
1. Oh yeah, make sure it's actually running...

#### Add to revisit.link

1. Go to <https://github.com/revisitors/revisit.link.hub>
1. Switch to the `master` branch if you're not already there
1. Navigate to `config/services.json`, click the "edit" icon
1. Add your service details
1. Commit your changes (right in the browser because future) and submit the pull request



## Transformation libraries and options

* Image manipulation with ImageMagick: <https://www.npmjs.org/package/gm>
* Canvas on the server (uses Cairo): <https://www.npmjs.org/package/canvas>
* Modifying pixel data directly: <https://github.com/revisitors/glitcher>
* Diff of two images? <https://github.com/uber/image-diff>
* Possibly interesting usages of <https://github.com/mikolalysenko/get-pixels> and <https://github.com/mikolalysenko/save-pixels>


## Hosting options

There are tons of other ones but these seem like two solid options:

* Heroku <https://devcenter.heroku.com/articles/getting-started-with-nodejs>
* Digital Ocean <https://www.digitalocean.com/community/tutorials/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab>

For DO you don't even really need to use the nginx part, you can just use the yourdomain.com:8000 URL for something like this as many are doing.
