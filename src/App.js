import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { GiWindTurbine } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
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
      {/* <WiTime10 />
      {location.localtime}
      <br /> */}
      <LocationIcon />
      <br />
      <LocationName>
        {location.name},
        <br />
        {location.country}
      </LocationName>
      {/* <br />
      Lang: {location.lat}, Lon: {location.lon} */}
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
        <Temperature>{info.temperature}</Temperature>
        <span>&#8451;</span>
      </TemperatureResultBar>

      <WeatherDescription style={{ fontWeight: 600 }}>
        {weatherDescription}. Feels like {info.feelslike}
        <span>&#8451;</span>.
      </WeatherDescription>

      <ComfortLevelData>
        <WeatherImage
          src={weatherImage}
          alt="weather"
          style={{ marginLeft: "25%" }}
        />
        {/* <DataIcon /> */}
        <WeatherDescription>
          Cloud cover: {info.cloudcover}%
          <br />
          UV index: {info.uv_index}
          <br />
          Humidity: {info.humidity} %
        </WeatherDescription>
      </ComfortLevelData>
      <WindData>
        <WindIcon style={{ marginLeft: "20%" }} />
        <WeatherDescription>
          <span style={{ fontWeight: "bold" }}>Wind</span>
          <br />
          Speed: {info.wind_speed} m/s
          <br />
          Direction: {info.wind_dir}
        </WeatherDescription>
      </WindData>
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
  const textInput = useRef();
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.weatherInfo.pending);

  const getWeatherInfo = (e) => {
    if (e) e.preventDefault();
    dispatch(fetchWeather(city));
  };
  const clearInput = () => (textInput.current.value = "");

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
          ref={textInput}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Button type="submit" onClick={clearInput}>
          GO
        </Button>
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
  animation: spin 1s linear infinite;
  -webkit-animation: spin 1s linear infinite;
  animation-name: ${LoaderAnimation};
`;

const CityInput = styled.input`
  background: transparent;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  outline-color: white;
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
  border: none;
  outline-color: white;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  color: white;
  font-weight: 600;
`;
const LocationIcon = styled(GoLocation)`
  font-size: 2rem;
  opacity: 0.3;
`;
const LocationName = styled.section`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: 500;
`;
const TemperatureResultBar = styled.section`
  display: flex;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
`;
const Temperature = styled.section`
  padding: 0;
  margin: 0;
  font-size: 6rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 100;
`;
const ComfortLevelData = styled.section`
  display: inline-block;
  text-align: justify;
`;
const WeatherImage = styled.img`
  width: 60px;
  border-radius: 50%;
  border: 3px solid white;
  opacity: 0.7;
  filter: grayscale(100%);
`;
const WeatherDescription = styled.section`
  font-weight: 200;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 1rem;
`;
// const DataIcon = styled(GiThermometerHot)`
//   font-size: 5rem;
//   opacity: 0.5;
// `;

const WindData = styled.section`
  display: inline-block;
  text-align: justify;
`;
const WindIcon = styled(GiWindTurbine)`
  font-size: 5rem;
  opacity: 0.7;
`;
