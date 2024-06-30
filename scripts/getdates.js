// select the DOM elements for output
const lastModified = document.querySelector("#lastModified");
const currentyear = document.querySelector("#currentyear");


// use the date object
const today = new Date();

lastModified.innerHTML = `Last Modified <span class="highli">${new Intl.DateTimeFormat(
	"en-US",
	{
		dateStyle: "full"
	}
).format(today)}</span>`;

console.log(today.getFullYear());
console.log(today);

currentyear.innerHTML = `&copy; <span class="highli">${today.getFullYear()}</span>`;