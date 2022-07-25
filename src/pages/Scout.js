import Card from "../components/Card";
import Search from "../components/Search";
import { ReactComponent as Pokeball } from "../assets/icons/pokeball-2.svg";

export default function Scout({
  candidate,
  scrubCandidate,
  searchPokemon,
  modifyTeam,
  btnClass,
}) {
  return (
    <section id="scoutPage">
      <Search onSubmit={(e) => searchPokemon(e)} />
      {candidate.name && <Card data={candidate} arrowClick={scrubCandidate} />}
      <button
        id="add-to-team"
        onClick={(e) => modifyTeam(e)}
        className={btnClass}
      >
        {/* {candidate.id && !currentMember(candidate.id) ? "Add" : "Remove"} */}
        <Pokeball className="submit-icon" />
      </button>
    </section>
  );
}
