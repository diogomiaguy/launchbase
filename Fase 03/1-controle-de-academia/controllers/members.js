const fs = require('fs');
const data = require('../data.json')
const {
  // age,
  date
} = require('../utils')

// index
exports.index = function(req, res){
  return res.render('members/index', { members: data.members })
}

// show/mostrar
exports.show = function (req, res) {
  // req.params.id
  const {
    id
  } = req.params //retira o id

  const foundMember = data.members.find(function (member) {
    return member.id == id
  })
  if (!foundMember) return res.send("Nao encontrado")

  //ajustar dados para mostrar no show
  const member = {
    ...foundMember, //espalhou dentro do abjeto
    birth: date(foundMember.birth).birthDay,
    // services: foundMember.services.split(","),
    // created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at),
  }

  return res.render("members/show", {
    member
  })
}

// create
exports.post = function (req, res) {

  const keys = Object.keys(req.body)

  // AQUI VAI A VALIDAÇÃO
  for (key of keys) {
    if (req.body[key] == "")
      return res.send('Todos os campos devem ser preechidos')
  }

  //  AQUI O TRATAMENTO
  birth = Date.parse(req.body.birth)
  // const created_at = Date.now()

  // logica pra pegar um id se ele existir
  let id = 1
  const lastMember = data.members[data.members.length - 1] //pega a ultima posição
  if(lastMember){
    id = lastMember.id + 1
  }

  data.members.push({
    id,
    ...req.body,
    birth
  })


  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

    if (err) return res.send("Nao cadastrado")
    return res.redirect("/members")
  })
  // return res.send(req.body)
}

// update/edit
exports.edit = function (req, res) {

  // req.params.id
  const {
    id
  } = req.params //retira o id

  const foundMember = data.members.find(function (member) {
    return member.id == id
  })
  if (!foundMember) return res.send("Nao encontrado")

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }


  return res.render('members/edit', {
    member
  })
}

//put
exports.put = function (req, res) {
  
  const { id } = req.body //retira o id

  let index = 0

  const foundMember = data.members.find(function (member, foundIndex) {
    if( id == member.id ) {
      index = foundIndex
      return true
    }
  })
  if (!foundMember) return res.send("Nao encontrado")

  const member = {
    ...foundMember,
    ...req.body, //aqui pega os dados atualizados
    birth: Date.parse(req.body.birth), //salva no formato timestamp
    id:Number(req.body.id)
  }

  //atualizar no data.json
  data.members[index] = member

  fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
    if(err) return res.send('Write error: ' + err)

    return res.redirect(`/members/${id}`)
  })
}

// delete
exports.delete = function(req, res) {
  const { id } = req.body //o id

  const filteredMembers = data.members.filter(function(member) {
    return member.id != id
  })

  data.members = filteredMembers
  fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
    if(err) return res.send('Write error: ' + err)

    return res.redirect(`/members`)
  })
}