const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    weatherResult.style.display = "block";
    weatherResult.innerHTML = "<p>⏳ Fetching weather data...</p>";

    try {
        // Step 1: Get latitude & longitude
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            weatherResult.innerHTML = "<h3>City not found</h3>";
            return;
        }

        const place = geoData.results[0];
        const latitude = place.latitude;
        const longitude = place.longitude;

        // Step 2: Get weather data
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // Step 3: Show result
        weatherResult.innerHTML = `
            <h2>${place.name}</h2>
            <p><strong>Country:</strong> ${place.country}</p>
            <p>🌡 Temperature: ${weatherData.current.temperature_2m} °C</p>
            <p>🌬 Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
            <p>📍 Latitude: ${latitude}</p>
            <p>📍 Longitude: ${longitude}</p>
        `;

    } catch (error) {
        weatherResult.innerHTML = "<h3>Something went wrong</h3>";
        console.error(error);
    }
}