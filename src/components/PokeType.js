import { typeColors } from "../services/utility";

export default function PokeType({ type }) {
  console.log(type);
  return (
    <ul className="poke-type">
      {type.map((each, i) => {
        const _type = each.type.name;
        return (
          <li key={i} style={{ backgroundColor: typeColors[_type] }}>
            {_type[0].toUpperCase() + _type.slice(1)}
          </li>
        );
      })}
    </ul>
  );
}
