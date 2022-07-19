export default function Search(props) {
  return (
    <div>
      <form id="pokeSearch" onSubmit={props.onSubmit}>
        <input id="search-input" placeholder="Name or #"></input>
        <button>Get</button>
      </form>
    </div>
  );
}
