import axios from "axios";

export default function fetchWeather(city) {
  const API_KEY = `cd490f1761d42b116cbb4a0d2dfc84bf`;
  return function (dispatch) {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=cd490f1761d42b116cbb4a0d2dfc84bf&query=${city}`
      )
      .then((data) => {
        //dispatch the action
        dispatch({ type: "FETCH_WEATHER", payload: data });
        console.log("fetch data", data);
      })
      .catch((error) => {
        console.log("fetchWeather() >>> ERROR", error);
      });
  };
}
