import clsx from "clsx";

export function TabDayBtn({ onClick, nameButton, btnColor }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: btnColor }}
      className={clsx(
        "rounded-full h-10 w-1/2",
        "lg:",
        "sm:h-[12vw] sm:text-[4vw]",
      )}
    >
      {nameButton}
    </button>
  );
}
