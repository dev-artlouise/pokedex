import { useQuery } from "@tanstack/react-query";
import type { PokemonDetails } from "../types/pokemon";
import { fetchPokemonDetails } from "../api/pokemonApi";

export const usePokemonDetails = (name: string) => {
  return useQuery<PokemonDetails>({
    queryKey: ["pokemon-details", name],
    queryFn: () => fetchPokemonDetails(name),
    // keepPreviousData: true,
    enabled: !!name,
  });
};
