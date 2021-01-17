//acoes do modal

const modalOverlay = document.querySelector('.modal-overlay')

const modal = document.querySelector('.modal')

const cards = document.querySelectorAll('.card')

for(let card of cards){
  card.addEventListener("click", function(){
    const cardId = card.getAttribute('id')

    modalOverlay.classList.add('modal-ativo')

    modalOverlay.querySelector('iframe').src = `https://blog.rocketseat.com.br/${cardId}/`
  })
}

document.querySelector(".close-modal").addEventListener("click", function(){
	modalOverlay.classList.remove('modal-ativo')
  modalOverlay.querySelector("iframe").src = ``
  modal.classList.remove('maximize')
})

document.querySelector(".maximize-modal").addEventListener("click", function(){
  modal.classList.toggle('maximize')
})