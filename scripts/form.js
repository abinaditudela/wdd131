const products = [
    {
        id: 'fc-1888',
        name: "flux capacitor",
        avg_rating: 4.5
    },
    {
        id: 'fc-2050',
        name: "power laces",
        avg_rating: 4.7
    },
    {
        id: 'fs-1987',
        name: "time circuits",
        avg_rating: 3.5
    },
    {
        id: 'ac-2000',
        name: "low voltage reactor",
        avg_rating: 3.9
    },
    {
        id: 'jj-1969',
        name: "warp equalizer",
        avg_rating: 5.0
    }
];

// Populate the product dropdown list
window.addEventListener('DOMContentLoaded', (event) => {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productList.appendChild(option);
    });
});

// Increment review count and display on review.html
window.addEventListener('DOMContentLoaded', (event) => {
    if (window.location.pathname.endsWith('review.html')) {
        let reviewCount = localStorage.getItem('reviewCount');
        if (!reviewCount) {
            reviewCount = 0;
        }
        reviewCount++;
        localStorage.setItem('reviewCount', reviewCount);
        document.getElementById('review-count').textContent = reviewCount;
    }
});


