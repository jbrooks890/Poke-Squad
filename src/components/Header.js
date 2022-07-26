import Nav from "./Nav";

export default function Header() {
  return (
    <header>
      <div id="logo">
        <svg id="logo-mark">
          <use href="#pokeball-2-icon" />
        </svg>
        <h1 id="site-title">PokéSquad</h1>
      </div>
      <Nav />
    </header>
  );
}
