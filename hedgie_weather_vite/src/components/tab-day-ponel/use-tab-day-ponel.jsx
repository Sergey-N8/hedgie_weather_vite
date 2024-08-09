import { useState } from "react";
import { TODAY } from "../function/today";
import { TOMORROW } from "../function/tomorrow";
import { ADVISETODAY } from "../function/advise-today";
import { ADVISETOMORROW } from "../function/advise-tmorrow";

export function useTabDayPonel() {
  const [tabDay, setTabDay] = useState(TODAY);
  const [tabDayAdvise, setTabDayAdvise] = useState(ADVISETODAY);
  const [btnColor1, setBtnColor1] = useState("#03b800");
  const [btnColor2, setBtnColor2] = useState("#6d6d6d");

  const choseTabDay = (nam) => {
    if (nam === 1) {
      setTabDay(TODAY);
      setTabDayAdvise(ADVISETODAY);
      setBtnColor1("#03b800");
      setBtnColor2("#6d6d6d");
    } else if (nam === 2) {
      setTabDay(TOMORROW);
      setTabDayAdvise(ADVISETOMORROW);
      setBtnColor1("#6d6d6d");
      setBtnColor2("#03b800");
    }
  };

  return {
    tabDay,
    tabDayAdvise,
    btnColor1,
    btnColor2,
    choseTabDay,
  };
}
