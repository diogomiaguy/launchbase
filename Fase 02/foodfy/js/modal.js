const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for( let card of cards){
  card.addEventListener("click", () => {    

    modalOverlay.classList.add('modal-ativo')

    modalOverlay.querySelector('img').src = card.querySelector('img').src
    modalOverlay.querySelector('.modal-titulo-receita').innerHTML = card.querySelector('.titulo-receita').innerHTML
    modalOverlay.querySelector('.modal-nome-autor').innerHTML = card.querySelector('.nome-autor').innerHTML

  })
}

document.querySelector('.fechar-modal').addEventListener("click", () => {
  modalOverlay.classList.remove('modal-ativo')
})