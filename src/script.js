// Time & Day now

function TimeNow() {
  let now = new Date();

  let h5 = document.querySelector("h5");

  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
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
  let month = months[now.getMonth()];

  h5.innerHTML = `${day} – ${date} ${month}, ${hours}:${minutes}`;
}
TimeNow();



// Weather in city

function displayWeatherCondition(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city-now");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature-city-now");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = Math.round(response.data.main.pressure);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "5aace2efb8f27225e8be060bee36d254";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
} 



// Possition

function searchLocation(position) {
  let apiKey = "5aace2efb8f27225e8be060bee36d254";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#button-addon3");
currentButton.addEventListener("click", currentLocation);


search("Kyiv");


// Celsium & Fahrenheit

function tempCelsium(event) {
  event.preventDefault();
  temperatureCityNow.innerHTML = Math.round("#temperature-city-now");
}

function tempFahrenheit(event) {
  event.preventDefault();
  temperatureCityNow.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let temperatureCityNow = document.querySelector("#temperature-city-now");
let temperature = temperatureCityNow.innerHTML;
temperature = Number(temperature);

let celsium = document.querySelector("#celsium");
celsium.addEventListener("click", tempCelsium);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", tempFahrenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

