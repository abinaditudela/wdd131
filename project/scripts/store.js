// Array of Product Objects
const products = [
    {
        productName: "Organic Rabbit Feed",
        description: "High-quality feed for rabbits.",
        price: 20.00,
        imageUrl: "https://example.com/product1.jpg",
        likes: 0
    },
    {
        productName: "Rabbit Hutch",
        description: "Spacious and sturdy hutch.",
        price: 150.00,
        imageUrl: "https://example.com/product2.jpg",
        likes: 0
    },
    {
        productName: "Bedding Straw",
        description: "Comfortable bedding for rabbits.",
        price: 15.00,
        imageUrl: "https://example.com/product3.jpg",
        likes: 0
    },
    {
        productName: "Water Bottle",
        description: "Durable water bottle for rabbits.",
        price: 10.00,
        imageUrl: "https://example.com/product4.jpg",
        likes: 0
    }
    // Add more products as needed...
];

// Function to generate product cards
function generateProductCards(products) {
    const album = document.querySelector(".album");
    album.innerHTML = ""; // Clear existing content

    products.forEach((product, index) => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.productName;
        img.loading = "lazy";

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = `
            <h3>${product.productName}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
            <div class="likes">
                <button class="like-btn" data-index="${index}">
                    <i class="fa fa-thumbs-up"></i> Like
                </button>
                <span id="likeCount-${index}">Likes: ${product.likes}</span>
            </div>
        `;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        album.appendChild(figure);
    });

    document.querySelectorAll('.like-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.currentTarget.getAttribute('data-index');
            products[index].likes++;
            document.getElementById(`likeCount-${index}`).textContent = `Likes: ${products[index].likes}`;
            saveToLocalStorage(index, 'likes', products[index].likes);
        });
    });
}

// Save to localStorage
function saveToLocalStorage(index, key, value) {
    let storedProducts = JSON.parse(localStorage.getItem("products")) || products;
    storedProducts[index][key] = value;
    localStorage.setItem("products", JSON.stringify(storedProducts));
}

// Load from localStorage
function loadFromLocalStorage() {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
        storedProducts.forEach((product, index) => {
            products[index].likes = product.likes;
        });
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    generateProductCards(products);

    // Update footer year and last modified date
    const lastModified = document.querySelector("#lastModified");
    const currentyear = document.querySelector("#currentyear");

    const today = new Date();
    lastModified.innerHTML = `Last Modified: ${document.lastModified}`;
    currentyear.innerHTML = `&copy; ${today.getFullYear()}`;

    const menuButton = document.querySelector("#menu-button");
    const navMenu = document.querySelector(".menu-nav");

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuButton.classList.toggle('open');
    });
});
