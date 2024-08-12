import { ADVISETODAY } from "./advise-today";
import { ADVISETOMORROW } from "./advise-tmorrow";
import { CODESTATEOFSKY } from "./code-state-of-sky";

export const FunctionAdviseDay = ({ weather, history }) => {
  const comparisonTemp = (day) => {
    const tempDif = (yesterdayTemp, todayTemp, dayStr, endStr) => {
      let difNum = todayTemp - yesterdayTemp;
      let result = "немного теплее";
      if (difNum > 6) {
        result = dayStr + "намного теплее " + endStr;
      } else if (difNum > 3) {
        result = dayStr + "теплее" + endStr;
      } else if (difNum > 0) {
        result = dayStr + "немного теплее" + endStr;
      } else if (difNum > -3) {
        result = dayStr + "немного холоднее" + endStr;
      } else if (difNum > -6) {
        result = dayStr + "холоднее" + endStr;
      } else {
        result = dayStr + "намного холоднее" + endStr;
      }
      return result;
    };

    if (day === 0) {
      let dayStr = "Сегодня ";
      let endStr = " чем вчера.";
      let yesterdayTemp = history.forecast.forecastday[0].day.maxtemp_c;
      let todayTemp = weather.forecast.forecastday[0].day.maxtemp_c;
      return tempDif(yesterdayTemp, todayTemp, dayStr, endStr);
    } else {
      let dayStr = "Завтра ";
      let endStr = " чем сегодня.";
      let yesterdayTemp = weather.forecast.forecastday[0].day.maxtemp_c;
      let todayTemp = weather.forecast.forecastday[1].day.maxtemp_c;
      return tempDif(yesterdayTemp, todayTemp, dayStr, endStr);
    }
  };

  const uvIndex = (day) => {
    let uvStr = "";
    const uvMax = Math.max(
      weather.forecast.forecastday[day].hour[10].uv,
      weather.forecast.forecastday[day].hour[11].uv,
      weather.forecast.forecastday[day].hour[12].uv,
      weather.forecast.forecastday[day].hour[13].uv,
      weather.forecast.forecastday[day].hour[14].uv,
      weather.forecast.forecastday[day].hour[15].uv,
      weather.forecast.forecastday[day].hour[16].uv
    );

    if (uvMax === 6 && uvMax === 7) {
      uvStr =
        "Уровень УФ излучения " +
        uvMax +
        " это высоко. Если планируете более 2х часов находится на солнце, рекомендуется защитить кожу. Для открытых участков кожи стоит использовать крем с ЅРЕ 30 - 50 каждые 2 часа, после купания или обильного потоотделения.";
    } else if (uvMax >= 8) {
      uvStr =
        "Уровень УФ излучения " +
        uvMax +
        " это очень высоко, рекомендуется защитить кожу. Для открытых участков кожи стоит использовать крем с ЅРЕ 50+ каждые 2 часа, после купания или обильного потоотделения.";
    }
    return uvStr;
  };

  const weatherAdviceDayCods = () => {
    const resultList = [];
    const result = [];
    for (let j = 0; j < 2; j++) {
      for (let i = 6; i < 24; i++) {
        if (
          weather.forecast.forecastday[j].hour[i].condition.code in
          CODESTATEOFSKY
        ) {
          result.push(
            CODESTATEOFSKY[
              weather.forecast.forecastday[j].hour[i].condition.code
            ]
          );
        }
      }
      let arr = [...new Set(result)];
      resultList.push(arr);
    }
    return resultList;
  };

  const clothAdvise = (adviseDay, day) => {
    if (history.forecast.forecastday[0].day.totalsnow_cm > 10 && day === 0) {
      if (weather.forecast.forecastday[0].day.totalsnow_cm > 10) {
        adviseDay[0].snow =
          " Вчера был снегопад, дороги возможно засыпало. Сегодня также ожидается сильный снегопад. Учтите это планируя поездку.";
      } else {
        adviseDay[0].snow =
          " Вчера был снегопад, дороги возможно засыпало. Учтите это планируя поездку.";
      }
    }

    if (weather.forecast.forecastday[1].day.totalsnow_cm > 10 && day === 1) {
      adviseDay[0].snow = "Завтра также ожидается сильный снегопад";
    }

    if (weather.forecast.forecastday[day].day.maxtemp_c >= 32) {
      adviseDay[0].clothAdvise =
        " Рекомендуется надеть одежду из легких и натуральных тканей:";

      adviseDay[0].heat = "Широкополая шляпа/Бейсболка";
      adviseDay[0].glasses = "Солнцезащитные очки";
      adviseDay[0].upCloth = "Футболка/рубашка/платье";
      adviseDay[0].downCloth = "Легкое брюки/шорты/юбка";
      adviseDay[0].boots = "Сандали/шлепки/легкие кроссовки";

      if (weatherAdviceDayCods()[day].indexOf(3) != -1) {
        adviseDay[0].badWeatherAdvise =
          " Возможен небольшой дождь, стоит захватить зонт.";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Кроссовки/Ботинки";
      } else if (
        weatherAdviceDayCods()[day].indexOf(4) != -1 ||
        weatherAdviceDayCods()[day].indexOf(5) != -1
      ) {
        adviseDay[0].badWeatherAdvise =
          " Возможен дождь, стоит захватить зонт или дождевик.";
        adviseDay[0].jacket = "Ветровка";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Кроссовки/Водозащищенная обувь";
      }
    } else if (weather.forecast.forecastday[day].day.maxtemp_c >= 27) {
      adviseDay[0].clothAdvise =
        " Рекомендуется надеть одежду из легких и натуральных тканей:";
      adviseDay[0].heat = "Широкополая шляпа/Бейсболка";
      adviseDay[0].glasses = "Солнцезащитные очки";
      adviseDay[0].upCloth = "Футболка/рубашка/платье";
      adviseDay[0].downCloth = "Легкое брюки/шорты/юбка";
      adviseDay[0].boots = "Сандали/шлепки/легкие кроссовки";

      if (weatherAdviceDayCods()[day].indexOf(3) != -1) {
        adviseDay[0].badWeatherAdvise =
          " Возможен небольшой дождь, стоит захватить зонт.";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Кроссовки/Водозащищенная обувь";
      } else if (
        weatherAdviceDayCods()[day].indexOf(4) != -1 ||
        weatherAdviceDayCods()[day].indexOf(5) != -1
      ) {
        adviseDay[0].badWeatherAdvise =
          " Возможен дождь, стоит захватить зонт или дождевик.";
        adviseDay[0].jacket = "Ветровка";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Кроссовки/Водозащищенная обувь";
      }
    } else if (weather.forecast.forecastday[day].day.maxtemp_c >= 15) {
      adviseDay[0].clothAdvise =
        " Сегодня с утра и вечером вам захочется надеть куртку или толстовку, а днем снять:";
      adviseDay[0].heat = "Широкополая шляпа/Бейсболка";
      adviseDay[0].glasses = "Солнцезащитные очки";
      adviseDay[0].outerwear = "Легкая куртка/пиджак/толстовка/свитер";
      adviseDay[0].upCloth = "Футболка/рубашка";
      adviseDay[0].downCloth = "Джинсы/брюки";
      adviseDay[0].boots = "Кроссовки/ботинки";

      if (weatherAdviceDayCods()[day].indexOf(3) != -1) {
        adviseDay[0].badWeatherAdvise =
          " Возможен небольшой дождь, стоит захватить зонт.";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Кроссовки/Водозащищенная обувь";
      } else if (
        weatherAdviceDayCods()[day].indexOf(4) != -1 ||
        weatherAdviceDayCods()[day].indexOf(5) != -1
      ) {
        adviseDay[0].badWeatherAdvise =
          " Возможен дождь, стоит захватить зонт или дождевик.";
        adviseDay[0].jacket = "Дождевик";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Кроссовки/Водозащищенная обувь";
      }
    } else if (weather.forecast.forecastday[day].day.maxtemp_c >= 5) {
      adviseDay[0].clothAdvise =
        " Стоит утеплится, настало время осенней куртки!  Рекомендуемая одежда:";
      adviseDay[0].jacket = "Осенняя куртка";
      adviseDay[0].outerwear = "Пиджак/толстовка/свитер";
      adviseDay[0].upCloth = "Футболка/рубашка";
      adviseDay[0].downCloth = "Джинсы/брюки";
      adviseDay[0].boots = "Кроссовки/ботинки";

      if (weatherAdviceDayCods()[day].indexOf(3) != -1) {
        adviseDay[0].badWeatherAdvise =
          " Возможен небольшой дождь, стоит захватить зонт.";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Кроссовки/ботинки";
      } else if (
        weatherAdviceDayCods()[day].indexOf(4) != -1 ||
        weatherAdviceDayCods()[day].indexOf(5) != -1
      ) {
        adviseDay[0].badWeatherAdvise =
          " Возможен дождь, стоит захватить зонт.";
        adviseDay[0].umbrella = "Зонт";
        adviseDay[0].boots = "Водозащищенная обувь";
      }
    } else if (weather.forecast.forecastday[day].day.maxtemp_c >= -10) {
      adviseDay[0].clothAdvise =
        " Сегодня холодно, настало время зимней куртки! Рекомендуемая одежда:";
      adviseDay[0].jacket = "Зимняя куртка";
      adviseDay[0].outerwear = "Пиджак/толстовка/свитер";
      adviseDay[0].upCloth = "Футболка/рубашка";
      adviseDay[0].downCloth = "Джинсы/брюки";
      adviseDay[0].boots = "Водозащищенная утепленная обувь";

      if (weatherAdviceDayCods()[day].indexOf(3) != -1) {
        adviseDay[0].badWeatherAdvise = " Сегодня возможен небольшой дождь";
      } else if (
        weatherAdviceDayCods()[day].indexOf(4) != -1 ||
        weatherAdviceDayCods()[day].indexOf(5) != -1
      ) {
        adviseDay[0].badWeatherAdvise = " Сегодня возможен дождь со снегом";
      }
    } else if (weather.forecast.forecastday[day].day.maxtemp_c >= -20) {
      adviseDay[0].clothAdvise = " Сегодня очень холодно, стоит утеплиться!";
      adviseDay[0].heat = "Зимняя шапка";
      adviseDay[0].palms = "Перчатки";
      adviseDay[0].neck = "Шарф";
      adviseDay[0].jacket = "Зимняя куртка";
      adviseDay[0].outerwear = "Пиджак/толстовка/свитер";
      adviseDay[0].upCloth = "Футболка/рубашка";
      adviseDay[0].thermalUnderwear = "Термобелье";
      adviseDay[0].downCloth = "Джинсы/брюки";
      adviseDay[0].boots = "Зимние ботинки";
    } else if (weather.forecast.forecastday[day].day.maxtemp_c >= -99) {
      adviseDay[0].clothAdvise =
        "Сегодня очень холодно, стоит максимально утеплиться!";
      adviseDay[0].heat = "Зимняя шапка";
      adviseDay[0].palms = "Перчатки";
      adviseDay[0].neck = "Шарф";
      adviseDay[0].jacket = "Зимняя куртка";
      adviseDay[0].outerwear = "Пиджак/толстовка/свитер";
      adviseDay[0].upCloth = "Футболка/рубашка";
      adviseDay[0].thermalUnderwear = "Термобелье";
      adviseDay[0].downCloth = "Джинсы/брюки";
      adviseDay[0].boots = "Зимние ботинки";
      adviseDay[0].socks = "Теплые носки";

      if (weather.forecast.forecastday[day].day.maxtemp_c >= -30) {
        adviseDay[0].warmTrousers = "Зимние теплые брюки";
      }
    }
  };

  ADVISETODAY[0].comparisonTempString = comparisonTemp(0);
  ADVISETODAY[0].uvIndexString = uvIndex(0);
  ADVISETODAY[0].weatherAdviceString = weatherAdviceDayCods()[0];
  clothAdvise(ADVISETODAY, 0);

  ADVISETOMORROW[0].comparisonTempString = comparisonTemp(1);
  ADVISETOMORROW[0].uvIndexString = uvIndex(1);
  ADVISETOMORROW[0].weatherAdviceString = weatherAdviceDayCods()[1];
  clothAdvise(ADVISETOMORROW, 1);
};
