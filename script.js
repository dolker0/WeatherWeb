const apiKey = "bca0c2de9a9638fa34004be2fcfa54b5";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

const emptySearch = () => {
  if (searchBox.value === "") {
    alert("Please enter a city name");
    return true;
  }
  return false;
};

async function checkWeather(city) {
  try {
    const response = await fetch(`${baseUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`City not found: ${response.statusText}`);
    }
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".desc").innerHTML = data.weather[0].main;
    
    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/cloudy.png";
        break;
      case "Clear":
        weatherIcon.src = "images/sun.png";
        break;
      case "Rain":
      case "Drizzle":
        weatherIcon.src = "images/rain.png";
        break;
      case "Mist":
      case "Haze":
        weatherIcon.src = "images/mist.png";
        break;
      default:
        weatherIcon.src = "images/sun.png"; 
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

const handleSearch = () => {
  if (!emptySearch()) {
    checkWeather(searchBox.value);
  }
};

searchBtn.addEventListener("click", handleSearch);
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

