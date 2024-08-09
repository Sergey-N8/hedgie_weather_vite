import clsx from "clsx";

export function BtnInputCity({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "min-w-10 h-10 rounded-full bg-[#03b800] font-bold text-sm",
        "lg: ",
        "sm:h-[12vw] sm:min-w-[12vw] sm:text-[4vw]",
      )}
    >
      GO
    </button>
  );
}
