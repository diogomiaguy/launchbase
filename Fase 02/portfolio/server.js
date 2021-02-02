const express = require('express')
const nunjucks = require('nunjucks')

const server = express() //variavel vira funcao dentro do server

//configurar pastas css, js ...
server.use(express.static('public'))

//ajustar view engine
server.set('view engine', 'njk')
nunjucks.configure('views', {
  autoescape: true,
  express: server
});

//aqui ficam as rotas 
server.get('/', function (req, res) {
  return res.render('index')
})

server.get('/portfolio', function (req, res) {
  return res.render('portfolio')
})

//liga o server
server.listen(5000, function () {
  console.log('Servidor OK')
})