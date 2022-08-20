export default function Dimensions({ height, weight }) {
  const calcHeight = (decimeters) => {
    const conversion = Math.round(decimeters * 3.93701);
    const feet = Math.floor(conversion / 12);
    const inches = Math.ceil(conversion % 12);
    // console.log({ conversion });

    return `${feet}' ${inches}"`;
  };

  const calcWeight = (hectograms) => {
    const conversion = hectograms * 0.220462;
    // console.log({ hectograms, conversion });
    return `${conversion.toFixed(1)} lbs`;
  };

  return (
    <div id="poke-dimensions">
      <h3 id="poke-height" className="section-label" data-label="height">
        {calcHeight(height)}
      </h3>
      <h3 id="poke-weight" className="section-label" data-label="weight">
        {calcWeight(weight)}
      </h3>
    </div>
  );
}
