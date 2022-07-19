import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

export default function Main() {
  const [team, setTeam] = useState({}); //array of Pokemon objects
  const [candidate, setCandidate] = useState({}); //result of pokemon api call

  return <main></main>;
}
