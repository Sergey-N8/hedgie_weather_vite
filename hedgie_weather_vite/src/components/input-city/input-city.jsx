import clsx from "clsx";
import { BtnInputCity } from "./btn-Input-city";

export function InputCity({ onClick, className, inputRef }) {
  // const hendlenCityInput = (e) => {
  //   ref(e.target.value);
  // };

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
        ref={inputRef}
      />
      <BtnInputCity onClick={onClick} />
    </div>
  );
}
