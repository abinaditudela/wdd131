// Display current year
const yearElement = document.getElementById('year');
yearElement.textContent = new Date().getFullYear();

// Display last modified date
const lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = document.lastModified;

// Wind chill calculation
const temperature = 15; // Celsius
const windSpeed = 10; // km/h

function calculateWindChill(temp, wind) {
    if (temp <= 10 && wind > 4.8) {
        return (
            13.12 +
            0.6215 * temp -
            11.37 * Math.pow(wind, 0.16) +
            0.3965 * temp * Math.pow(wind, 0.16)
        ).toFixed(2);
    } else {
        return 'N/A';
    }
}

const windChill = calculateWindChill(temperature, windSpeed);
document.getElementById('windChill').textContent = windChill;
