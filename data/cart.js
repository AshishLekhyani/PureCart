export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  else {
    cart.push({
      productId,
      quantity
    });
  }

  saveToStorage();
}

export function calculateCartQuantity(className) {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector(className).innerHTML = cartQuantity;
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach( (cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}

// OR export function removeFromCart(productId) {
//              let index;

//              cart.forEach( (cartItem, i) => {
//                  if(cartItem.productId === productId) {
//                      index = i;
//                  }
//              });

//              cart.splice(index, 1);
//              }