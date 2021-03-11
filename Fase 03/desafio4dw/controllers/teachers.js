const fs = require('fs');
const data = require('../data.json')

//configurações da data e aniversario
const {
  age,
  date
} = require('../utils')

exports.index = function (req, res, next) {
  return res.render('teachers/index')
}

// create
exports.create = function (req, res, next) {
  return res.render('teachers/create')
}
// create -> post
exports.post = function (req, res) {
  const keys = Object.keys(req.body)

  // verificar se os campos foram preenchidos
  for (key of keys) {
    if (req.body[key] == "")
      return res.send('Todos os campos devem ser preechidos')
  }

  // caso ok - organizar os dados
  let {
    avatar_url,
    name,
    birth,
    scholarity,
    modality,
    services
  } = req.body

  // tratamento
  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.teachers.length + 1)

  //insere no data.json
  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    scholarity,
    modality,
    services,
    created_at
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

    //caso de erro
    if (err) return res.send('Não cadastrado')
    //caso ok
    return res.redirect('/teachers')

  })


}
// show
exports.show = function (req, res) {
  //retirar o id para verificar se existe no data.json
  const {
    id
  } = req.params
  //verificar
  const foundTeacher = data.teachers.find(function(teacher) {
    return teacher.id == id
  })
  //caso nao exista
  if(!foundTeacher) return res.send("Não encontrado")

  //ajustar dados para mostrar no show
  const teacher = {
    ...foundTeacher, //espalhou dentro do abjeto
    age: age(foundTeacher.birth),
    services: foundTeacher.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
  }

  return res.render("teachers/show", {
    teacher
  })
}