/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows = [];
  elem = document.createElement('table')


  constructor(rows) {
    this.#rows = rows
    this.#insertHeader()
    this.#insertTemplate()
  }

  #template() { 
     return `
       <tbody>
       ${this.#rows.map( item => `<tr><td>${item.name}</td>
       <td>${item.age}</td>
       <td>${item.salary}</td>
       <td>${item.city}</td>
       <td><button data-action="remove">X</button></td></tr>`  ).join('\n')  }
       </tbody>
     `
  }
  
  #insertHeader() {
    this.elem.innerHTML += `<thead>
    <tr>
    <th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>
    </tr>
    </thead>` 
  }

  #insertTemplate() {
    this.elem.innerHTML += this.#template()
    this.elem.addEventListener('click', this.#onXButtonClick)
    return this.elem
  } 

  #onXButtonClick = (event) => {
    if (event.target.dataset.action !== 'remove') {
      return
    }
    event.target.closest('tr').remove()
    }

  }




