const express = require('express');
const routes = express.Router() //variavel responsavel pelas rotas
const instructors = require('./instructors')

routes.get('/', function (req, res) {
  return res.redirect('instructors')
})

routes.get('/instructors', function (req, res) {
  return res.render('instructors/index')
})

routes.get('/instructors/create', function (req, res) {
  return res.render('instructors/create')
})

routes.get('/instructors/:id', instructors.show) // show

routes.get('/instructors/:id/edit', instructors.edit) // edit

routes.post('/instructors', instructors.post) // create

routes.put('/instructors', instructors.put)//atualizar

routes.delete('/instructors', instructors.delete) //deletar usuario

routes.get('/members', function (req, res) {
  return res.render('members')
})

module.exports = routes