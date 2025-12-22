import { calculateCartQuantity } from '../data/cart.js';
import { getOrder } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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
    const deliveryTime = dayjs(orderDetails.estimatedDeliveryTime);
    const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

    let trackingPageHTML = '';

    trackingPageHTML +=
        `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(orderDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
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