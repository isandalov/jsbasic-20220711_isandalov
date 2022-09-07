import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {}
    this.render()
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
    <div class="products-grid__inner">
    </div>
    </div>
    `)

    let gridInner = this.elem.querySelector(".products-grid__inner")  
    this.products.forEach(product => {
      let productCard = new ProductCard(product)
      gridInner.append(productCard.elem)
    })
  }

    updateFilter(filters) {
      let filtered = this.products
      Object.assign(this.filters, filters)

        filtered = filtered
        .filter(item => (item.nuts != true || !this.filters.noNuts))
        .filter(item => item.vegeterian == true || !this.filters.vegeterianOnly)
        .filter(item => item.spiciness <= this.filters.maxSpiciness || this.filters.maxSpiciness === undefined)
        .filter(item => item.category == this.filters.category || !this.filters.category)

      let gridInner = this.elem.querySelector(".products-grid__inner")
      gridInner.innerHTML = ''
      filtered.forEach(product => {
        let productCard = new ProductCard(product)
        gridInner.append(productCard.elem)
      })
    }

}