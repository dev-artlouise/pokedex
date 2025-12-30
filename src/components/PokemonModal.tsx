import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import type { PokemonDetails } from "../types/pokemon";
import { usePokemonSpecies } from "../hooks/usePokemonSpecies";
import { typeColors } from "../utils/typeColors";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonDetails | null;
}

const PokemonModal = ({ isOpen, onClose, pokemon }: PokemonModalProps) => {
  if (!pokemon) return null;

  const { id, name, sprites, types, height, weight } = pokemon;

  const { data, isLoading, isError } = usePokemonSpecies(id);

  if (isLoading) return <div className="border p-4">Loading...</div>;

  if (isError || !data) return <div className="border p-4">Failed to load</div>;

  //data from pokemon species
  const { flavor_text_entries, pokedex_numbers, genera } = data;

  //get national dex entry
  const pokedexEntry = pokedex_numbers.find(
    (entry) => entry.pokedex.name === "national"
  )?.entry_number;

  //get english genus
  const englishGenus = genera.find(
    (genus) => genus.language.name === "en"
  )?.genus;

  //get english and latest version flavor text
  const textFlavor = flavor_text_entries.find(
    (flavor) =>
      flavor.version.name === "shield" && flavor.language.name === "en"
  )?.flavor_text;

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        onClose={onClose}
        className="relative z-10 focus:outline-none"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-scale-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle className="text-2xl font-bold capitalize">
                {pokedexEntry}. {name}
              </DialogTitle>

              <img
                className="mx-auto my-4"
                src={sprites?.other["official-artwork"].front_default}
                alt={name}
              />

              <div className="flex items-center justify-between my-4">
                <p className="mt-2">
                  Height: {height} | Weight: {weight}
                </p>

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

              <Description as="h3" className={"text-base/7 font-medium"}>
                {englishGenus}
              </Description>

              <p>{textFlavor}</p>
              <div className="flex items-center justify-end gap-4">
                {/* {/* <button onClick={() => setIsOpen(false)}>Cancel</button> */}
                <button
                  className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PokemonModal;
