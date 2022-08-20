import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About";
import Data from "../pages/Data";
import NotFound from "../pages/NotFound";
import Scout from "../pages/Scout";
import UserProfile from "../pages/UserProfile";
import { getPokemon, initData, count } from "../services/utility";
import AddTeamForm from "./AddTeamForm";
import Modal from "./Modal";
import Team from "./Team";

export default function Main() {
  const [team, setTeam] = useState([]); //array of Pokemon objects
  const [allTeams, setAllTeams] = useState([]);
  const [candidate, setCandidate] = useState({}); //result of pokemon api call
  const [dataView, setDataView] = useState(false);

  useEffect(async () => {
    const pokemon = await initData();
    // console.log(pokemon.data);
    setCandidate(pokemon);
  }, []);

  useEffect(
    () =>
      console.log(
        "Team:",
        team.map((pokemon) => pokemon.name)
      ),
    [team]
  );

  const searchPokemon = async (e, _query) => {
    e && e.preventDefault();
    let input = document.querySelector("#search-input");
    let query = _query ? _query : input.value.trim().toLowerCase();
    const response = await getPokemon(query);
    input.value = "";
    setCandidate(response);
  };
  //   console.log({ count });

  const scrubCandidate = (dir) => {
    if (candidate.id + dir <= 0) {
      searchPokemon(undefined, count);
    } else if (candidate.id + dir > count) {
      searchPokemon(undefined, 1);
    } else {
      searchPokemon(undefined, candidate.id + dir);
    }
  };

  const modifyTeam = (e) => {
    if (team.length < 6 && !currentMember(candidate.id)) {
      console.log(`%cAdded ${candidate.name} to the team!`, "color: lime");
      setTeam((currTeam) => [...currTeam, candidate]);
    } else {
      console.log(
        `%c${candidate.name} is already on your team!`,
        "color: orange"
      );
      let target = team.indexOf(
        team.filter((member) => member.id === candidate.id)[0]
      );
      console.log({ target });
      //   let modified = [...team].splice(target, 1);
      let modified = [...team];
      let test = modified.splice(target, 1);
      //   console.log("%cModified team:", "color: red", modified);

      setTeam(() => modified);
    }
  };

  const promptUser = async (prompt, options = ["yes", "no"]) => {};

  const currentMember = (id) => {
    // console.log({ id });
    return team.map((member) => member.id).includes(id);
  };

  const selectPokemon = (index) => {
    console.log(team[index]);
    setCandidate(team[index]);
  };

  const addNewTeam = () => {
    if (team.length > 0) {
      setAllTeams((prevTeams) => [...prevTeams, team]);
      setTeam(() => []);
    }
  };

  return (
    <main>
      <Modal component={<AddTeamForm />} />
      <Team
        data={team}
        onClick={selectPokemon}
        className={team.length === 6 ? "full" : null}
        saveTeam={addNewTeam}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Scout
              candidate={candidate}
              scrubCandidate={scrubCandidate}
              searchPokemon={searchPokemon}
              modifyTeam={modifyTeam}
              btnClass={
                candidate.id && !currentMember(candidate.id) ? null : "current"
              }
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile roster={allTeams} />} />
        <Route path="/data" element={<Data />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
