// store.js
const products = [
    {
        id: 1,
        productName: "Organic Rabbit Feed",
        description: "High-quality feeding for rabbits.",
        price: 20.00,
        imageUrl: "images/pellet.jpeg",
        likes: 0
    },
    {
        id: 2,
        productName: "Rabbit Hutch",
        description: "Spacious and sturdy hutch.",
        price: 150.00,
        imageUrl: "images/product2.jpg",
        likes: 0
    },
    {
        id: 3,
        productName: "Bedding Straw",
        description: "Comfortable straw bedding for rabbits.",
        price: 15.00,
        imageUrl: "images/product3.jpeg",
        likes: 0
    },
    {
        id: 4,
        productName: "Water Bottle",
        description: "Durable water bottle for rabbits.",
        price: 10.00,
        imageUrl: "images/product4.jpeg",
        likes: 0
    }
];

let cart = [];

function generateProductCards(products) {
    const album = document.querySelector(".album");
    album.innerHTML = "";

    products.forEach((product) => {
        const figure = document.createElement("figure");
        figure.classList.add("product-card");

        figure.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.productName}" loading="lazy">
            <figcaption>
                <h3>${product.productName}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="like-btn" data-id="${product.id}">
                        <i class="fa fa-thumbs-up"></i> Like (<span class="like-count">${product.likes}</span>)
                    </button>
                    <button class="buy-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </figcaption>
        `;

        album.appendChild(figure);
    });

    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', handleLike);
    });

    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function handleLike(event) {
    const productId = parseInt(event.currentTarget.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    product.likes++;
    event.currentTarget.querySelector('.like-count').textContent = product.likes;
    saveToLocalStorage();
}

function addToCart(event) {
    const productId = parseInt(event.currentTarget.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    saveToLocalStorage();
}

function updateCart() {
    const cartList = document.querySelector("#cart-list");
    cartList.innerHTML = "";
    
    let total = 0;
    
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.productName} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });
    
    document.querySelector("#cart-total").textContent = total.toFixed(2);
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(event) {
    const productId = parseInt(event.currentTarget.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadFromLocalStorage() {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    
    if (storedProducts) {
        products.forEach((product, index) => {
            product.likes = storedProducts[index].likes;
        });
    }
    
    if (storedCart) {
        cart = storedCart;
    }
}

function sendOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let message = "Hello, I'd like to place an order for:\n\n";
    cart.forEach(item => {
        message += `${item.quantity}x ${item.productName}\n`;
    });
    message += `\nTotal: $${document.querySelector("#cart-total").textContent}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/79352506?text=${encodedMessage}`, '_blank');
}

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    generateProductCards(products);
    updateCart();

    document.querySelector("#send-order").addEventListener('click', sendOrder);
});
