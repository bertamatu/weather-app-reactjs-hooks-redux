import axios from "axios";
require("dotenv").config();

export default function fetchWeather(city) {
  return function (dispatch) {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    dispatch({ type: "FETCH_WEATHER_PENDING" });
    return axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}/`
      )
      .then((result) => {
        const data = result.data;
        const { error } = data;
        if (error) {
          throw error;
        }
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: result.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_WEATHER_ERROR", error: error });
      });
  };
}
