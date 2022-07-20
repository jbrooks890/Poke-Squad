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
      name: species.data.names.filter((name) => name.language.name === "en")[0]
        .name,
      sprite: response.data.sprites.front_default,
      order: master.order,
      pic: response.data.sprites.other["official-artwork"].front_default,
      type: master.types,
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

const typeColors = {
  normal: "#A8A77A",
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

export { getPokemon, initData, count, typeColors };
