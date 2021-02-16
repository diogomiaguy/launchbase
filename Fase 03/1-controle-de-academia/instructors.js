const fs = require('fs');
const data = require('./data.json')
const { age } = require('./utils')

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
    ...foundInstructor,//espalhou dentro do abjeto
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }

  return res.render("instructors/show", { instructor })
}

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
    return res.redirect("instructors")
  })
  // return res.send(req.body)
}
// update


// delete