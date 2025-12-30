import { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import type { PokemonDetails } from "./types/pokemon";
import { usePokemonList } from "./hooks/usePokemonList";

function App() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = usePokemonList(page);

  if (isLoading) return <div>loading ...</div>;
  if (isError) return <div>Error loading Pokemon</div>;

  return (
    <>
      <main className="min-h-screen px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Pokedex</h1>
        {data?.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </main>
    </>
  );
}

export default App;
