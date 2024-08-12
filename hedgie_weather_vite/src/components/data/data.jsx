import axios from "axios";
import { useState } from "react";
import { useRef } from "react";

export function Data() {
  const [weather, setWeather] = useState({});
  const [history, setWeatherHistory] = useState({});
  let inputRef = useRef(null);

  const api = {
    keyWeatherApi: "e13fe10f11954b6aa3260206242606",
    baseWeatherApi: "https://api.weatherapi.com/v1/",

    // keyOpenWeatherMap: "e0d048c37bdfd0ad7c604f3991f0fab3",
    // baseLocation: "http://api.openweathermap.org/geo/1.0/",
    // baseOpenWeatherMapV2_5: "https://api.openweathermap.org/data/2.5/",
  };

  const getYesterdayDate = () => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const result =
      yesterday.getFullYear() +
      "-" +
      String(yesterday.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(yesterday.getDate()).padStart(2, "0");
    return result;
  };

  const searchPressed = () => {
    axios
      .all([
        axios.get(
          `${api.baseWeatherApi}/forecast.json?key=${api.keyWeatherApi}&q=${inputRef.current.value}&days=2&aqi=no&alerts=no`
        ),
        axios.get(
          `${api.baseWeatherApi}/history.json?key=${api.keyWeatherApi}&q=${
            inputRef.current.value
          }&dt=${getYesterdayDate()}`
        ),
      ])
      .then(
        axios.spread((data1, data2) => {
          setWeather(data1.data);
          setWeatherHistory(data2.data);
        })
      );
  };

  return {
    weather,
    history,
    inputRef,
    searchPressed,
  };
}
