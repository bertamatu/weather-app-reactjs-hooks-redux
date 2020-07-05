import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchWeather from "./actions/fetchWeather";

function App() {
  const [city, setCity] = useState("");
  console.log("CITY", city);
  const weatherSelector = useSelector((state) => state.WeatherInfo);
  const dispatch = useDispatch();
  const getWeatherInfoAction = (city) => dispatch(fetchWeather(city));

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const getWeatherInfo = (e) => {
    if (e) e.preventDefault();
    if (city === "") {
      console.log("Please enter a city name!");
    } else {
      getWeatherInfoAction(city);
    }
  };

  return (
    <section>
      {console.log("WEATHERSELECTOR", weatherSelector.WeatherInfo)}
      <header>
        <h3>WeatherApp</h3>
        <p>React Js Hooks and Redux</p>
      </header>
      <form onSubmit={getWeatherInfo}>
        <input
          type="text"
          placeholder="City..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button type="submit">OK</button>
      </form>
    </section>
  );
}

export default App;
