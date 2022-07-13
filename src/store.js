import axios from "axios";
import { useQuery } from "react-query";

export const getList = () => {
  return useQuery(["get-list"], () => {
    const url = "https://pokeapi.co/api/v2/ability/?limit=20&offset=20";
    return axios.get(url).then((res) => {
      console.log(res.data.results);
      return res.data.results;
    });
  });
};
