import { usePokemonDetails } from "../hooks/usePokemonDetails";

interface PokemonCardProps {
  pokemon: { name: string };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { data, isLoading, isError } = usePokemonDetails(pokemon.name);

  if (isLoading) {
    return <div className="border p-4">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="border p-4">Failed to load</div>;
  }

  const { name, sprites } = data;

  return (
    <div className="border rounded-lg p-4 text-center">
      <img src={sprites.front_default} alt={`${name}-sprite`} />
      <h2 className="capitalize font-semibold mt-2">{name}</h2>
    </div>
  );
};

export default PokemonCard;
