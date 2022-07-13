import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import PokemonDetail from "../pokemonDetail";
import { getPokemonListWithDetail } from "../../../api/";

const pageSize = 20;
let TIMER;

const listContainer = css({
  padding: "200px",
  backgroundColor: "red"
});

const PokemonList = () => {
  const [page, setPage] = useState(0);
  const [selectedName, setSelectedName] = useState("");
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const { data = [], isLoading, isFetching, error } = useQuery(
    ["get-pokemon-list", 1],
    getPokemonListWithDetail,
    {
      refetch: false
    }
  );

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (!TIMER) {
        TIMER = setTimeout(() => {
          TIMER = null;
          const windowHeight =
            window.document.body.getBoundingClientRect().height -
            window.screen.availHeight +
            111;
          const poz = window.scrollY;
          console.log(`windowHeight: ${windowHeight}, poz: ${poz}`);

          if (poz === 0) {
            console.log("hit top");
          } else if (poz > windowHeight) {
            console.log("hit bottom");
          }
        }, 500);
      }
    });
  }, []);

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

  return (
    <div>
      <div>
        Count: {pageSize * page} / {data.count}
      </div>
      <div css={listContainer}>
        <ul style={{ listStyle: "none", width: "500px" }}>
          {data.map((item, idx) => (
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
                {item.id}, {item.name}, {item.height}, {item.weight}
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
