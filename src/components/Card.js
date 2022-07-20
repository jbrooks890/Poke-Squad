import { typeColors } from "../services/utility";
import { ReactComponent as Arrow } from "../assets/icons/poke-arrow.svg";

export default function Card({ data, arrowClick }) {
  const { name, id, pic, type } = data;

  return (
    <div className="card">
      <div className="cycle prev" onClick={() => arrowClick(-1)}>
        <Arrow />
      </div>
      <div className="cycle next" onClick={() => arrowClick(1)}>
        <Arrow />
      </div>
      <div className="card-main">
        <img className="poke-pic" src={pic} alt={`${name} sprite`} />
        <h1 className="poke-name" data-order={id}>
          {name}
        </h1>
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
      </div>
    </div>
  );
}
