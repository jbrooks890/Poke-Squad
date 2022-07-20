export default function Team({ data, onClick }) {
  const names = data.map((pokemon) => pokemon.name);
  const sprites = data.map((pokemon) => pokemon.sprite);

  //   names.length > 0 && console.log("Names:", names);
  const popTeamCache = () => {
    let cache = [];
    for (let i = 0; i < 6; i++) {
      cache.push(
        <li
          key={i}
          id={`slot-${i + 1}`}
          data-occupant={data[i] && names[i]}
          onClick={
            data[i] &&
            ((e) => {
              //   console.log(e.currentTarget);
              document
                .querySelectorAll("#team-cache li")
                .forEach((item) => item.classList.remove("selected"));
              e.currentTarget.classList.toggle("selected");
              onClick(i);
            })
          }
        >
          {data[i] && (
            <img
              className="cache-sprite"
              src={sprites[i]}
              alt={`${names[i]} sprite`}
            />
          )}
        </li>
      );
    }
    return cache;
  };

  return <ul id="team-cache">{popTeamCache()}</ul>;
}
