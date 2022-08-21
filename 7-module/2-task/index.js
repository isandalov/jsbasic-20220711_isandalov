import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render()
  }
  

  render() {
    this.elem = createElement(`
    <div class="container">
    <!--Корневой элемент Modal-->
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button> 
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
  
    </div>
  </div>
    `)

  }

  open() {
     document.body.append(this.elem)
     document.body.classList.add("is-modal-open")
     this.elem.querySelector('.modal__close').addEventListener('click', () => this.close())
     document.addEventListener('keydown', (event) => this.closeOnEcs(event))
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title
  }

  setBody(modalBody) {
    this.elem.querySelector('.modal__body').innerHTML = ""
    this.elem.querySelector('.modal__body').append(modalBody)
  }

  close() {
    document.body.classList.remove("is-modal-open")
    this.elem.remove()
    document.removeEventListener('keydown', () => this.closeOnEcs())
  }

  closeOnEcs = (event) => {
    if (event.code == 'Escape') {
      this.close()
    }
  }

}
