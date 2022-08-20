export default function Ability({ ability }) {
  const printAbilities = () => {
    const abilities = [];

    ability.map((entry, i) => {
      const { name, short } = entry;
      abilities.push(
        <details key={i} className="ability">
          <summary>{name}</summary>
          <p>{short}</p>
        </details>
      );
    });

    return abilities;
  };

  return (
    <div id="poke-ability">
      <h3>{ability.length > 1 ? "Abilities" : "Ability"}</h3>
      {printAbilities()}
    </div>
  );
}
