import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.showMenu()
  }

  showMenu() {
    let htmlCategories = ''
    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `)
   
    this.categories.forEach(items => {htmlCategories += `<a href="#" class="ribbon__item" data-id="${items.id}">${items.name}</a>` })
    this.elem.querySelector('.ribbon__inner').innerHTML = htmlCategories
    

    this.elem.querySelector('.ribbon__arrow_right').addEventListener('click', () => this.rightArrowButton())
    this.elem.querySelector('.ribbon__arrow_left').addEventListener('click', () => this.leftArrowButton())
    this.elem.querySelector('.ribbon__inner').addEventListener('scroll', () => this.updateArrow())
    this.elem.addEventListener('click', (event) => this.onClickMenuButton(event))
  }

  rightArrowButton() {
    this.elem.querySelector('.ribbon__inner').scrollBy(350, 0)
  }
  
  leftArrowButton() {
    this.elem.querySelector('.ribbon__inner').scrollBy(-350, 0)
  }

  updateArrow() {
    let rightArrow = this.elem.querySelector('.ribbon__arrow_right')
    let leftArrow = this.elem.querySelector('.ribbon__arrow_left')
    let ribbonInner = this.elem.querySelector('.ribbon__inner')
    let scrollLeft = ribbonInner.scrollLeft
    let scrollWidth = ribbonInner.scrollWidth
    let clientWidth = ribbonInner.clientWidth


    if (scrollLeft == 0) {
      leftArrow.classList.remove("ribbon__arrow_visible")
    } else {
      leftArrow.classList.add("ribbon__arrow_visible")
    }

    if ((scrollWidth - scrollLeft - clientWidth) < 1 ) {
      rightArrow.classList.remove("ribbon__arrow_visible")
    } else {
     rightArrow.classList.add("ribbon__arrow_visible")
    }
  }

  onClickMenuButton = (event) => {
    if (event.target.closest('.ribbon__item')){
      event.preventDefault()
      //alert(event.target.closest('.ribbon__item').dataset.id)
      if (this.elem.querySelector(".ribbon__item_active"))  {
        this.elem.querySelector(".ribbon__item_active").classList.remove('ribbon__item_active')
      }
      event.target.closest('.ribbon__item').classList.add('ribbon__item_active')
      console.dir(this.elem.querySelector(".ribbon__item_active"))
      let addAction = new CustomEvent("ribbon-select", {
        detail: event.target.closest('.ribbon__item').dataset.id,
        bubbles: true})
      this.elem.dispatchEvent(addAction)
    }

  }

}
