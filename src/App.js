import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { GiWindTurbine, GiThermometerHot } from "react-icons/gi";
import { GoLocation, GoGraph } from "react-icons/go";
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
        {location.name},{location.country}
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
      <WeatherDescription>
        {weatherDescription}. Feels like {info.feelslike}
        <span>&#8451;</span>.
      </WeatherDescription>
      <br />
      <br />
      <ComfortLevelData>
        {/* <WeatherImage src={weatherImage} alt="weather" /> */}
        <DataIcon />
        <section>
          <WeatherDescription>
            Cloudcover: {info.cloudcover}%
            <br />
            UV index: {info.uv_index}
            <br />
            Humidity: {info.humidity} %
          </WeatherDescription>
        </section>
      </ComfortLevelData>
      <WindData>
        <WindIcon />
        <WeatherDescription>
          <p>Wind</p>
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
  const dispatch = useDispatch();
  const pending = useSelector((state) => state.weatherInfo.pending);
  const getWeatherInfo = (e) => {
    if (e) e.preventDefault();
    dispatch(fetchWeather(city));
    return (e.target.value = " ");
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
const LocationName = styled.p`
  margin: 0;
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-weight: 300;
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
const ComfortLevelData = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const WeatherImage = styled.img`
  height: 70px;
  border-radius: 50%;
  opacity: 0.5;
  filter: grayscale(100%);
`;
const WeatherDescription = styled.p`
  font-weight: 200;
  text-transform: uppercase;
  font-size: 0.8rem;
`;
const DataIcon = styled(GiThermometerHot)`
  font-size: 5rem;
  opacity: 0.5;
`;
const WindData = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WindIcon = styled(GiWindTurbine)`
  font-size: 5rem;
  opacity: 0.5;
`;
