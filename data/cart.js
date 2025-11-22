import { deliveryOptions } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector?.value ?? 1); 
  
  //Number(quantitySelector.value); 

  // Number(quantitySelector?.value ?? 1); is saying if quantitySelector exist use .value and if that is null or undefined give undefined and if it's undefined use the fallback value

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
      quantity,
      deliveryOptionId: '1'
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

  cart.forEach((cartItem) => {
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

export function updateCart(productId, newQuantity) {

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  let optionId

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  deliveryOptions.forEach((option) =>{
    if(option.id === deliveryOptionId) {
      optionId = deliveryOptionId;
    }
  });  

  if(!matchingItem || !optionId) {
    return;
  }
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://supersimplebackend.dev/cart');

  xhr.addEventListener('load', () => {    
    console.log(xhr.response);
    //console.log('load products');
    fun();
  });

  xhr.send();
}