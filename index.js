function formatdate() {
  let today = document.querySelector("#date");
  today.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;
}

let now = new Date();
let day = now.getDay();
let month = now.getMonth();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
month = months[now.getMonth()];
let hour = now.getHours();
let minutes = now.getMinutes();

formatdate();


// Forecast Weather //

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {
    forecastHTML= forecastHTML +
    `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
       alt=""
       width="45"></img>
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
        <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apiKey = "e19aef4bcf8f9de7fd9dad6710436c3e";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Temperature //

function getWeather(response) {
  let currentCity = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentCity.innerHTML = `${response.data.name}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute("src", 
   `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   
   getForecast(response.data.coord);
}

  // Location // Search box // apiKey=e19aef4bcf8f9de7fd9dad6710436c3e //

function changeCity(city) {
  let apiKey = "e19aef4bcf8f9de7fd9dad6710436c3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city");
  changeCity(inputCity.value);
}

let newCity = document.querySelector("#search");
newCity.addEventListener("submit", handleSubmit);

// Current City //

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "e19aef4bcf8f9de7fd9dad6710436c3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getWeather);
}

// GET CURRENT LOCATION //

let currentCityBtn = document.querySelector("#current-btn");
currentCityBtn.addEventListener("click", updateLocation);

// UPDATE CURRENT LOCATION //

function updateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

// CONVERT CELCIUS //

function convertCelcius(event) {
  event.preventDefault();

  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", convertCelcius);

// CONVERT FAHRENHEIT //

function convertFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");

  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitTemp = Math.round(fahrenheitTemp);
  currentTemp.innerHTML = `${fahrenheitTemp}`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

changeCity("Lisbon");