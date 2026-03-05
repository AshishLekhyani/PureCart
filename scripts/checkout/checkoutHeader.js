export function renderCheckoutHeader() {
    const checkoutHeaderHTML = 
    `
        <div class="header-content">
            <div class="checkout-header-left-section">
                <a href="index.html">
                    <img class="purecart-logo" src="images/purecart-logo.svg">
                        <img class="purecart-mobile-logo" src="images/purecart-mobile-logo.svg">
                        </a>
                    </div>

                    <div class="checkout-header-middle-section">
                        Checkout (<a class="return-to-home-link js-checkout-items"
                            href="index.html"></a>)
                    </div>

                    <div class="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png">
                    </div>
            </div>
    `;

    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}

