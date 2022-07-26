import { ReactComponent as Pokeball_ } from "../assets/icons/_pokeball-2.svg";
import { ReactComponent as Arrow_ } from "../assets/icons/_poke-arrow.svg";
import { ReactComponent as Github } from "../assets/icons/github-icon.svg";

export default function Icons() {
  return (
    <svg
      id="icon-cache"
      style={{ display: "none" }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Pokeball_ />
      <Arrow_ />
      <Github />
    </svg>
  );
}

export function Arrow({ className }) {
  return (
    <svg className={`arrow-icon ${className && className}`}>
      <use href="#poke-arrow" />
    </svg>
  );
}

export function Icon({ type, className }) {
  return (
    <svg className={`${type}-icon ${className}`}>
      <use href="#poke-arrow" />
    </svg>
  );
}
