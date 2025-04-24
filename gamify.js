function navigateTo(page) {
    window.location.assign(page);
}

window.addEventListener("DOMContentLoaded", () => {
    const username = sessionStorage.getItem("username");
    const authLink = document.getElementById("auth-link");

    if (username && authLink) {
        authLink.innerHTML = `<a href="profile.html">${username}</a>`;
    }
});

document.addEventListener("click", function(e){
    const dropdown = e.target.closest(".prod");

    if (dropdown) {
        dropdown.classList.toggle('active');
    } else {
        document.querySelectorAll('.prod.active').forEach(d => d.classList.remove('active'));
    }
});

// Cart elements
const cartIcon = document.querySelector(".cart-toggle-btn");
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#cart-close');
const shopSection = document.querySelector(".shop");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
    shopSection.classList.add("shifted");
});

cartClose.addEventListener("click", () => {
    cart.classList.remove("active");
    shopSection.classList.remove("shifted");
});

// Add to Cart functionality
const addCart = document.querySelectorAll(".add");
const cartContent = document.querySelector(".cart-content");

addCart.forEach(function(button){
    button.addEventListener("click", function(event){
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const loadCart = function() {
    const cartData = JSON.parse(sessionStorage.getItem("cartData")) || [];

    cartData.forEach(function(item){
        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");

        cartBox.innerHTML = `
            <img src="${item.img}" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${item.title}</h2>
                <span class="cart-price">${item.price}</span>
                <div class="cart-quantity">
                    <button id="decrement">-</button>
                    <span class="number">${item.quantity}</span>
                    <button id="increment">+</button> 
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        `;

        cartContent.appendChild(cartBox);

        attachCartEvents(cartBox);
    });

    updatePrice();
};

const addToCart = function(productBox){
    const productImg = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItem = cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItem){
        if(item.textContent === productTitle){
            const quantityEl = item.closest(".cart-box").querySelector(".number");
            let currentQty = parseInt(quantityEl.textContent);
            quantityEl.textContent = currentQty + 1;
            updatePrice();
            saveCart();
            return; 
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${productImg}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button> 
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    attachCartEvents(cartBox);
    updatePrice();
    saveCart();
};

const attachCartEvents = function(cartBox){
    cartBox.querySelector(".cart-remove").addEventListener("click", function (){
        cartBox.remove();
        updatePrice();
        saveCart();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", function(event){
        const numEle = cartBox.querySelector(".number");
        const numdec = cartBox.querySelector("#decrement");
        const numinc = cartBox.querySelector("#increment");

        let quantity = parseInt(numEle.textContent);

        numdec.style.fontWeight = "normal";
        numinc.style.fontWeight = "normal";

        if(event.target.id === "decrement" && quantity > 1){
            quantity--;
            numdec.style.fontWeight = "bold";
        }
        else if(event.target.id === "increment"){
            quantity++;
            numinc.style.fontWeight = "bold";
        }
        else if(event.target.id === "decrement" && quantity === 1){
            cartBox.remove();
        }

        numEle.textContent = quantity;
        updatePrice();
        saveCart();
    });
};

const saveCart = function() {
    const cartData = [];
    const cartBoxes = document.querySelectorAll(".cart-box");

    cartBoxes.forEach(function(cartBox){
        const productImg = cartBox.querySelector(".cart-img").src;
        const productTitle = cartBox.querySelector(".cart-product-title").textContent;
        const productPrice = cartBox.querySelector(".cart-price").textContent;
        const quantity = parseInt(cartBox.querySelector(".number").textContent);

        cartData.push({
            img: productImg,
            title: productTitle,
            price: productPrice,
            quantity: quantity
        });
    });

    sessionStorage.setItem("cartData", JSON.stringify(cartData));
};

const updatePrice = function(){
    const totalele = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box");

    let total = 0;
    cartBoxes.forEach(function(cartBox){
        const priceEle = cartBox.querySelector(".cart-price");
        const quantityEle = cartBox.querySelector(".number");

        const price = parseFloat(priceEle.textContent.replace(/[^0-9.-]+/g, ""));
        const quantity = parseInt(quantityEle.textContent);

        total += price * quantity;
    });

    totalele.textContent = `Rs ${total.toFixed(2)}`;
};

loadCart();


document.addEventListener("DOMContentLoaded", () => {
    const buyNowBtn = document.querySelector(".btn-buy");
    const buyer = document.querySelector(".buyer");
    const cancelBtn = document.querySelector(".cancel");

    const completeBtn = document.querySelector(".complete");
  
    if (buyNowBtn && buyer && cancelBtn) {
        buyNowBtn.addEventListener("click", () => {
            buyer.style.display = "flex";
        });

        cancelBtn.addEventListener("click", () => {
            buyer.style.display = "none";
        });

        completeBtn.addEventListener("click", () =>{
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const address = document.getElementById("address").value.trim();

            if(!phone || !name || !address){
                alert("Please complete your information");
                return;
            }

            alert("Order has been placed successfully");
            buyer.display.style = 'none';
        });
    }
});