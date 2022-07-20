import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getPokemon, initData, count } from "../services/utility";
import Card from "./Card";
import Search from "./Search";
import Team from "./Team";

export default function Main() {
  const [team, setTeam] = useState([]); //array of Pokemon objects
  const [candidate, setCandidate] = useState({}); //result of pokemon api call

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
    }
  };

  const promptUser = async (prompt, options = ["yes", "no"]) => {};

  const currentMember = (id) => {
    // console.log({ id });
    return team.map((member) => member.id).includes(id);
  };

  const selectPokemon = (index) => {
    setCandidate(team[index]);
  };

  return (
    <main>
      <Team data={team} onClick={selectPokemon} />
      <Search onSubmit={(e) => searchPokemon(e)} />
      {candidate.name && <Card data={candidate} arrowClick={scrubCandidate} />}
      <button id="add-to-team" onClick={(e) => modifyTeam(e)}>
        {candidate.id && !currentMember(candidate.id) ? "Add" : "Remove"}
      </button>
    </main>
  );
}
