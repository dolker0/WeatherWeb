const apiKey = "bca0c2de9a9638fa34004be2fcfa54b5";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=newyork";

const searchBox = document.querySelector(".input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

const emptySearch = ()=>{
    if(searchBox.value==""){
        alert("Please enter a city name");
    }
}

async function checkWeather(city) {
    try {
        const response = await fetch(`${baseUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src = "images/cloudy.png"
        }else if(data.weather[0].main=="Clear"){
            weatherIcon.src = "images/sun.png"
        }else if(data.weather[0].main=="Rain"){
            weatherIcon.src = "images/rain.png"
        }else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src = "images/rain.png"
        }else if(data.weather[0].main=="Mist"){
            weatherIcon.src = "images/mist.png"
        }
    } catch (error) {
        alert("Error: " + error.message);
    }

}

searchBtn.addEventListener("click", () => {
    if(searchBox.value==""){
        alert("Please enter a city name");
    }else{
        checkWeather(searchBox.value);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        emptySearch();
        checkWeather(searchBox.value);
    }
});