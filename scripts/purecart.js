import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import { loadHeader } from './header/header.js';

loadHeader();
(async () => {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  renderProductsGrid();
})();

function renderProductsGrid() {
  calculateCartQuantity('.js-cart-quantity');

  let productsHTML = '';


  const url = new URL(location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLocaleLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`;
  });


  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    let addedMessage;
    button.addEventListener('click', () => {
      const { productId } = button.dataset;

      const addToCartMessage = document.querySelector(`.js-added-to-cart-${productId}`);

      addToCartMessage.classList.add('visible-added-to-cart');
      setTimeout(() => {
        if (addedMessage) {
          clearTimeout(addedMessage);
        }
        addedMessage = setTimeout(() => { addToCartMessage.classList.remove('visible-added-to-cart'); }, 2000);
      });

      addToCart(productId);
      calculateCartQuantity('.js-cart-quantity');

    });
  });
}
