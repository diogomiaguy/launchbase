// REQUIRE
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

//SET
server.set('view engine', 'njk')
nunjucks.configure('views', {
  autoescape: true,
  express: server,
  noCache: true
});

//USE
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

//ligar server
server.listen(3000, function () {
  console.log('listening on port 3000')
})