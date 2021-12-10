import React, { useState } from "react";
require('dotenv').config();

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  function handleInput(event) {
    setQuery(event.target.value);
    console.log(event.target.value);
  }

  function handleSearch(event) {
    if (event.key === "Enter") {
      fetch(`${process.env.REACT_APP_API_URL}weather?q=${query}&appid=${process.env.REACT_APP_APP_KEY}&units=metric`)
        .then((response) => response.json())
        .then((data) => setWeather(data));
    }
  }
  console.log(weather);

  const date = new Date().toLocaleDateString("en-GB");
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            onChange={handleInput}
            onKeyPress={handleSearch}
            type="text"
            className="search-bar"
            placeholder="Search city....."
            value={query}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}{" "}
              </div>
              <div className="date">{date}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main} </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
      <div className="small-div">
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'><rect fill='#ff7700' width='1600' height='900'/><polygon fill='#cc0000'  points='957 450 539 900 1396 900'/><polygon fill='#aa0000'  points='957 450 872.9 900 1396 900'/><polygon fill='#d6002b'  points='-60 900 398 662 816 900'/><polygon fill='#b10022'  points='337 900 398 662 816 900'/><polygon fill='#d9004b'  points='1203 546 1552 900 876 900'/><polygon fill='#b2003d'  points='1203 546 1552 900 1162 900'/><polygon fill='#d3006c'  points='641 695 886 900 367 900'/><polygon fill='#ac0057'  points='587 900 641 695 886 900'/><polygon fill='#c4008c'  points='1710 900 1401 632 1096 900'/><polygon fill='#9e0071'  points='1710 900 1401 632 1365 900'/><polygon fill='#aa00aa'  points='1210 900 971 687 725 900'/><polygon fill='#880088'  points='943 900 1210 900 971 687'/></svg>
      </div>
    </div>
  );
}

export default App;
