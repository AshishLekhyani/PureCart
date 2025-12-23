export function loadHeader() {
    let headerHTML = '';
    
    headerHTML =
    `
    <div class="amazon-header-left-section">
    <a href="amazon.html" class="header-link">
    <img class="amazon-logo"
    src="images/amazon-logo-white.png">
    <img class="amazon-mobile-logo"
    src="images/amazon-mobile-logo-white.png">
    </a>
    </div>
    
    <div class="amazon-header-middle-section">
    <input class="search-bar js-search-bar" type="text" placeholder="Search">
    
    <button class="search-button js-search-button">
    <img class="search-icon" src="images/icons/search-icon.png">
    </button>
    </div>
    
    <div class="amazon-header-right-section">
    <a class="orders-link header-link" href="orders.html">
    <span class="returns-text">Returns</span>
    <span class="orders-text">& Orders</span>
    </a>
    
    <a class="cart-link header-link" href="checkout.html">
    <img class="cart-icon" src="images/icons/cart-icon.png">
    <div class="cart-quantity js-cart-quantity"></div>
    <div class="cart-text">Cart</div>
    </a>
    </div>
    `;

    document.querySelector('.js-amazon-header').innerHTML = headerHTML;

    document.querySelector('.js-search-button').addEventListener('click', () => {
        search();
    });
    
    document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            search();
        }
    });
}

function search() {
    const value = document.querySelector('.js-search-bar').value.trim();
    const url = new URL('amazon.html', window.location.href);

    if (value) {
        url.searchParams.set('search', value); // replaces if exists, adds if not
        window.location.href = url.toString(); // .toString() converts URL object to string. 
    }
}