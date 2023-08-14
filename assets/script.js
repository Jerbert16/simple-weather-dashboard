const userInputEl = document.querySelector("#userInput");
const searchBtnEl = document.querySelector("#searchBtn");
const currentWeatherEl = document.querySelector("#currentWthr");
const currentDay = dayjs().format("dddd, MMM D, YYYY");
const apiKey = "e741dcb38a3d668e1bd5bc73c1c15c13";
const btnEls = document.querySelector("#formEl");
const theDate = document.querySelector("#date");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherDesc = document.querySelector("#weatherDesc");
const currentTemp = document.querySelector("#temp");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
let gpsUrl = "";
let weatherUrl = "";
let userEntry = "";

const addCityBtn = () => {
  userEntry = userInputEl.value;
  const cityBtn = document.createElement("button");
  cityBtn.innerText = userEntry;
  btnEls.append(cityBtn);
};

const getGpsQuery = () => {
  const gpsQueryString =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    userEntry +
    "&limit=1&appid=" +
    apiKey;
  return (gpsUrl = gpsQueryString);
};

const getWeatherUrl = (url) => {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let index = 0; index < data.length; index++) {
        lat = data[index].lat;
        lon = data[index].lon;

        const currentWeatherUrl =
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          apiKey +
          "&units=imperial";
        getWeatherData(currentWeatherUrl);
      }
    });
};

const getWeatherData = (url) => {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherData) {
      theDate.textContent = userEntry + ": " + currentDay;
      weatherIcon.src =
        "http://openweathermap.org/img/w/" +
        weatherData.weather[0].icon +
        ".png";
      weatherDesc.textContent =
        "Conditions: " + weatherData.weather[0].description;
      currentTemp.textContent = "Temp: " + weatherData.main.temp + "°F";
      wind.textContent = "Wind: " + weatherData.wind.speed + " MPH";
      humidity.textContent = "Humidity: " + weatherData.main.humidity + "%";
    });
};

function renderCurrentWeather(event) {
  event.preventDefault();
  addCityBtn();
  getGpsQuery();
  getWeatherUrl(gpsUrl);
};

searchBtnEl.addEventListener("click", renderCurrentWeather);
