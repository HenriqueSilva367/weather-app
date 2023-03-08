import { useState } from "react";

import ErrorIcon from"./assets/images/404.png";
import ClearIcon from "./assets/images/clear.png";
import CloudIcon from "./assets/images/cloud.png";
import MistIcon from "./assets/images/mist.png";
import RainIcon from "./assets/images/rain.png";
import SnowIcon from "./assets/images/snow.png";


import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const APIKey = "b039ac343c33230585c1f9bfcc68f615";
  const [city, setCity] = useState<string>("");
  const container = document.querySelector(".container") as HTMLLIElement;
  const search = document.querySelector(".search-box button") as HTMLLIElement;
  const weatherBox = document.querySelector(".weather-box") as HTMLLIElement;
  const weatherDetails = document.querySelector(
    ".weather-details"
  ) as HTMLLIElement;
  const error404 = document.querySelector(".not-found") as HTMLLIElement;

  const image = document.getElementById("img") as HTMLLIElement | any;
  const temperature = document.querySelector(".weather-box .temperature") as HTMLLIElement;
  const description = document.querySelector(".weather-box .description") as HTMLLIElement;
  const humidity = document.querySelector(".weather-details .humidity span") as HTMLLIElement;
  const wind = document.querySelector(".weather-details .wind span") as HTMLLIElement;

  function Search() {
    if (city === "") {
      toast.error("O campo está vazio");
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.cod === "404") {
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");
            return;
          }
          error404.style.display = "none";
          error404.classList.remove("fadeIn");
          
          console.log(json.weather[0].main);

          switch (json.weather[0].main) {
            case 'Clear':
                image.src = ClearIcon;
                break;

            case 'Rain':
                image.src = RainIcon;
                break;

            case 'Snow':
                image.src = SnowIcon;
                break;

            case 'Clouds':
                image.src = CloudIcon;
                break;

            case 'Haze':
                image.src = MistIcon;
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';


        });
    }
  }

  return (
    <div className="container">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input
          type="text"
          placeholder="Digite a sua localização"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button
          className="fa-solid fa-magnifying-glass"
          onClick={Search}
        ></button>
      </div>

      <div className="not-found">
        <img src={ErrorIcon} />
        <p>Ops! Localização inválida 😕</p>
      </div>

      <div className="weather-box">
        <img src="" id="img" />
        <p className="temperature"></p>
        <p className="description"></p>
      </div>

      <div className="weather-details">
        <div className="humidity">
          <i className="fa-solid fa-water"></i>
          <div className="text">
            <span></span>
            <p>Humidity</p>
          </div>
        </div>
        <div className="wind">
          <i className="fa-solid fa-wind"></i>
          <div className="text">
            <span></span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
