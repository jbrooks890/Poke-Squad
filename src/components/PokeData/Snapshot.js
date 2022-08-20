import Type from "./Type";

export default function Snapshot({ name, id, pic, type }) {
  return (
    <div id="poke-snapshot">
      <img id="poke-pic" src={pic} />
      <div id="poke-title">
        <h2 id="poke-name">{name}</h2>
        <h3 id="poke-id">{`#${id}`}</h3>
      </div>
      <Type type={type} />
    </div>
  );
}
