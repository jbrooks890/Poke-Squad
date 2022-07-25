import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">Scout</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/">Profile</NavLink>
    </nav>
  );
}
