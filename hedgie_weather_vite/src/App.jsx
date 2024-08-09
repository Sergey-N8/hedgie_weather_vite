import { useState } from "react";
import { Header } from "./components/header";
import { InputCity } from "./components/input-city";
import { TabDayPonel } from "./components/tab-day-ponel/tab-day-ponel.jsx";
import { useTabDayPonel } from "./components/tab-day-ponel/use-tab-day-ponel.jsx";
import { FunctionDay } from "./components/function/function-part-of-day.jsx";
import { PartOfDay } from "./components/part-of-day";
import { PartOfDayAdvise } from "./components/part-of-day-advise/part-of-day-advise.jsx";
import { FunctionAdviseDay } from "./components/function/function-part-of-day-advise.jsx";
import clsx from "clsx";

export default function App() {
  const { tabDay, tabDayAdvise, btnColor1, btnColor2, choseTabDay } = useTabDayPonel();

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [history, setWeatherHistory] = useState({});

  const hendlenCityInput = (search) => {
    setSearch(search);
  };

  const api = {
    keyOpenWeatherMap: "e0d048c37bdfd0ad7c604f3991f0fab3",
    keyWeatherApi: "e13fe10f11954b6aa3260206242606",
    baseLocation: "http://api.openweathermap.org/geo/1.0/",
    baseOpenWeatherMapV2_5: "https://api.openweathermap.org/data/2.5/",
    baseWeatherApi: "https://api.weatherapi.com/v1/",
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
    Promise.all([
      fetch(
        `${api.baseWeatherApi}/forecast.json?key=${api.keyWeatherApi}&q=${search}&days=2&aqi=no&alerts=no}`,
      ),
      fetch(
        `${api.baseWeatherApi}/history.json?key=${
          api.keyWeatherApi
        }&q=${search}&dt=${getYesterdayDate()}`,
      ),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([dataWeather, dataHistory]) => {
        setWeather(dataWeather);
        setWeatherHistory(dataHistory);
      });
  };

  return (
    <div className={clsx("max-w-[640px] mx-auto pl-2 pr-2", "lg: ", "sm: ")}>
      <Header className={"pt-3"} />

      <InputCity
        onChange={hendlenCityInput}
        onClick={searchPressed}
        className={"flex justify-center gap-3 pt-3 min-w-full sm:gap-[3%]"}
      />

      {typeof weather.location !== "undefined" ? (
        <>
          <FunctionDay weather={weather} history={history} />
          <FunctionAdviseDay weather={weather} history={history} />

          <TabDayPonel
            onToday={() => choseTabDay(1)}
            onTomorrow={() => choseTabDay(2)}
            color1={btnColor1}
            color2={btnColor2}
            className={"flex gap-3 pt-7 sm:pt-5 "}
          />

          <PartOfDay
            tabDayParam={tabDay}
            className={"flex flex-col sm:pt-5"}
          />

          <PartOfDayAdvise
            tabDayParam={tabDayAdvise}
            className={"flex flex-col pt-7 pb-7 sm:pt-5"}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
