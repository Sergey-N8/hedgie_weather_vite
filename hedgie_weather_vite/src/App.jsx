import { Header } from "./components/header";
import { InputCity } from "./components/input-city";
import { TabDayPonel } from "./components/tab-day-ponel/tab-day-ponel.jsx";
import { useTabDayPonel } from "./components/tab-day-ponel/use-tab-day-ponel.jsx";
import { FunctionDay } from "./components/function/function-part-of-day.jsx";
import { PartOfDay } from "./components/part-of-day";
import { PartOfDayAdvise } from "./components/part-of-day-advise";
import { FunctionAdviseDay } from "./components/function/function-part-of-day-advise.jsx";
import { Data } from "./components/data/data.jsx";
import clsx from "clsx";

export default function App() {
  const { tabDay, tabDayAdvise, btnColor1, btnColor2, choseTabDay } =
    useTabDayPonel();

  const { weather, history, inputRef, searchPressed } = Data();

  return (
    <div className={clsx("max-w-[640px] mx-auto pl-2 pr-2", "lg: ", "sm: ")}>
      <Header className={"pt-3"} />

      <InputCity
        inputRef={inputRef}
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

          <PartOfDay tabDayParam={tabDay} className={"flex flex-col sm:pt-5"} />

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
