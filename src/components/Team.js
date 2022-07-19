export default function Team({ data }) {
  const names = data.map((pokemon) => pokemon.name);

  console.log("Names:", names);

  return (
    <ul id="team-cache">
      <li id="slot-1" data-occupant={data[0] && names[0]}></li>
      <li id="slot-2" data-occupant={data[1] && names[1]}></li>
      <li id="slot-3" data-occupant={data[2] && names[2]}></li>
      <li id="slot-4" data-occupant={data[3] && names[3]}></li>
      <li id="slot-5" data-occupant={data[4] && names[4]}></li>
      <li id="slot-6" data-occupant={data[5] && names[5]}></li>
    </ul>
  );
}
