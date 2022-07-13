import axios from "axios";

const delay = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
  return promise;
};

export const getPokemonList = async ({ pageParam = 0 }) => {
  const limit = 20;
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${
    limit * pageParam
  }&limit=${limit}`;
  const res = await axios.get(url);
  const data = res?.data?.results;
  await delay();
  console.log(data);
  return data;
};

export const getPokemonListWithDetail = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon";
  const res = await axios.get(url);
  const data = res?.data?.results;
  for (let i = 0; i < data.length; i++) {
    let current = data[i];
    const res = await axios.get(current.url);
    const detail = res.data;
    current = Object.assign(current, detail);
  }

  return data;
};

export const getPokemonDetail = async (name = "") => {
  console.log("getPokemonDetail");
  if (!name) return {};

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const res = await axios.get(url);
  return res.data;
};
