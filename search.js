// OpenWeatherMap API Key
let apiKey = "25b7017edbb15ab67854b9175f257fd1";

// Input field for search
let searchInput = document.querySelector('.searchinput');

// Function to search and display weather details
async function search(city) {
    try {
        // Fetch weather data for the specified city
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        // Show the result box
        const box = document.querySelector(".return");
        box.style.display = "block";

        // Hide error and normal messages
        const message = document.querySelector(".message");
        message.style.display = "none";

        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "none";

        // Update weather details in the UI
        document.querySelector(".city-name").textContent = data.name;
        document.querySelector(".weather-temp").textContent = `${Math.floor(data.main.temp)}°`;
        document.querySelector(".wind").textContent = `${Math.floor(data.wind.speed)} m/s`;
        document.querySelector(".pressure").textContent = `${Math.floor(data.main.pressure)} hPa`;
        document.querySelector(".humidity").textContent = `${Math.floor(data.main.humidity)}%`;
        document.querySelector(".sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        document.querySelector(".sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        // Set weather image based on condition
        const weatherImg = document.querySelector(".weather-img");
        switch (data.weather[0].main.toLowerCase()) {
            case "rain":
                weatherImg.src = "img/rain.png";
                break;
            case "clear":
                weatherImg.src = "img/sun.png";
                break;
            case "snow":
                weatherImg.src = "img/snow.png";
                break;
            case "clouds":
            case "smoke":
                weatherImg.src = "img/cloud.png";
                break;
            case "mist":
            case "fog":
                weatherImg.src = "img/mist.png";
                break;
            case "haze":
                weatherImg.src = "img/haze.png";
                break;
            default:
                weatherImg.src = "img/default.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);

        // Hide the result box
        const box = document.querySelector(".return");
        box.style.display = "none";

        // Display error message
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "block";

        // Hide normal message
        const message = document.querySelector(".message");
        message.style.display = "none";
    }
}

// Event listener for Enter key in the search input
searchInput.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        const city = searchInput.value.trim();
        if (city) {
            search(city);
            console.log("Search initiated for:", city);
        }
    }
});
