const fs = require('fs');
const data = require('../data.json')

//configurações da data e aniversario
const {
  age,
  date
} = require('../utils')

exports.index = function (req, res, next) {
  return res.render('teachers/index', { teachers: data.teachers })
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
  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id
  })
  //caso nao exista
  if (!foundTeacher) return res.send("Não encontrado")

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
//edit
exports.edit = function (req, res) {
  //pegar o id 
  const {
    id
  } = req.params //retira o id
  //verificar se existe o id
  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id //retorna se o id é igual
  })
  //caso nao encontre
  if (!foundTeacher) return res.send("Não encontrado")

  //pega tudo para passar pra rota edit
  // date iso para pode editar - verificar iso
  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso
  }

  //retorna para a rota
  return res.render('teachers/edit', {
    teacher
  }) //passa a const teacher para rota
}
//edit -> put
exports.put = function (req, res) {
  //retira o id
  const {
    id
  } = req.body
  //define index 0
  let index = 0
  //verifica se existe o id 
  const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
    index = foundIndex //rever aula sobre isso
    return true
  })
  //caso nao encontre
  if (!foundTeacher) return res.send("Não encontrado")

  //caso ok
  const teacher = {
    ...foundTeacher,
    ...req.body, //aqui pega os dados atualizados
    birth: Date.parse(req.body.birth), //salva no formato timestamp
    id: Number(req.body.id)
  }

  //atualiza no json
  data.teachers[index] = teacher
  fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function (err){
    if (err) return res.send('Write error: ' + err)

    return res.redirect(`/teachers/${id}`)
  })

}
//delete
exports.delete = function(req, res){
  //pega o id 
  const { id } = req.body
  // busca e filtra id
  const filteredTeachers = data.teachers.filter(function(teacher){
    return teacher.id != id
  })

  //exclui
  data.teachers = filteredTeachers
  fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function (err) {
    if(err) return res.send('Write error: ' + err)
    return res.redirect(`/teachers`)
  })
}