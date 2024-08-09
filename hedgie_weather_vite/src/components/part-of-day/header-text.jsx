export function HeaderText({ day, tempString }) {
  return (
    <p
      className={"font-bold text-4xl leading-[26px] pb-3 lg:text-[5.6vw] lg:leading-[4vw] sm:pb-[2.5%]"}
    >
      {day} {tempString}
    </p>
  );
}
