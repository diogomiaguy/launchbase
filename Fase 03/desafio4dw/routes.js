const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')

// create, post, show, edit, put, delete

// rotas teachers
routes.get('/', (req, res) => {
  return res.redirect('teachers')
})
routes.get('/teachers', teachers.index)
routes.get('/teachers/create', teachers.create) 
routes.post('/teachers', teachers.post)
routes.get('/teachers/:id', teachers.show)



//exportar routes
module.exports = routes