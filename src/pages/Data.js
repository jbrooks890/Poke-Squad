import { useState, useEffect } from "react";
import DataNav from "../components/DataNav";
import Caption from "../components/PokeData/Caption";
import Dimensions from "../components/PokeData/Dimensions";
import Evolution from "../components/PokeData/Evolution";
import Moves from "../components/PokeData/Moves";
import Snapshot from "../components/PokeData/Snapshot";
import Stats from "../components/PokeData/Stats";
import { getAbilities, getEvolution, getMoves } from "../services/utility";

export default function Data({ candidate }) {
  // const [dataLoaded, setDataLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [fullData, setFullData] = useState({
    abilities: [],
    evolution: [],
    moves: [],
    loaded: false,
  });
  const { id, name, pic, type, flavor_text, category } = candidate;
  const {
    name: qName,
    weight,
    height,
    stats,
    abilities,
    evolution_chain,
    moves,
  } = candidate.master;

  // useEffect(()=> setDataLoaded(false),[candidate])
  // console.log({ dataLoaded });

  useEffect(async () => {
    console.log(candidate);
    const _abilities = await getAbilities(
      abilities.map((entry) => entry.ability.url)
    );
    const _evoluton = await getEvolution(evolution_chain.url, qName, candidate);
    // const _moves = await getMoves(moves.map((entry) => entry.move.url));

    setFullData((prev) => ({
      ...prev,
      abilities: _abilities,
      evolution: _evoluton,
      loaded: true,
    }));
    // setDataLoaded(true);
    changeSections(activeSection);
  }, [candidate]);

  const sections = new Map([
    [
      "Dex",
      <Caption
        key="dex"
        weight={weight}
        height={height}
        desc={flavor_text}
        category={category}
        ability={fullData.abilities}
        stats={stats}
      />,
    ],
    ["Stats", <Stats key="stats" stats={stats} />],
    [
      "Evolution",
      <Evolution
        key="evolution"
        evolution={fullData.evolution}
        snapshot={false}
      />,
    ],
    ["Moves", <Moves key="moves" moves={fullData.moves} />],
  ]);

  const changeSections = (index) => {
    // console.log("document", document);
    // console.log({ index });
    const current = document.querySelector("#poke-data-frame section.active");
    current && current.classList.remove("active");
    let newSection = document.querySelectorAll("#poke-data-frame section")[
      index
    ];
    newSection.classList.add("active");
    // console.log(document.querySelectorAll("#poke-data-frame section"));
    setActiveSection(index);
  };

  //   console.log("active section:", navSections[activeSection]);

  const getNavSections = () => {
    const navSections = Array.from(
      document.querySelectorAll("#poke-data-frame section")
    ).map((section) => section.getAttribute("data-section-title"));
    // console.log(navSections);
  };

  //   console.log("sections::", [...sections.keys()]);

  return (
    <div id="poke-data">
      <div id="poke-data-main" className="data-section-wrap">
        <Snapshot name={name} id={id} pic={pic} type={type} />
      </div>
      <div id="poke-data-section" className="data-section-wrap">
        {fullData.loaded && (
          <DataNav sections={[...sections.keys()]} onClick={changeSections} />
        )}
        <div id="poke-data-frame">
          {fullData.loaded && [...sections.values()]}
        </div>
      </div>
    </div>
  );
}
