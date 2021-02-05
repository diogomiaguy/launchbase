const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')
const server = express() //variavel vira funcao dentro do server

//configurar pastas css, js ...
server.use(express.static('public'))

//ajustar view engine
server.set('view engine', 'njk')
nunjucks.configure('views', {
  autoescape: true,
  express: server,
  noCache: true
});

//aqui ficam as rotas 
server.get('/', function (req, res) {
  return res.render('index')
})

server.get('/portfolio', function (req, res) {
  return res.render('portfolio', { items: videos})
})

server.get('/video', function (req, res) {
  const id = req.query.id
  
  const video = videos.find(function (video) {
    return video.id === id
    // if (video.id == id){
    //   return true
    // }
  })
  if(!video){
    return res.send('Video not found') // pagina de erro
  }

  return res.render('video', { item: video }) //pagina video
})

//liga o server
server.listen(5000, function () {
  console.log('Servidor OK')
})