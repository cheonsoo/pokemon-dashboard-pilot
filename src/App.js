import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./styles.css";

import PokemonList from "./components/organisms/pokemonList";

const queryClient = new QueryClient({
  suspense: true
});

const Spinner = () => {
  let windowHeight =
    window.document.body.getBoundingClientRect().height -
    window.screen.availHeight +
    111;
  if (!windowHeight) windowHeight = "1000";

  return (
    <div
      style={{
        width: "100%",
        height: windowHeight + "px",
        // height: window.document.body.clientHeight + "px",
        // height: "100%",
        display: "flex",
        postion: "absolute",
        top: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eeeeee",
        fontWeight: "900",
        fontSize: "80px",
        color: "gray"
      }}
    >
      Loading ...
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen />
            <PokemonList />
          </QueryClientProvider>
        </React.StrictMode>
      </Suspense>
    </div>
  );
}

export default App;
