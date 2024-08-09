import { TODAY } from "./today";
import { TOMORROW } from "./tomorrow";
import jsonData from "./conditionRus.json";

export const FunctionDay = ({ weather, history }) => {
  const conditionRus = () => JSON.parse(JSON.stringify(jsonData));

  const arrTempNamber = [
    weather.forecast.forecastday[0].hour[8].temp_c,
    weather.forecast.forecastday[0].day.maxtemp_c,
    weather.forecast.forecastday[0].hour[20].temp_c,
    weather.forecast.forecastday[1].hour[8].temp_c,
    weather.forecast.forecastday[1].day.maxtemp_c,
    weather.forecast.forecastday[1].hour[20].temp_c,
  ];

  const sensTemp = (arrTempNamber) => {
    const arrTempStr = [];
    for (let i = 0; i < arrTempNamber.length; i++) {
      if (arrTempNamber[i] < -25) {
        arrTempStr.push("очень холодно");
      } else if (arrTempNamber[i] < -10) {
        arrTempStr.push("мороз");
      } else if (arrTempNamber[i] < 5) {
        arrTempStr.push("холодно");
      } else if (arrTempNamber[i] < 15) {
        arrTempStr.push("прохладно");
      } else if (arrTempNamber[i] < 25) {
        arrTempStr.push("комфортно");
      } else if (arrTempNamber[i] < 32) {
        arrTempStr.push("жарко");
      } else {
        arrTempStr.push("очень жарко");
      }
    }
    return arrTempStr;
  };

  const conditionCode = (day) => {
    const conditionNumMor = Math.max(
      weather.forecast.forecastday[day].hour[6].condition.code,
      weather.forecast.forecastday[day].hour[7].condition.code,
      weather.forecast.forecastday[day].hour[8].condition.code,
      weather.forecast.forecastday[day].hour[9].condition.code,
    );
    const conditionNumNoon = Math.max(
      weather.forecast.forecastday[day].hour[10].condition.code,
      weather.forecast.forecastday[day].hour[11].condition.code,
      weather.forecast.forecastday[day].hour[12].condition.code,
      weather.forecast.forecastday[day].hour[13].condition.code,
      weather.forecast.forecastday[day].hour[14].condition.code,
      weather.forecast.forecastday[day].hour[15].condition.code,
      weather.forecast.forecastday[day].hour[16].condition.code,
      weather.forecast.forecastday[day].hour[17].condition.code,
      weather.forecast.forecastday[day].hour[18].condition.code,
      weather.forecast.forecastday[day].hour[19].condition.code,
    );
    const conditionNumEven = Math.max(
      weather.forecast.forecastday[day].hour[20].condition.code,
      weather.forecast.forecastday[day].hour[21].condition.code,
      weather.forecast.forecastday[day].hour[22].condition.code,
      weather.forecast.forecastday[day].hour[23].condition.code,
    );
    const conditionArr = [conditionNumMor, conditionNumNoon, conditionNumEven];
    const conditionArrRes = [];
    for (let i = 0; i < conditionArr.length; i++) {
      for (let e of conditionRus()) {
        if (e.code === conditionArr[i]) {
          conditionArrRes.push(e.day_text);
          conditionArrRes.push(e.icon);
        }
      }
    }
    return conditionArrRes;
  };

  const windPowerList = (day) => {
    const windPowerListStart = [];
    for (let i = 0; i < weather.forecast.forecastday[day].hour.length; i++) {
      windPowerListStart.push(
        weather.forecast.forecastday[day].hour[i].wind_kph,
      );
    }
    return windPowerListStart;
  };

  const windPowerListNamber = [
    Math.max(...windPowerList(0).slice(6, 9)),
    Math.max(...windPowerList(0).slice(10, 19)),
    Math.max(...windPowerList(0).slice(20, 23)),
    Math.max(...windPowerList(1).slice(6, 9)),
    Math.max(...windPowerList(1).slice(10, 19)),
    Math.max(...windPowerList(1).slice(20, 23)),
  ];

  const windPowerFeelsLike = (wind) => {
    let feelsLikeStr = " ";
    if (wind < 10) {
      feelsLikeStr = "слабый";
    } else if (wind < 25) {
      feelsLikeStr = "умеренный";
    } else if (wind < 40) {
      feelsLikeStr = "сильный";
    } else {
      feelsLikeStr = "внимание ураган!";
    }
    return feelsLikeStr;
  };

  for (let i = 0; i < arrTempNamber.length; i++) {
    if (i < 3) {
      TODAY[i].tempNumber = Math.round(arrTempNamber[i]);
      TODAY[i].tempString = sensTemp(arrTempNamber)[i];
      TODAY[i].cloudsString = conditionCode(0)[i * 2];
      TODAY[i].cloudsImgNumber = conditionCode(0)[i * 2 + 1];
      TODAY[i].windNumber = Math.round(windPowerListNamber[i]);
      TODAY[i].windString = windPowerFeelsLike(windPowerListNamber[i]);
    } else {
      TOMORROW[i - 3].tempNumber = Math.round(arrTempNamber[i]);
      TOMORROW[i - 3].tempString = sensTemp(arrTempNamber)[i];
      TOMORROW[i - 3].cloudsString = conditionCode(1)[(i - 3) * 2];
      TOMORROW[i - 3].cloudsImgNumber = conditionCode(1)[(i - 3) * 2 + 1];
      TOMORROW[i - 3].windNumber = Math.round(windPowerListNamber[i]);
      TOMORROW[i - 3].windString = windPowerFeelsLike(windPowerListNamber[i]);
    }
  }
};
