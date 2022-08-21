export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.value = value
    this.render()
    this.allSpans = this.elem.querySelectorAll('.slider__steps span')
    //this.elem.querySelector('.slider').addEventListener('click', (event) => this.sliderClick(event))
    this.elem.addEventListener('click', (event) => this.sliderClick(event))
  }

  render() {
    this.elem = document.createElement('div')
    this.elem.classList.add('slider')
    this.elem.innerHTML = 
    `
    <!--Корневой элемент слайдера-->
    <div class="slider">
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>

    <!--Полоска слайдера-->
    <div class="slider__progress"></div>

    <!-- Шаги слайдера (вертикальные чёрточки) -->
    <div class="slider__steps">
      <!-- текущий выбранный шаг выделен этим классом -->
    </div>
    </div>
    `
  
    let htmlSpan = ''
    for (let i = 0; i < this.steps; i += 1){
      htmlSpan += `<span></span>`
    }

    this.elem.querySelector('.slider__steps').innerHTML = htmlSpan
    this.elem.querySelector('.slider__steps span').classList.add("slider__step-active")
    //this.elem.querySelector('.slider').addEventListener('click', (event) => this.sliderClick(event))
  }

  sliderClick = (event) => {
    if (event.target.closest('.slider')) {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let leftPersents = value / segments * 100;
      this.value = value
  
      this.elem.querySelector('.slider__value').textContent = this.value
      if (this.elem.querySelector('.slider__step-active')) {
        this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active')
      }
      this.allSpans[value].classList.add('slider__step-active')
      this.elem.querySelector('.slider__thumb').style.left = `${leftPersents}%` 
      this.elem.querySelector('.slider__progress').style.width = `${leftPersents}%` 
   
      let slChange = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(slChange)
    }

  }
}
