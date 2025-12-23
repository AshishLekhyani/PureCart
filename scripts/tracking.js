import { calculateCartQuantity } from '../data/cart.js';
import { recalibrateDate } from '../data/deliveryOptions.js';
import { getOrder } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadHeader } from './header/header.js';

loadHeader();

async function loadTracking() {
    await loadProductsFetch();
    calculateCartQuantity('.js-cart-quantity');

    const url = new URL(window.location.href);

    console.log(url.searchParams.get('orderId'));
    console.log(url.searchParams.get('productId'));

    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);

    let orderDetails;
    order.products.forEach((productDetails) => {
        if (productDetails.productId === product.id) {
            orderDetails = productDetails;
        }
    });

    const currentTime = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = recalibrateDate(orderTime, orderDetails.estimatedDeliveryTime)
    const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

    const deliveredMessage = currentTime < deliveryTime ? 'Arriving on' : 'Delivered on'; 

    let trackingPageHTML = '';

    trackingPageHTML +=
        `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveredMessage} ${dayjs(deliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${deliveryProgress < 50 ? 'current-status' : ''
        }">
            Preparing
          </div>
          <div class="progress-label ${(deliveryProgress >= 50 && deliveryProgress < 100) ? 'current-status' : ''
        }">
            Shipped
          </div>
          <div class="progress-label ${deliveryProgress >= 100 ? "current-status" : ''
        }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${deliveryProgress}%"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingPageHTML;
}

loadTracking();