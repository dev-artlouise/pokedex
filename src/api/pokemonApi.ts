import axios from "axios";

import type { PokemonListResponse, PokemonDetails } from "../types/pokemon"; //include type for compile time not in JS Bundle

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const fetchPokemonList = async (
  page: number
): Promise<PokemonListResponse> => {
  const limit = 20;
  const offset = page * limit;
  const { data } = await api.get<PokemonListResponse>(
    `pokemon?limit=${limit}&offset=${offset}`
  );

  console.log("pokemon data", data);

  return data;
};

export const fetchPokemonDetails = async (
  name: string
): Promise<PokemonDetails> => {
  const { data } = await api.get<PokemonDetails>(`/pokemon/${name}`);
  console.log("pokemon details", data);
  return data;
};
