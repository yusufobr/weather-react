import { useState } from "react";
import dateBuilder from "./dateBuilder";
import "./App.css";
import { AiOutlineSearch } from 'react-icons/ai'

const api = {
  key: "7608c6676e5dad2935426db76a781601",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(weather);
          setQuery("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app"
            : "app cold"
          : "app cold"
      }
    >
      <main>
        <div className="search-box text-white relative">
          <input
            type="text"
            className="search-bar"
            placeholder="Search ..."
            onChange={(evt) => setQuery(evt.target.value)}
            value={query}
            onKeyPress={search}
          />
          <div className="absolute top-4 right-10">
            <AiOutlineSearch size={30} />
          </div>
        </div>
        <div className="location-box">
          {weather.main ? (
            <div className="location">
              {weather.name},{" "}
              <span className="country-symbole">{weather.sys.country}</span>
            </div>
          ) : (
            <div>Search a city...</div>
          )}
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        {weather.main ? (
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}
              <span>°C</span>
            </div>
            <div className="min-max">
              min 20<span>°C</span> &nbsp;&nbsp; min 35<span>°C</span>
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}

export default App;
