import React, { useState, useCallback } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import PokemonDetail from "../pokemonDetail";

const pageSize = 20;

const PokemonList = () => {
  const [page, setPage] = useState(0);
  const [selectedName, setSelectedName] = useState("");
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const { data = { results: [] }, isLoading, isFetching, error } = useQuery(
    ["get-pokemon-list", 1],
    () => {
      const url = "https://pokeapi.co/api/v2/pokemon";
      return axios.get(url).then((res) => {
        setPage(page + 1);
        return res.data;
      });
    },
    {
      refetch: false
    }
  );

  if (isLoading) {
    console.log("loading ...");
  }
  if (isFetching) {
    console.log("fetching ...");
  }
  if (error) {
    console.log("error ...");
  }

  const handleClick = (name) => {
    setSelectedName(name);
    setOpenDetailModal(!openDetailModal);
  };

  const handleClose = useCallback(() => {
    setOpenDetailModal(false);
  }, []);

  const listContainer = css({
    padding: "200px",
    backgroundColor: "red"
  });

  return (
    <div>
      <div>
        Count: {pageSize * page} / {data.count}
      </div>
      <div css={listContainer}>
        <ul style={{ listStyle: "none", width: "500px" }}>
          {data.results.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleClick(item.name)}
              style={{
                width: "200px",
                height: "50px",
                backgroundColor: "#eeeeee",
                marginBottom: "10px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900",
                  cursor: "pointer"
                }}
              >
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {openDetailModal && (
        <PokemonDetail
          open={openDetailModal}
          name={selectedName}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default PokemonList;
