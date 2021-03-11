const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const routes = require('./routes')
const port = 3000

server.use(express.urlencoded({ extended: true }))
//config css, js...
server.use(express.static('public'))
// config nunjucks
server.set('view engine', 'njk')
nunjucks.configure('views', {
  autoescape: true,
  express: server,
  noCache: true
})

// rotas
server.use(routes)

//ligar server
server.listen(port, function () {
  console.log('listening on port ' + port)
})