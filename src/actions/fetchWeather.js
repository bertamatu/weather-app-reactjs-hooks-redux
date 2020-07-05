// import axios from "axios";

// export default function fetchWeather(city) {
//   const API_KEY = `cd490f1761d42b116cbb4a0d2dfc84bf`;
//   return async function (dispatch) {
//     await axios
//       .get(
//         `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`,
//         { headers: { "content-type": "application/json; Charset=UTF-8" } }
//       )
//       .then((data) => {
//         //dispatch the action
//         dispatch({ type: "FETCH_WEATHER", payload: data });
//         console.log("fetchWeather() DATA >>>", data);
//       })
//       .catch((error) => {
//         console.log("fetchWeather() >>> ERROR", error);
//       });
//   };
// }
