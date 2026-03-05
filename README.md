# PureCart 🛒

A lightweight, framework-free e-commerce platform built entirely with pure Vanilla JavaScript. This project focuses on modular architecture, advanced asynchronous data fetching patterns, and robust state management without the overhead of external libraries.

![PureCart Logo](images/purecart-logo.svg)

## 🌟 Key Features

*   **Dynamic Product Catalog:** Asynchronous product fetching (`async/await` & `Fetch API`) from a RESTful backend.
*   **Interactive Shopping Cart:** Real-time cart quantity updates, dynamic pricing calculation, and local storage persistence.
*   **Checkout & Order Summary:** Interactive review process with multiple shipping speed options and dynamic order total recalculation.
*   **Order Tracking:** Visual progress bars calculating shipment status using real-world timestamps and the `dayjs` library.
*   **Modular Architecture:** Clean separation of concerns with dedicated data models (`cart.js`, `products.js`, `orders.js`) driving the UI rendering logic.
*   **Automated Testing:** Integrated Jasmine testing suite for business logic (currency formatting, cart state).

## 🚀 Tech Stack

*   **Frontend Vanilla:** HTML5, CSS3, modern ES6+ JavaScript.
*   **Architecture:** Component-based rendering patterns, strict separation of data and UI (MVC pattern inspired).
*   **External Libraries:** `dayjs` (for date manipulation).
*   **Testing:** Jasmine.

## 📁 Project Structure

```text
PureCart/
├── data/          # Application state & data fetching (cart, products, orders, deliveryOptions)
├── scripts/       # UI rendering logic (purecart, checkout, orders, tracking)
│   └── checkout/  # Component-specific rendering (orderSummary, paymentSummary)
├── styles/        # CSS organized by page and shared utility classes
├── tests/         # Jasmine unit and integration tests
├── images/        # Brand assets, product imagery, and distinct SVGs
└── index.html     # Main storefront entry point
```

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/PureCart.git
    cd PureCart
    ```

2.  **Run Locally:**
    Since this is a vanilla HTML/JS project, you do not need Node.js or `npm install`. 
    You can use the **Live Server** extension in VS Code:
    *   Open the `PureCart` folder in VS Code.
    *   Right-click `index.html` and select **"Open with Live Server"**.

3.  **Run Tests:**
    Open `tests/tests.html` in your browser to execute the Jasmine test suite and verify core functionality.

## 📡 Data Source & API

The product catalog is fetched asynchronously from a dedicated external API provided by [SuperSimpleDev](https://supersimplebackend.dev/).

> **Note:** For offline reference or local development without internet access, a complete replica of the API's product data is preserved locally in the `data/products.json` file.

**Local Data Instantiation:** While the raw JSON data is fetched from the API, it is parsed and instantiated into **Object-Oriented JavaScript Classes** (`Product`, `Clothing`, `Appliance`) before being rendered into the UI. This provides a clean interface for formatting prices and managing product-specific logic.

**Local Cart Logic:** While product data comes from an external API, the **Shopping Cart logic is handled entirely locally**. All cart operations (adding/removing items, calculating quantities, changing delivery speeds) are executed via client-side JavaScript in `cart.js` and persisted using the browser's `localStorage`. This hybrid approach ensures ultra-fast cart interactions without network latency.

## 🧠 Architectural Decisions

*   **Fetch vs XHR:** The project was fully migrated to use the modern `fetch` API wrapping calls in `async/await` for cleaner asynchronous data flow, eliminating legacy `XMLHttpRequest` callbacks.
*   **Data Driven UI:** The interface strictly reacts to changes in the data layer. For example, modifying `cart.js` guarantees the UI updates linearly when re-rendered.
*   **No Frameworks:** Built intentionally without React or Vue to master the fundamentals of DOM manipulation, event delegation, and module bundling natively in the browser.

## 🤝 Acknowledgements

This project was built and expanded upon the foundational concepts taught in the excellent JavaScript courses provided by **[SuperSimpleDev](https://supersimplebackend.dev/)**. 