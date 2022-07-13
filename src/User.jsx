import React from "react";
import { useQueryClient } from "react-query";
import { getList } from "./store";

const User = () => {
  const { data } = getList();
  // const queryClient = useQueryClient();
  // const list = queryClient.getQueryData("get-list");
  return (
    <div>
      <ul>{data && data.map((item, idx) => <li key={idx}>{item.name}</li>)}</ul>
    </div>
  );
};

export default User;
