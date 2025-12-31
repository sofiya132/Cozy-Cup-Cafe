// ================= LOGIN =================
function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (email === "" || pass === "") {
        alert("Please enter email and password");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email");
        return;
    }

    if (pass.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    alert("Login successful!");
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
document.addEventListener("DOMContentLoaded", () => {
    updateCart();
});



function confirmOrder() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = document.getElementById("cart-total").innerText;

    let confirmMsg = confirm(
        "Are you sure you want to place the order?\nTotal Amount: ₹" + total
    );

    if (confirmMsg) {
        alert("✅ Order Confirmed!\nThank you for shopping");

        // 🔥 CLEAR CART PROPERLY
        cart = {};
        localStorage.removeItem("cart");

        updateCart();
    }
}


//contact 
document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fbName").value;
    const email = document.getElementById("fbEmail").value;
    const message = document.getElementById("fbMessage").value;

    const entry =
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n------------------\n`;

    // Save to localStorage
    let stored = localStorage.getItem("feedbackData") || "";
    stored += entry;
    localStorage.setItem("feedbackData", stored);

    // Create downloadable file
    const blob = new Blob([stored], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback.txt";
    link.click();

    // Show success message
    document.getElementById("successMsg").style.display = "block";

    // RESET FORM ✅
    document.getElementById("feedbackForm").reset();

    // Hide message after 3 seconds
    setTimeout(() => {
        document.getElementById("successMsg").style.display = "none";
    }, 3000);
});


