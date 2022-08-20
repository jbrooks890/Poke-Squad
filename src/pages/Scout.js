import Card from "../components/Card";
import Search from "../components/Search";
import { ReactComponent as Pokeball } from "../assets/icons/pokeball-2.svg";
import Data from "./Data";

export default function Scout({
  candidate,
  scrubCandidate,
  searchPokemon,
  modifyTeam,
  btnClass,
}) {
  return (
    <div id="scoutPage">
      <Search onSubmit={(e) => searchPokemon(e)} />
      {candidate.name && <Card data={candidate} arrowClick={scrubCandidate} />}
      <button
        id="add-to-team"
        onClick={(e) => modifyTeam(e)}
        className={btnClass}
      >
        <Pokeball className="submit-icon" />
      </button>
      {candidate.name && <Data candidate={candidate} />}
    </div>
  );
}
