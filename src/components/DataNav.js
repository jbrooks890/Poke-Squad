export default function DataNav({ sections, onClick }) {
  //   console.log("sections:", sections);

  const popNav = () => {
    return sections.map((section, i) => (
      <li key={i} onClick={() => onClick(i)}>
        {section}
      </li>
    ));
  };

  return (
    <nav id="data-nav">
      <ul>{popNav()}</ul>
    </nav>
  );
}
