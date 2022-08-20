import Ability from "./Ability";
import Dimensions from "./Dimensions";
import Stats from "./Stats";

export default function Caption({
  weight,
  height,
  desc,
  category,
  ability,
  stats,
}) {
  //   console.log(desc);
  return (
    <section id="poke-caption" data-section-title="Dex">
      <div id="poke-desc" className="section-label" data-label="description">
        <h3 id="poke-category">{category}</h3>
        <p id="poke-desc-body">
          {desc[Math.floor(Math.random() * desc.length)].flavor_text}
        </p>
      </div>
      <Dimensions weight={weight} height={height} />
      <Ability ability={ability} />
    </section>
  );
}
