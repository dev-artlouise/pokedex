import { useQuery } from "@tanstack/react-query";
import type { PokemonSpecies } from "../types/pokemon";
import { fetchPokemonSpecies } from "../api/pokemonApi";

export const usePokemonSpecies = (id: number) => {
  return useQuery<PokemonSpecies>({
    queryKey: ["pokemon-species", id],
    queryFn: () => fetchPokemonSpecies(id),
    // keepPreviousData: true,
    enabled: !!id,
  });
};
