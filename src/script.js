// Time & Day now

function TimeNow() {
  let now = new Date();

  let h5 = document.querySelector("h5");

  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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


function displayForcast() {
  let forecastElement = document.querySelector("#day-week");
  let forecastHTML = `            
    <div class="dayWeek" id="day-week">
      <div class="row">
        `;
  
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  days.forEach(function (day) {
    forecastHTML = forecastHTML + `
    <div class="col-4">              
    <p class="day">
      ${day}
    </p>
    </div>
      <div class="col-4">
        <img 
          src="https://openweathermap.org/img/wn/04d@2x.png" 
          alt="" 
          id="icon-week"
          class="iconWeek"
          width="50" height="50">
        </div>
      <div class="col-4">
        <p class="temperatureWeek">
          <span 
            class="temperatureWeekMax"
            id="temperature-week-max">6</span>°C
          <span class="temperatureForward"> / </span>
          <span 
            class="temperatureWeekMin"
            id="temperature-week-min">3</span>°C
    </p>
    </div>
    `;
  })

  forecastHTML = forecastHTML + `
      </div>
        </div>
    `;
  forecastElement.innerHTML = forecastHTML;

}


// Weather in city

function displayWeatherCondition(response) {
  // console.log(response.data);

  celsium = Math.round(response.data.main.temp);
  
  let cityElement = document.querySelector("#city-now");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature-city-now");
  temperatureElement.innerHTML = celsium;
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = Math.round(response.data.main.pressure);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}


// Search city

function search(city) {
  let apiKey = "5aace2efb8f27225e8be060bee36d254";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-text-input");
  search(cityElement.value);
} 


// Position

function searchLocation(position) {
  let apiKey = "5aace2efb8f27225e8be060bee36d254";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
  
  
  
// Celsium & Fahrenheit

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-city-now");
  
  celsiumLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = Math.round((celsium * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemp;
}

function displayCelsiumTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-city-now");

  celsiumLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = celsium;
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celsium = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiumLink = document.querySelector("#celsium");
celsiumLink.addEventListener("click", displayCelsiumTemp);

let currentButton = document.querySelector("#button-addon3");
currentButton.addEventListener("click", displayCurrentLocation);


displayForcast();

search("Kyiv");