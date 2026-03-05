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
  // Number(quantitySelector?.value ?? 1): if quantitySelector exists, use .value.
  // If that is null/undefined, fall back to 1.
  const quantity = Number(quantitySelector?.value ?? 1);

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
  let optionId;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      optionId = deliveryOptionId;
    }
  });

  if (!matchingItem || !optionId) {
    return;
  }
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}


export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}

export function resetCart() {
  cart = [];
  saveToStorage();
}