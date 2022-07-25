export default function Search(props) {
  return (
    <div>
      <form id="pokeSearch" onSubmit={props.onSubmit}>
        <input id="search-input" placeholder="Search Name or ID"></input>
        <button>
          <svg>
            <use href="#pokeball-2-icon" />
          </svg>
        </button>
      </form>
    </div>
  );
}
