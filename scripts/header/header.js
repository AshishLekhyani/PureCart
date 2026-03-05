export function loadHeader() {
    let headerHTML = '';
    
    headerHTML =
    `
    <div class="purecart-header-left-section">
    <a href="index.html" class="header-link">
    <img class="purecart-logo"
    src="images/purecart-logo-white.svg">
    <img class="purecart-mobile-logo"
    src="images/purecart-mobile-logo-white.svg">
    </a>
    </div>
    
    <div class="purecart-header-middle-section">
    <input class="search-bar js-search-bar" type="text" placeholder="Search">
    
    <button class="search-button js-search-button">
    <img class="search-icon" src="images/icons/search-icon.png">
    </button>
    </div>
    
    <div class="purecart-header-right-section">
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

    document.querySelector('.js-purecart-header').innerHTML = headerHTML;

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
    const url = new URL('index.html', window.location.href);

    if (value) {
        url.searchParams.set('search', value); // replaces if exists, adds if not
        window.location.href = url.toString(); // .toString() converts URL object to string. 
    }
}

