// ## User Story
// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria
// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```

//Start with HTML structure
// Make it look good with CSS
// Connect API to get data w/JSON
// Get input value
// Display data in various fields
// Save former inputs as buttons > append > commit to local storage > make cickable w/event listener & event target
const userInputEl = document.querySelector("#userInput");
const searchBtnEl = document.querySelector("#searchBtn");
const currentWeatherEl = document.querySelector("#currentWthr");
let btnEls = document.querySelector("#formEl");

const apiKey = "e741dcb38a3d668e1bd5bc73c1c15c13";
const gpsAPI =
  "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

function getGpsCoord(event) {
  let userInput = userInputEl.value;
  event.preventDefault();

  let cityBtn = document.createElement("button");
  cityBtn.innerText = userInput;
  let addCtyBtn = btnEls.append(cityBtn);



  let gpsQueryString =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    userInput +
    "&limit=1&appid=" +
    apiKey;

  fetch(gpsQueryString)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let index = 0; index < data.length; index++) {
        let currentWeatherUrl =
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          data[index].lat +
          "&lon=" +
          data[index].lon +
          "&appid=" +
          apiKey +
          "&units=imperial";

        fetch(currentWeatherUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (weatherData) {
            // let dateEl = document.createElement("h3");
            // dateEl.setAttribute("id", "date");
            // let theDate = document.querySelector("#date");

            let tempEl = document.createElement("h4");
            tempEl.setAttribute("id", "temp");
            currentWeatherEl.appendChild(tempEl);
            let currentTemp = document.querySelector("#temp");

            currentTemp.textContent = "Temp: " + weatherData.main.temp + "°F";

            let windEl = document.createElement("h4");
            windEl.setAttribute("id", "wind");
            currentWeatherEl.appendChild(windEl);
            let wind = document.querySelector("#wind");

            wind.textContent = "Wind: " + weatherData.wind.speed + "MPH";

            let humidityEl = document.createElement("h4");
            humidityEl.setAttribute("id", "humidity");
            currentWeatherEl.appendChild(humidityEl);
            let humidity = document.querySelector("#humidity");

            humidity.textContent = "Humidity: " + weatherData.main.humidity + "%";
          });
      }
    });
}

searchBtn.addEventListener("click", getGpsCoord);
