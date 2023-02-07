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
// probably need to add eventtarget...

  console.log(userInput);

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
        console.log(data[index].lat);
        console.log(data[index].lon);
      }
    });
}

searchBtn.addEventListener("click", getGpsCoord);
