import { useState } from "react";
import dateBuilder from "./dateBuilder";
import "./App.css";
import { AiOutlineSearch } from 'react-icons/ai'
import { BiWind } from 'react-icons/bi'
import { WiHumidity } from 'react-icons/wi'
import { BsFillCloudsFill } from 'react-icons/bs'

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
            <div className="location uppercase">
              {weather.name},{" "}
              <span className="country-symbole">{weather.sys.country}</span>
            </div>
          ) : (
            <div>Search a city...</div>
          )}
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        {weather.main ? (
          <div className="weather-box flex flex-col">
            <div className="temp">
              {Math.round(weather.main.temp)}
              <span>°C</span>
            </div>
            <span className="-mt-2 weather">{`${Math.round(weather.main.temp_min)} / ${Math.round(weather.main.temp_max)} °C`}</span>
            <div className="weather">{weather.weather[0].description}</div>
            <div className="container mx-auto px-6 mt-12">
              <div className="bg-[#ffffff20] text-xl text-white p-2 rounded-xl myShadow">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <span><BiWind size={30} /></span>
                    <span>{`${Math.round(weather.wind.speed * 3.6)} km/h`}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span><WiHumidity size={30} /></span>
                    <span>{weather.main.humidity} %</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span><BsFillCloudsFill size={30} /></span>
                    <span>{weather.main.humidity} hPa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}

export default App;
