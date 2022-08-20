import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";
let count;
// let currIndex;

const initData = async () => {
  const response = await axios.get(`${BASE_URL}pokemon-species/?limit=1`);
  count = response.data.count;
  return getPokemon();
};

const getPokemon = async (_query) => {
  let query = _query ? _query : Math.ceil(Math.random() * count);
  //   console.log(`%c${query}`, "color: orange");

  try {
    const response = await axios.get(`${BASE_URL}pokemon/${query}`);
    const species = await axios.get(response.data.species.url);
    const master = { ...response.data, ...species.data };

    return {
      id: master.id,
      name: species.data.names.find((name) => name.language.name === "en").name,
      sprite: response.data.sprites.front_default,
      order: master.order,
      pic: response.data.sprites.other["official-artwork"].front_default,
      type: master.types,
      flavor_text: master.flavor_text_entries.filter(
        (entry) => entry.language.name === "en"
      ),
      category: master.genera.find((entry) => entry.language.name === "en")
        .genus,
      master: master,
    };
  } catch (err) {
    console.log(err);
    return {
      result: null,
      message: `No result for ${
        typeof query === "string" ? query : ("id #", query)
      }`,
    };
  }
};

const getAbilities = async (links) => {
  const abilities = [];
  // console.log("links", links);

  for (let link of links) {
    const response = await axios.get(link);
    const { names, flavor_text_entries, effect_entries, id } = response.data;

    const ability = {
      name: names.find((entry) => entry.language.name === "en").name,
      id: id,
      flavor_text: flavor_text_entries.filter(
        (entry) => entry.language.name === "en"
      ),
      effect: effect_entries.find((entry) => entry.language.name === "en")
        .effect,
      short: effect_entries.find((entry) => entry.language.name === "en")
        .short_effect,
    };
    // console.log("ability name", ability.name);
    // console.log("ability", ability);
    abilities.push(ability);
  }
  return abilities;
};

// -------- GET EVOLUTION --------
const getEvolution = async (link, name, self) => {
  // console.log("TEST EVOLUTION", link);
  const evolution = [];
  const response = await axios.get(link);
  console.log("evolution data:", response.data);
  const { chain } = response.data;
  // console.log("chain", chain);

  /* const getSources = ({ sources }) => {
    let nextForms = [];
    let nextSources = {
      nextForms: [],
      nextDetails: [],
    };
    // console.log(
    //   `%c${sources.map((target) => target.species.name).join(", ")}`,
    //   "color: lime"
    // );

    return sources
      .map((source) => {
        if (source.evolves_to.length) {
          const { nextForms, nextDetails } = nextSources;
          // nextForms = [...nextForms, ...source.evolves_to];
          nextForms = [...nextForms, ...source.evolves_to];
        }
        return source;
      })
      .concat(nextForms.length ? getSources(nextForms) : nextForms);
  }; */

  const getSources = ({ sources, details = [] }) => {
    // let nextForms = [];
    let nextSources = {
      nextForms: [],
      nextDetails: [],
    };
    // console.log(
    //   `%c${sources.map((target) => target.species.name).join(", ")}`,
    //   "color: lime"
    // );
    const { nextForms, nextDetails } = nextSources;

    let flattenSources = sources
      .map((source) => {
        if (source.evolves_to.length) {
          const { evolves_to, evolution_details } = source;
          // nextForms = [...nextForms, ...source.evolves_to];
          nextForms = [...nextForms, ...evolves_to];
          nextDetails = [...nextDetails, ...evolution_details];
        }
        return source;
      })
      .concat(
        nextForms.length
          ? getSources({ nextForms, nextDetails })
          : { nextForms, nextDetails }
      );

    return flattenSources;
  };
  // console.log(getSources([chain]));
  if (chain.evolves_to.length > 0) {
    for (let form of getSources([chain])) {
      if (form.species.name === name) {
        evolution.push(self);
      } else {
        evolution.push(await getPokemon(form.species.name));
      }
    }
  } else {
    return null;
  }

  const evolveData = {
    forms: evolution,
    chain: chain,
  };

  console.log("EVOLUTION:", evolution);
  // return evolution;
};

// -------- GET MOVES --------
const getMoves = async (links) => {
  // console.log("Move list:", links);
  const list = [];
  for (let link of links) {
    const response = await axios.get(link);
    list.push(response.data);
  }

  console.log(list);
  return list;
};

const typeColors = {
  normal: "#a4acaf",
  //   normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export {
  getPokemon,
  initData,
  count,
  typeColors,
  getAbilities,
  getEvolution,
  getMoves,
};
