import clsx from "clsx";
import { TabDayBtn } from "./tab-day-btn";

export function TabDayPonel({ onToday, onTomorrow, color1, color2, className }) {
  return (
    <div className={className}>
      <TabDayBtn onClick={onToday} nameButton={"Сегодня"} btnColor={color1} />
      <TabDayBtn onClick={onTomorrow} nameButton={"Завтра"} btnColor={color2} />
    </div>
  );
}
