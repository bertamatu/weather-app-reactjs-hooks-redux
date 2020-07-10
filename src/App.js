import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
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
      {location.localtime}
      <br />
      {location.name},{location.country}
      <br />
      (Lang:{location.lat}, Lon:
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
        {info.temperature} <span>&#8451;</span>
      </p>
      <span>
        <WeatherImage src={weatherImage} alt="weather" />
      </span>
      {weatherDescription}
      <p>Humidity: {info.humidity}%</p>
      <p>
        feels like {info.feelslike}
        <span>&#8451;</span>
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
      <WeatherInformation info={current} />
      <Location location={location} />
    </section>
  );
}
function App() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.weatherInfo.pending);
  const getWeatherInfo = (e) => {
    if (e) e.preventDefault();
    dispatch(fetchWeather(city));
  };

  if (pending === true) {
    return <p>Loading...</p>;
  }
  return (
    <section>
      <header>
        <h3>WeatherApp</h3>
      </header>
      <form onSubmit={getWeatherInfo}>
        <CityInput
          type="text"
          placeholder="City..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Button type="submit">GO</Button>
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

const CityInput = styled.input`
  background: transparent;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  outline-color: rgb(204, 0, 102);
  padding: 1.5rem;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: white;
  }
  :-ms-input-placeholder {
    color: white;
  }
`;

const Button = styled.button`
  outline-color: rgb(204, 0, 102);
  background-color: rgba(255, 255, 255, 0.05);
`;

const WeatherImage = styled.img`
  width: 80px;
  border-radius: 50%;
`;

// current:
// cloudcover: 100;
// feelslike: 18;
// humidity: 83;
// is_day: "no";
// observation_time: "08:16 PM";
// precip: 2;
// pressure: 1009;
// temperature: 18;
// uv_index: 1;
// visibility: 10;
// weather_code: 296;
// weather_descriptions: ["Light Rain Shower"];
// weather_icons: [
//   "https://assets.weatherstack.com/images/wsymbols01_…_64/wsymbol_0033_cloudy_with_light_rain_night.png",
// ];
// wind_degree: 197;
// wind_dir: "SSW";
// wind_speed: 0;

// location:
// country: "Lithuania";
// lat: "54.900";
// localtime: "2020-07-10 23:16";
// localtime_epoch: 1594422960;
// lon: "23.900";
// name: "Kaunas";
// region: "Kauno Apskritis";
// timezone_id: "Europe/Vilnius";
// utc_offset: "3.0";
