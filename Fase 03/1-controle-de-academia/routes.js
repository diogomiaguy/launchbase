const express = require('express');
const routes = express.Router() //variavel responsavel pelas rotas
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')

// AREA ROTAS INSTRUCTORS
routes.get('/', function (req, res) {
  return res.redirect('instructors')
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', instructors.create) //create
routes.get('/instructors/:id', instructors.show) // show
routes.get('/instructors/:id/edit', instructors.edit) // edit
routes.post('/instructors', instructors.post) // create
routes.put('/instructors', instructors.put)//atualizar
routes.delete('/instructors', instructors.delete) //deletar usuario


// AREA ROTAS MEMBERS
routes.get('/members', members.index)

routes.get('/members/create', function (req, res) {
  return res.render('members/create')
})
routes.get('/members/:id', members.show) // show
routes.get('/members/:id/edit', members.edit) // edit
routes.post('/members', members.post) // create
routes.put('/members', members.put)//atualizar
routes.delete('/members', members.delete) //deletar usuario

module.exports = routes