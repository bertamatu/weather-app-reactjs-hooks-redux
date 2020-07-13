import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import fetchWeather from "./actions/fetchWeather";
import { GiWindTurbine } from "react-icons/gi";
import { TiWeatherSunny } from "react-icons/ti";
import { WiHumidity, WiDegrees, WiTime10 } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { BsCloud } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

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
      <WiTime10 />
      {location.localtime}
      <br />
      <GoLocation />
      <br />
      {location.name},{location.country}
      <br />
      Lang: {location.lat}, Lon: {location.lon}
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
      <TemperatureResultBar>
        <Temperature>
          {info.temperature}
          {/* <WiDegrees /> */}
        </Temperature>
        <span>&#8451;</span>
      </TemperatureResultBar>
      <p>Comfort level</p>
      <br />
      <span>
        <WeatherImage src={weatherImage} alt="weather" />
      </span>
      <WeatherDescription>{weatherDescription}</WeatherDescription>
      <FeelsLikeTemp>
        ... feels like {info.feelslike}
        <span>&#8451;</span>
      </FeelsLikeTemp>
      <MdVisibility />
      Visibility: {info.visibility}
      <BsCloud />
      Cloudcover: {info.cloudcover}
      <TiWeatherSunny />
      UV index: {info.uv_index}
      <WiHumidity />
      Humidity: {info.humidity}%<p>Wind</p>
      {/* WIND ICON */}
      <WindIcon />
      Speed: {info.wind_speed}
      Direction: {info.wind_dir}
    </section>
  );
}

function WeatherSection() {
  const weatherInfo = useSelector((state) => state.weatherInfo.info);
  const { location, current } = weatherInfo;

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
  const pending = useSelector((state) => state.weatherInfo.pending);
  const getWeatherInfo = (e) => {
    if (e) e.preventDefault();
    dispatch(fetchWeather(city));
  };

  if (pending === true) {
    return <Loader></Loader>;
  }
  return (
    <AppContainer>
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
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.section`
  height: 100%;
  color: white;
`;
const LoaderAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;
const Loader = styled.div`
  margin: 0 auto;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px dotted white;
  width: 100px;
  height: 100px;
  opacity: 0.3;
  -webkit-animation: spin 1s linear infinite;
  animation-name: ${LoaderAnimation};
`;
const CityInput = styled.input`
  background: transparent;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  outline-color: white;
  padding: 1.5rem;
  margin-top: 4rem;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: white;
  }
  :-ms-input-placeholder {
    color: white;
  }
`;
const Button = styled.button`
  border: none;
  outline-color: white;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  color: white;
  font-weight: 600;
`;
const TemperatureResultBar = styled.p`
  display: flex;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
`;
const Temperature = styled.p`
  padding: 0;
  margin: 0;
  font-size: 9rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: 100;
`;
const WeatherImage = styled.img`
  width: 70px;
  border-radius: 50%;
  /* opacity: 0.3; */
  filter: grayscale(100%);
`;

const FeelsLikeTemp = styled.p`
  font-weight: 100;
  font-size: 0.8rem;
`;

const WeatherDescription = styled.p`
  font-weight: 100;
  font-size: 0.8rem;
`;

const WindIcon = styled(GiWindTurbine)`
  font-size: 6rem;
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
