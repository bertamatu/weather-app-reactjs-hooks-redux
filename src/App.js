import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchWeather from "./actions/fetchWeather";

function ErrorMessage() {
  const weatherError = useSelector((state) => state.weatherInfo.error);
  if (weatherError === undefined || weatherError === null) return null;
  return (
    <section>
      <h6 style={{ color: "red" }}>{weatherError.info}</h6>
    </section>
  );
}

function Location(props) {
  if (props && props.location === undefined) return null;
  const location = props.location;
  return (
    <section>
      In {location.name}, {location.country} (Lang:{location.lat}, Lon:
      {location.lon})
    </section>
  );
}

function WeatherInformation(props) {
  if (!props || props.info === undefined) return null;
  const info = props.info;
  const weatherDescription =
    info.weather_descriptions.length > 0 ? info.weather_descriptions[0] : null;
  const weatherImage =
    info.weather_icons.length > 0 ? info.weather_icons[0] : null;

  return (
    <section>
      <p>
        It is {weatherDescription} <img src={weatherImage} alt="weather" />
      </p>
      <br />
      <p>
        The temperature is {info.temperature}C, but feels like {info.feelslike}
        C.
      </p>
    </section>
  );
}

function WeatherSection() {
  const weatherInfo = useSelector((state) => state.weatherInfo.info);
  const { location, current } = weatherInfo;

  console.log("WEATHER SECTION", weatherInfo, +new Date());
  return (
    <section>
      <Location location={location} />
      <WeatherInformation info={current} />
    </section>
  );
}
function App() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const getWeatherInfo = (e) => {
    if (e) e.preventDefault();
    dispatch(fetchWeather(city));
  };

  return (
    <section>
      <header>
        <h3>WeatherApp</h3>
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
        <button type="submit">GO</button>
      </form>
      <br />
      <ErrorMessage />
      <br />
      <section>
        <WeatherSection />
      </section>
    </section>
  );
}

export default App;
