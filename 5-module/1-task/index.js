function hideSelf() {
  hideButton = document.querySelector('.hide-self-button')
  hideButton.addEventListener('click', () => {
    hideButton.setAttribute('hidden','') 
  } )
}
