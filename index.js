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

// Location // Search box

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#searchbox");
  let cityValue = `${input.value}`;

  let apiKey = "e19aef4bcf8f9de7fd9dad6710436c3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

let searchEngine = document.querySelector("#search");
searchEngine.addEventListener("submit", searchCity);

// Temperature

function getWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let currentTemp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let currentCity = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let humidityValue = document.querySelector("#humidity");
  let windValue = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  currentCity.innerHTML = `${response.data.name}`;
  tempElement.innerHTML = `${currentTemp}`;
  humidityValue.innerHTML = `Humidity: ${humidity}%`;
  windValue.innerHTML = `Wind: ${wind} Km/h`;
  iconElement.setAttribute("src", 
   `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

// Current City

function getCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "e19aef4bcf8f9de7fd9dad6710436c3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(getWeather);
}

let currentCityBtn = document.querySelector("#currentcitybtn");
currentCityBtn.addEventListener("click", updateLocation);

function updateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function displayFahrenheitTemperature(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#temperature")
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

celsiusTemperature = response.data.main.temp;
}

function displayCelsiusTemperature(event) {
  let temperatureElement = document.querySelector("#temperature")
  temperatureElement.innerHTML  = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);