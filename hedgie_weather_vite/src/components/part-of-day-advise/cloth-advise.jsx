export function ClothAdvise({ text }) {
  return (
    <div className="flex gap-3 lg:gap-[3%]">
      <span className="text-[26px] leading-none lg:text-[4.6vw]">•</span>
      <p className="text-[20px] leading-snug  lg:text-[3.6vw] lg:leading-[5vw]">
        {text}
      </p>
    </div>
  );
}
