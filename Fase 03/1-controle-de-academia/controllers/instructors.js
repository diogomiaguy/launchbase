const fs = require('fs');
const data = require('../data.json')
const {
  age,
  date
} = require('../utils')

// index
exports.index = function(req, res){
  return res.render('instructors/index', { instructors: data.instructors })
}

// show/mostrar
exports.show = function (req, res) {
  // req.params.id
  const {
    id
  } = req.params //retira o id

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })
  if (!foundInstructor) return res.send("Nao encontrado")

  //ajustar dados para mostrar no show
  const instructor = {
    ...foundInstructor, //espalhou dentro do abjeto
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }

  return res.render("instructors/show", {
    instructor
  })
}

// create create
exports.create = function (req, res) { return res.render('instructors/create')}

// create
exports.post = function (req, res) {

  const keys = Object.keys(req.body)

  // AQUI VAI A VALIDAÇÃO
  for (key of keys) {
    if (req.body[key] == "")
      return res.send('Todos os campos devem ser preechidos')
  }

  // ORGANIZAR OS DADOS
  let {
    avatar_url,
    name,
    birth,
    gender,
    services
  } = req.body

  //  AQUI O TRATAMENTO
  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  })


  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

    if (err) return res.send("Nao cadastrado")
    return res.redirect("/instructors")
  })
  // return res.send(req.body)
}

// update/edit
exports.edit = function (req, res) {

  // req.params.id
  const {
    id
  } = req.params //retira o id

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })
  if (!foundInstructor) return res.send("Nao encontrado")

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso
  }


  return res.render('instructors/edit', {
    instructor
  })
}

//put
exports.put = function (req, res) {
  
  const { id } = req.body //retira o id

  let index = 0

  const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
    if( id == instructor.id ) {
      index = foundIndex
      return true
    }
  })
  if (!foundInstructor) return res.send("Nao encontrado")

  const instructor = {
    ...foundInstructor,
    ...req.body, //aqui pega os dados atualizados
    birth: Date.parse(req.body.birth), //salva no formato timestamp
    id:Number(req.body.id)
  }

  //atualizar no data.json
  data.instructors[index] = instructor

  fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
    if(err) return res.send('Write error: ' + err)

    return res.redirect(`/instructors/${id}`)
  })
}

// delete
exports.delete = function(req, res) {
  const { id } = req.body //o id

  const filteredInstructors = data.instructors.filter(function(instructor) {
    return instructor.id != id
  })

  data.instructors = filteredInstructors
  fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
    if(err) return res.send('Write error: ' + err)

    return res.redirect(`/instructors`)
  })
}