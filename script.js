// ================= LOGIN =================
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user !== "" && pass !== "") {
        alert("Login successful!");
    } else {
        alert("Please enter username and password");
    }
}

// ================= CART (STORED IN LOCALSTORAGE) =================
let cart = JSON.parse(localStorage.getItem("cart")) || {};

// ---------- ADD TO CART ----------
function addToCart(item, price) {
    if (cart[item]) {
        cart[item].qty++;
        alert(item + " quantity increased");
    } else {
        cart[item] = { price: price, qty: 1 };
        alert(item + " added to cart");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}


// ---------- UPDATE CART UI ----------
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    let total = 0;
    let count = 0;

    // 🛑 If cart section not on this page
    if (!cartContainer || !totalSpan) {
        updateCartCount();
        return;
    }

    cartContainer.innerHTML = "";

    for (let item in cart) {
        let itemTotal = cart[item].price * cart[item].qty;
        total += itemTotal;
        count += cart[item].qty;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item} - ₹${cart[item].price}</span>
                <div class="cart-controls">
                    <button onclick="changeQty('${item}', -1)">−</button>
                    <span>${cart[item].qty}</span>
                    <button onclick="changeQty('${item}', 1)">+</button>
                </div>
            </div>
        `;
    }

    if (Object.keys(cart).length === 0) {
        cartContainer.innerHTML = "<p>No items in cart</p>";
    }

    totalSpan.innerText = total;
    if (cartCount) cartCount.innerText = count;
}

// ---------- CHANGE QUANTITY ----------
function changeQty(item, change) {
    cart[item].qty += change;

    if (cart[item].qty <= 0) {
        delete cart[item];
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// ---------- UPDATE NAVBAR COUNT ONLY ----------
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (!cartCount) return;

    let count = 0;
    for (let item in cart) {
        count += cart[item].qty;
    }

    cartCount.innerText = count;
}

// ---------- LOAD ON PAGE ----------
window.onload = function () {
    updateCart();
};


// ================= CONTACT =================
function submitForm() {
    alert("Thank you for contacting Cozy Cup Café!");
}
