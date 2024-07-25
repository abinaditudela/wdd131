document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu');
    const navigation = document.querySelector('.navigation');

    menuButton.addEventListener('click', function () {
        navigation.classList.toggle('visible');
    });
});
// Select the DOM elements for output
const lastModified = document.querySelector("#lastModified");
const currentyear = document.querySelector("#current-year");

// Use the date object
const today = new Date();

lastModified.innerHTML = `Last Modified <span class="highli">${document.lastModified}</span>`;
currentyear.innerHTML = `&copy; <span class="highli">${today.getFullYear()}</span>`;

console.log(today.getFullYear());
console.log(today);
console.log(document.lastModified);