import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { typeColors } from "../utils/typeColors";

interface PokemonCardProps {
  pokemon: { name: string };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { data, isLoading, isError } = usePokemonDetails(pokemon);

  if (isLoading) return <div className="border p-4">Loading...</div>;

  if (isError || !data) return <div className="border p-4">Failed to load</div>;

  const { name, sprites, types } = data;

  return (
    <div className="border rounded-lg p-4 text-center hover:shadow-lg hover:scale-105 transition-transform duration-200">
      <img
        src={sprites.front_default}
        alt={`${name}-sprite`}
        className="mx-auto w-24 h-24"
      />
      <h2 className="capitalize font-semibold mt-2">{name}</h2>
      <div className="mt-2 flex justify-center gap-2 flex-wrap">
        {types.map(({ type }) => (
          <span
            key={type.name}
            className={`px-2 py-1 text-xs rounded-full text-white ${
              typeColors[type.name]
            }`}
          >
            {type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
