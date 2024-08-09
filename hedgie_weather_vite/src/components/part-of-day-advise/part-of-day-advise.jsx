import { ClothAdvise } from "./cloth-advise";

export function PartOfDayAdvise({ tabDayParam, className }) {
  return (
    <div className={className}>
      {tabDayParam.map((item) => (
        <div className="flex flex-col" key={item.id}>
          <p className="text-[20px] leading-snug  lg:text-[3.6vw] lg:leading-[5vw]">
            {item.comparisonTempString} {item.uvIndexString}
            {item.badWeatherAdvise === "" ? "" : item.badWeatherAdvise}{" "}
            {item.snowYesterday === "" ? "" : item.snow} {item.clothAdvise}
          </p>
          {<br/>}

          {item.heat === "" ? "" : <ClothAdvise text={item.heat} />}
          {item.glasses === "" ? "" : <ClothAdvise text={item.glasses} />}
          {item.palms === "" ? "" : <ClothAdvise text={item.palms} />}
          {item.neck === "" ? "" : <ClothAdvise text={item.neck} />}
          {item.jacket === "" ? "" : <ClothAdvise text={item.jacket} />}
          {item.outerwear === "" ? "" : <ClothAdvise text={item.outerwear} />}
          {item.upCloth === "" ? "" : <ClothAdvise text={item.upCloth} />}
          {item.thermalUnderwear === "" ? (
            ""
          ) : (
            <ClothAdvise text={item.thermalUnderwear} />
          )}
          {item.downCloth === "" ? "" : <ClothAdvise text={item.downCloth} />}
          {item.boots === "" ? "" : <ClothAdvise text={item.boots} />}
          {item.socks === "" ? "" : <ClothAdvise text={item.socks} />}
          {item.warmTrousers === "" ? (
            ""
          ) : (
            <ClothAdvise text={item.warmTrousers} />
          )}
          {item.umbrella === "" ? "" : <ClothAdvise text={item.umbrella} />}
        </div>
      ))}
    </div>
  );
}
