import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemon = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}${name}`);
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return {
      result: null,
      message: `No result for ${
        typeof name === string ? name : ("id #", name)
      }`,
    };
  }
};

export {getPokemon};
