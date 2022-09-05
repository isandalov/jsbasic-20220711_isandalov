import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render()
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
    </div>
    </div>
    `)

    for (let key of ProductCard) {
      this.elem.queueSelector(".products-grid__inner").append(key)
    }
  }


}
