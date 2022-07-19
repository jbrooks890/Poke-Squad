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

  const searchPokemon = async (e) => {
    e.preventDefault();
    const query = document
      .querySelector("#search-input")
      .value.trim()
      .toLowerCase();
    const response = await getPokemon(query);
    setCandidate(response);
  };
  //   console.log({ count });

  const modifyTeam = (e) => {
    // e.preventDefault();

    if (team.length <= 6 && !currentMember(candidate.id)) {
      console.log(`%cAdded ${candidate.name} to the team!`, "color: lime");
      setTeam((currTeam) => [...currTeam, candidate]);
    } else {
      console.log(
        `%c${candidate.name} is already on your team!`,
        "color: orange"
      );
    }
  };

  const currentMember = (id) => {
    console.log({ id });
    return team.map((member) => member.id).includes(id);
  };

  console.log("candidate", candidate);
  candidate.species && console.log(candidate.name);
  console.log("Team", team);

  return (
    <main>
      <Team data={team} />
      <Search onSubmit={(e) => searchPokemon(e)} />
      {candidate.name && <Card data={candidate} />}
      <button id="add-to-team" onClick={(e) => modifyTeam(e)}>
        {candidate.id && !currentMember(candidate.id) ? "Add" : "Remove"}
      </button>
    </main>
  );
}
