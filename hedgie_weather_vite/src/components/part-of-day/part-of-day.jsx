import { TempText } from "./temp-text";
import { HeaderText } from "./header-text";
import { CloudsText } from "./clouds-text";
import { WindText } from "./wind-text";

export function PartOfDay({ tabDayParam, className }) {
  return (
    <div className={className}>
      {tabDayParam.map((item) => (
        <div className="flex h-32 mt-10 gap-[4%] lg:h-[22vw] lg:mt-7" key={item.id}>
          <div className="flex flex-col items-center justify-center pb-[1%] bg-black/20 w-[18%] lg:pb-[1.6%]  sm:">
            <img src={`https://cdn.weatherapi.com/weather/64x64/day/${item.cloudsImgNumber}.png`} alt="cloud_pictyre" className="sm:w-[80%]"/>
            <TempText tempNumber={item.tempNumber} />
          </div>
          <div className="w-[78%]">
            <HeaderText day={item.day} tempString={item.tempString} />

            <CloudsText cloudsString={item.cloudsString} />

            <WindText
              windString={item.windString}
              windNumber={item.windNumber}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
