

export function Header({ className }) {
  return (
    <header className={className}>
      {/* <Image
        src={logo}
        alt="logo"
        priority={true}
        className="w-[100%]"
      /> */}
      <img src="./logo.webp" alt="logo" />
    </header>
  );
}
