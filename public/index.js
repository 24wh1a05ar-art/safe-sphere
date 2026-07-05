const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchBtn.addEventListener("click", async function () {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    const response = await fetch(geoUrl);
    const data = await response.json();

    if (!data.results) {
    weatherResult.style.display = "block";
    weatherResult.innerHTML = "<h3>City not found</h3>";
    return;
}

const place = data.results[0];

const latitude = place.latitude;
const longitude = place.longitude;

const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;

const weatherResponse = await fetch(weatherUrl);
const weatherData = await weatherResponse.json();

weatherResult.style.display = "block";

weatherResult.innerHTML = `
    <h2>${place.name}</h2>

    <p><strong>Country:</strong> ${place.country}</p>

    <p>🌡 Temperature: ${weatherData.current.temperature_2m} °C</p>

    <p>🌬 Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>

    <p>📍 Latitude: ${latitude}</p>

    <p>📍 Longitude: ${longitude}</p>
`;

});