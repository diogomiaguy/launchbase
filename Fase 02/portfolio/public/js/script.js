const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
  card.addEventListener('click', () => {

    const idvideo = card.getAttribute('id')
    // modalOverlay.classList.add('ativo')
    // modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${idvideo}`
    window.location.href = `/video?id=${ idvideo }`
  })
}
// fechar modal
document.querySelector('.fechar-modal').addEventListener('click', () => {
  modalOverlay.classList.remove('ativo')
  modalOverlay.querySelector('iframe').src = ``
})