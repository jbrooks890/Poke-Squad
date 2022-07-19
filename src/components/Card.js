export default function Card({ data }) {
  const name = data.names.filter((name) => name.language.name === "en")[0].name;
  const sprite = data.sprites.front_default;
  const pic = data.sprites.other["official-artwork"].front_default;
  const order = data.order;

  return (
    <div className="card">
      <img src={pic} alt={`${name} sprite`} />
      <h1>{name}</h1>
      <h2>{order}</h2>
      <ul></ul>
    </div>
  );
}
