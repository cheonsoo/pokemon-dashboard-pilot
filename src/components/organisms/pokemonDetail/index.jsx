import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { css } from "@emotion/react";
import Modal from "../../atoms/modal";

const usePrevious = (val) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref.current;
};

const classNameOutOfRender = css`
  color: yellow;
  background-color: red;
`;

const PokemonDetail = ({ name = "" }) => {
  console.log("### name: ", name);
  const prevName = usePrevious(name);

  const { data, status } = useQuery(["get-pokemon-detail", name], () => {
    if (!name) return {};
    console.log(`prev: ${prevName}, name: ${name}`);
    if (name === prevName) return data;

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    console.log("url", url);
    return axios.get(url).then((res) => {
      console.log(res.data);
      return res.data;
    });
  });

  if (status === "loading") console.log("loading ...");
  if (status === "error") console.log("error");
  if (status === "success") console.log("success");

  return (
    <div css={classNameOutOfRender}>
      {data && (
        <ul style={{ listStyle: "none" }}>
          <li style={{ height: "50px", marginBottom: "5px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div style={{ width: "100px" }}>Order</div>
              <div>{data.order}</div>
            </div>
          </li>
          <li>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100px" }}>ID</div>
              <div>{data.id}</div>
            </div>
          </li>
          <li>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100px" }}>Name</div>
              <div>{data.name}</div>
            </div>
          </li>
          <li>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100px" }}>Weight</div>
              <div>{data.weight}</div>
            </div>
          </li>
          <li>
            <div style={{ display: "flex" }}>
              <div style={{ width: "100px" }}>Height</div>
              <div>{data.height}</div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default React.memo(Modal(PokemonDetail));
