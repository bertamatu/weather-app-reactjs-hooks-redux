import axios from "axios";

export default function fetchWeather(city) {
  return function (dispatch) {
    dispatch({ type: "FETCH_WEATHER_PENDING" });
    return axios
      .get(
        `http://api.weatherstack.com/current?access_key=cd490f1761d42b116cbb4a0d2dfc84bf&query=${city}`
      )
      .then((result) => {
        //dispatch the action
        const data = result.data;
        console.log("fetchWeather() DATA", data);
        const { error } = data;
        if (error) {
          throw error;
        }
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: result.data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_WEATHER_ERROR", error: error });
        console.log("fetchWeather() >>> ERROR", error);
      });
  };
}
