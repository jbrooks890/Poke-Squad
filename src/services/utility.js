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
  console.log(`%c${query}`, "color: orange");

  try {
    const response = await axios.get(`${BASE_URL}pokemon/${query}`);
    const species = await axios.get(response.data.species.url);

    console.log("%cTest", "color: red");
    // console.log(species.data.names[8].name);
    // species.data.names.forEach((name) => console.log(name.language));
    console.log(
      species.data.names.filter((name) => name.language.name === "en")[0].name
    );

    return {
      ...response.data,
      ...species.data,
      name: species.data.names.filter((name) => name.language.name === "en")[0]
        .name,
    };
  } catch (err) {
    console.log(err);
    return {
      result: null,
      message: `No result for ${
        typeof query === string ? query : ("id #", query)
      }`,
    };
  }
};

export { getPokemon, initData, count };
