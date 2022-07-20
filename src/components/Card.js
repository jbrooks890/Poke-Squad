import { typeColors } from "../services/utility";

export default function Card({ data, arrowClick }) {
  const { name, id, pic, type } = data;

  return (
    <div className="card">
      <div className="cycle prev" onClick={() => arrowClick(-1)}>
        &lang;
      </div>
      <div className="cycle next" onClick={() => arrowClick(1)}>
        &rang;
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
