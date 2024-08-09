import clsx from "clsx";
import { BtnInputCity } from "./btn-Input-city";

export function InputCity({ onChange, onClick, className }) {
  const hendlenCityInput = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={className}>
      <input
        className={clsx(
          "rounded-full h-10 bg-white pl-5 text-neutral-700 leading-tighttt",
          "lg:w-[100%]",
          "sm:h-[12vw] sm:text-[4vw] sm:pl-[6%]",
        )}
        type="text"
        placeholder="Введите свой город"
        onChange={hendlenCityInput}
      />
      <BtnInputCity onClick={onClick} />
    </div>
  );
}
