const inputBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const notFound = document.querySelector(".not-found");
const searchContainer = document.querySelector(".search-container");

const APIKey = config.apiKey;

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

function checkWeather(city) {
  console.log("Searching for:", city);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
  )
    .then((response) => {
      console.log("Response status:", response.status);

      if (response.status === 404) {
        console.log("City not found");
        // Hide search prompt and weather box, show error
        document.querySelector(".search-prompt").style.display = "none";
        weatherBox.style.display = "none";
        notFound.style.display = "block";
        return;
      }
      return response.json();
    })
    .then((data) => {
      if (!data) return;

      console.log("Weather data received:", data);

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
          image.src = "src/weather/mist.svg";
          break;
        default:
          image.src = "src/weather/clear.svg";
      }

      temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
      description.innerHTML = `${data.weather[0].description}`;
      location.innerHTML = `${data.name}, ${data.sys.country}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} km/h`;
    })
    .catch((error) => {
      console.log("Error caught:", error);
      document.querySelector(".search-prompt").style.display = "none";
      notFound.style.display = "block";
      weatherBox.style.display = "none";
    });
  inputBox.value = "";
}
