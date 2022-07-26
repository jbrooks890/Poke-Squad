import Icons from "./Icons";

export default function Footer() {
  return (
    <footer>
      <div className="icon"></div>
      <a
        id="footer-connect"
        href="https://github.com/jbrooks890/Poke-Squad"
        target="_blank"
      >
        <h3>jbrooks890</h3>
        <svg className="github-icon">
          <use href="#github-icon" />
        </svg>
      </a>
      <Icons />
    </footer>
  );
}
