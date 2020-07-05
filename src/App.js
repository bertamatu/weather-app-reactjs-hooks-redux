import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchWeather from "./actions/fetchWeather";

function App() {
  const [city, setCity] = useState("");
  const [weatherDetails, setWeatherDetails] = useState([]);
  const weatherSelector = useSelector((state) => state.weatherInfo);

  const dispatch = useDispatch();
  // const getWeatherInfoAction = (city) => dispatch(fetchWeather(city));

  // const errorMessage = "Please enter a city name...";
  // const getWeatherInfo = (e) => {
  //   if (e) e.preventDefault();
  //   if (city === "") {
  //     console.log(errorMessage);
  //   } else {
  //     fetchWeather(city);
  //     // console.log("weatherSelector ---..... >", weatherSelector);
  //   }
  // };

  // const weatherDetails = [];
  // if (
  //   weatherSelector.weatherReducer &&
  //   weatherSelector.hasOwnProperty("location")
  // ) {
  //   const weatherDetails = (
  //     <p>{weatherSelector.weatherReducer.data.location.country}</p>
  //   );
  // } else {
  //   const weatherDetails = (
  //     <h6>You need to type a city or city name does not exist</h6>
  //   );
  // }

  // useEffect(() => {
  //   dispatch(allActions.weatherActions.setUser(user));
  // }, []);

  // const [city, setCity] = useState("");
  // // const [weatherData, setWeatherData] = useState("");
  // const weatherSelector = useSelector((state) => state.weatherReducer);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   getWeatherInfo();
  // }, []);

  // const errorMessage = "Please enter a city name...";
  // const getWeatherInfo = async (e) => {
  //   // e.preventDefault();
  //   if (e) e.preventDefault();
  //   if (city === "") {
  //     console.log(errorMessage);
  //   } else {
  //     await getWeatherInfoAction(city);
  //     console.log("weatherSelector ---..... >", weatherSelector);
  //   }
  // };
  // const weatherDetails = "";
  // if (weatherSelector && weatherSelector.hasOwnProperty("location")) {
  //   const weatherDetails = (
  //     <p>{weatherSelector.weatherReducer.data.location.countr}</p>
  //   );
  // } else {
  //   const weatherDetails = (
  //     <h6>You need to type a city or city name does not exist</h6>
  //   );
  // }
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
      <h5>WEATHER DETAILS...</h5>
      {weatherDetails}
    </section>
  );
}

export default App;
