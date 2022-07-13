import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./styles.css";

import PokemonList from "./components/organisms/pokemonList";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />
        <PokemonList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
