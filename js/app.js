"use strict";

//HTML elements
const input = document.querySelector("input");
const button = document.querySelector("button");
const modal = document.querySelector(".modal-c");
const closeModal = document.querySelector("#close-modal");
const modalImage = document.querySelector("#modal-img");
const modalTemperature = document.querySelector("#modal-tmp");
const modalDescription = document.querySelector("#modal-description");
const modalLocation = document.querySelector("#modal-location");
const modalFeelsLike = document.querySelector("#modal-feels-like");
const modalHumidity = document.querySelector("#modal-humidity");

//Classes
class Weather {
  constructor(city) {
    this.city = city;
    this.icon;
    this.condition;
    this.temperature;
    this.description;
    this.country;
    this.feelsLike;
    this.humidity;
  }
  async getDataByCity() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=295a2b2acf568645d7086ea15c36f248&units=metric`
    );

    const data = await res.json();

    this.city = data.name;
    this.icon = data.weather[0].icon;
    this.condition = data.weather[0].main;
    this.temperature = Math.round(data.main.temp);
    this.description = data.weather[0].description;
    this.country = data.sys.country;
    this.feelsLike = Math.round(data.main.feels_like);
    this.humidity = data.main.humidity;

    this.showModal();
    input.value = "";
  }

  async getDataByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (pos) {
          const geoLat = pos.coords.latitude.toFixed(5);
          const geoLng = pos.coords.longitude.toFixed(5);

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLng}&appid=295a2b2acf568645d7086ea15c36f248&units=metric`
          );
          const data = await res.json();

          const weather = new Weather();
          weather.city = data.name;
          weather.icon = data.weather[0].icon;
          weather.condition = data.weather[0].main;
          weather.temperature = Math.round(data.main.temp);
          weather.description = data.weather[0].description;
          weather.country = data.sys.country;
          weather.feelsLike = Math.round(data.main.feels_like);
          weather.humidity = data.main.humidity;

          weather.showModal();
        },
        function (err) {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
            case err.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case err.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            default:
              alert("An unknown error occurred.");
          }
        }
      );
    } else {
      alert("Location is not available!");
    }
  }

  showModal() {
    this.getIcon();
    modalDescription.textContent = capitalizeEachWord(this.description);
    modalTemperature.textContent = `${this.temperature}℃`;
    modalFeelsLike.textContent = `${this.feelsLike}℃`;
    modalHumidity.textContent = `${this.humidity}%`;
    modalLocation.textContent = `${this.city}, ${this.country}`;
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  }
  getIcon() {
    switch (this.icon) {
      case "01d":
        modalImage.src = "./assets/weather-icons/day.svg";
        break;
      case "01n":
        modalImage.src = "./assets/weather-icons/night.svg";
        break;
      case "02d":
        modalImage.src = "./assets/weather-icons/cloudy-day-3.svg";
        break;
      case "02n":
        modalImage.src = "./assets/weather-icons/cloudy-night-3.svg";
        break;
      case "03d":
        modalImage.src = "./assets/weather-icons/cloudy.svg";
        break;
      case "03n":
        modalImage.src = "./assets/weather-icons/cloudy.svg";
        break;
      case "04d":
        modalImage.src = "./assets/weather-icons/cloudy.svg";
        break;
      case "04n":
        modalImage.src = "./assets/weather-icons/cloudy.svg";
        break;
      case "09d":
        modalImage.src = "./assets/weather-icons/rainy-6.svg";
        break;
      case "09n":
        modalImage.src = "./assets/weather-icons/rainy-6.svg";
        break;
      case "10d":
        modalImage.src = "./assets/weather-icons/rainy-3.svg";
        break;
      case "10n":
        modalImage.src = "./assets/weather-icons/rainy-6.svg";
        break;
      case "11d":
        modalImage.src = "./assets/weather-icons/thunder.svg";
        break;
      case "11n":
        modalImage.src = "./assets/weather-icons/thunder.svg";
        break;
      case "13d":
        modalImage.src = "./assets/weather-icons/snowy-3.svg";
        break;
      case "13n":
        modalImage.src = "./assets/weather-icons/snowy-6.svg";
        break;
      case "50d":
        modalImage.src = "./assets/weather-icons/mist.svg";
        break;
      case "50n":
        modalImage.src = "./assets/weather-icons/mist.svg";
        break;

      default:
        modalImage.src = "./assets/weather-icons/mist.svg";
        break;
    }
  }
}

//Functions
function capitalizeEachWord(str) {
  const words = str.split(" ");
  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.substr(1)
  );
  return capitalizedWords.join(" ");
}

//DOM events
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const newWeather = new Weather(input.value);
    newWeather.getDataByCity();
  }
});

button.addEventListener("click", () => {
  const weather = new Weather();
  weather.getDataByLocation();
});

closeModal.addEventListener("click", () => {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.visibility = "hidden";
  }, 300);
});
