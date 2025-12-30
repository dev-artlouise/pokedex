import { useState } from "react";
import PokemonCard from "./components/PokemonCard";
import { usePokemonList } from "./hooks/usePokemonList";

function App() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = usePokemonList(page);

  if (isLoading) return <div className="p-4">loading ...</div>;
  if (isError) return <div className="p-4">Error loading Pokemon</div>;

  return (
    <>
      <main className="min-h-screen px-6 py-8 container mx-auto ">
        <h1 className="text-3xl font-bold mb-6">Pokedex</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {data?.results.map(({ name }) => (
            <PokemonCard key={name} pokemon={name} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-start mt-6 gap-6">
          {page !== 0 && (
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </button>
          )}

          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
