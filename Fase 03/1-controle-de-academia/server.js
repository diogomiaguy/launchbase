// REQUIRE
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

//SET
server.set('view engine', 'njk')
nunjucks.configure('views', {
  autoescape: true,
  express: server,
  noCache: true
});

//USE
server.use(express.static('public'))
server.use(routes)


//RODAR SERVIDOR
server.listen(5000, function () {
  console.log('Server is running on')
})