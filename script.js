let APIKey;

// Get API key from server
async function getConfig() {
  try {
    const response = await fetch("/api/config");
    const config = await response.json();
    APIKey = config.apiKey;
  } catch (error) {
    console.error("Failed to load configuration:", error);
  }
}

// DOM elements
const inputBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const notFound = document.querySelector(".not-found");
const searchContainer = document.querySelector(".search-container");

// Initialize when page loads
document.addEventListener("DOMContentLoaded", async () => {
  await getConfig();
});

searchBtn.addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (city === "") {
    return;
  }

  checkWeather(city);
});

inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = inputBox.value.trim();
    if (city === "") {
      return;
    }
    checkWeather(city);
  }
});

async function checkWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
    );

    if (response.status === 404) {
      document.querySelector(".search-prompt").style.display = "none";
      weatherBox.style.display = "none";
      notFound.style.display = "block";
      return;
    }

    const data = await response.json();

    document.querySelector(".search-prompt").style.display = "none";
    notFound.style.display = "none";
    weatherBox.style.display = "block";

    const image = document.querySelector(".weather-box .weather-icon");
    const temperature = document.querySelector(".weather-box .temperature");
    const description = document.querySelector(".weather-box .description");
    const location = document.querySelector(".location span");
    const humidity = document.querySelector(
      ".weather-details .humidity .text span"
    );
    const wind = document.querySelector(".weather-details .wind .text span");

    switch (data.weather[0].main) {
      case "Clear":
        image.src = "src/weather/clear.svg";
        break;
      case "Rain":
        image.src = "src/weather/rain.svg";
        break;
      case "Snow":
        image.src = "src/weather/snow.svg";
        break;
      case "Clouds":
        image.src = "src/weather/clouds.svg";
        break;
      case "Haze":
      case "Mist":
        image.src = "src/weather/atmosphere.svg";
        break;
      default:
        image.src = "src/weather/clear.svg";
    }

    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    description.innerHTML = data.weather[0].description;
    location.innerHTML = `${data.name}, ${data.sys.country}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed} km/h`;
  } catch (error) {
    console.error("Error caught:", error);
    document.querySelector(".search-prompt").style.display = "none";
    notFound.style.display = "block";
    weatherBox.style.display = "none";
  }

  inputBox.value = "";
}

/*

1. Start with DOM Selection

document.querySelector() for single elements
document.querySelectorAll() for multiple elements

document.querySelector(".search-box input");
document.querySelector(".search-box button");
document.querySelector(".weather-box");
document.querySelector(".not-found");
document.querySelector(".search-container");


2. Event Handling

addEventListener()

addEventListener("click", () => {
  const city = inputBox.value.trim();
  if (city === "") {
    return;
  }

  checkWeather(city);
});

addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = inputBox.value.trim();
    if (city === "") {
      return;
    }
    checkWeather(city);
  }
});

3. Basic DOM Manipulation

change text content with .textContent or .innerHTML
 showing/hiding elements by adding/removing the .active class

4. API Basics

async function
await fetch() function for making HTTP requests
Look into weather APIs async/await or .then() for handling API responses







.search-container - The initial search area (visible by default)
.weather-box - Main weather display (hidden by default)
.not-found - Error message (hidden by default)
.search-city - Fallback message (hidden by default)
Key Elements to Target:
Search input: .search-box input
Search button: .search-box button
Weather icon: .weather-box .weather-icon
Temperature: .weather-box .temperature
Description: .weather-box .description
Location: .weather-box .location span
Humidity: .weather-details .humidity .text span
Wind speed: .weather-details .wind .text span
--
Get input value from search box
Hide search container: remove .active or hide entirely
Show weather data: add .active to .weather-box
Or show error: add .active to .not-found
The CSS Classes You'll Toggle:
Add .active to show weather sections
Remove .active to hide sections
Default state: only search container visible


*/
