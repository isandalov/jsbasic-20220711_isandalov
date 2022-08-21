import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;   
    this.createDiv()
    this.arrows()
    this.elem.addEventListener('click', this.#onButtonClick)
  }
  
  createDiv() {
    this.elem = createElement(`
    <div class="carousel">
       <div class="carousel__arrow carousel__arrow_right">
         <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </div>
       <div class="carousel__arrow carousel__arrow_left">
         <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
       </div>
    </div> 
    `)

   let carousel = document.createElement('div')
   carousel.className = ('carousel__inner')

   this.slides.forEach(items => {        
     let slideElement = createElement(`
      <div class="carousel__slide" data-id="${items.id}">
        <img src="/assets/images/carousel/${items.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${items.price.toFixed(2)}</span>
            <div class="carousel__title">${items.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
      </div>
     `)
     carousel.append(slideElement)
    //carousel.querySelector('.carousel__button').addEventListener('click', this.#onButtonClick)
   })
 
   this.elem.append(carousel)
   //this.elem.querySelector('.carousel__button').addEventListener('click', this.#onButtonClick)
  }

  arrows() {
  let rightButton = this.elem.querySelector('.carousel__arrow_right')
  let leftButton = this.elem.querySelector('.carousel__arrow_left')
  let carouselInner = this.elem.querySelector('.carousel__inner')
  let offset = 0
 
  if (offset == 0) {
    leftButton.style.display = 'none' 
  }
  else {
    leftButton.style.display = '' 
  }
  
  rightButton.addEventListener('click', () => {   
    let offsetWidthParam = this.elem.querySelector('.carousel__inner').offsetWidth
    let scrollWidthParam = this.elem.querySelector('.carousel__inner').scrollWidth
    offset += 1
    carouselInner.style.transform = `translateX(-${offsetWidthParam * offset}px)`    

    if (offset > 0) {
      leftButton.style.display = ''  
    }
    
    if (offsetWidthParam * (offset + 1) >= scrollWidthParam) {
      rightButton.style.display = 'none'
      return
    }

  })
  
  leftButton.addEventListener('click', () => {   
    let offsetWidthParam = this.elem.querySelector('.carousel__inner').offsetWidth
    let scrollWidthParam = this.elem.querySelector('.carousel__inner').scrollWidth
    offset -= 1 
    carouselInner.style.transform = `translateX(-${offsetWidthParam * offset}px)`
    
    if (offsetWidthParam * offset <= scrollWidthParam) {
      rightButton.style.display = ''
    }
    

    if (offset == 0) {
      leftButton.style.display = 'none'   
      return
    } 
  })
  }


  #onButtonClick = (event) => {
    if (event.target.closest('button'))   {
      let addAction = new CustomEvent("product-add", { 
        detail: event.target.closest('.carousel__slide').dataset.id,
        bubbles: true })
      this.elem.dispatchEvent(addAction)
      alert('button')
    }
  }
}