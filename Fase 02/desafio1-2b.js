// Programador - Vetores e objetos
const dev =  {
  nome: 'Diogo',
  idade: 34,
  tecnologias: [
    {nome: 'HTML5', especialidade: 'Web/Mobile'},
    {nome: "C++", especialidade: "Desktop"},
    {nome: 'CSS3', especialidade: 'Web/Mobile'},
      {nome: 'JavaScript', especialidade: 'Web/Mobile'},
  ]
}

console.log(`O usuário ${dev.nome} tem ${dev.idade} anos e usa a tecnologia ${dev.tecnologias[1].nome} com especialidade em ${dev.tecnologias[1].especialidade}.`)