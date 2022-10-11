import { useEffect, useState } from "react";
import PokemonPopup from "./Pokemon-popup";

const PokemonCard = ({ name, url }) => {
  const [pokemon, setPokemon] = useState([]);
  const [windowsState, setWindowState] = useState([]);

  function getDetails(url) {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setPokemon(result);
      });
  }

  useEffect(() => {
    getDetails(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      key={pokemon.name}
      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 inline-block p-2"
      id="pokemon-card"
    >
      <button
        className="bg-white shadow rounded relative w-full group"
        onClick={() => {
          setWindowState(
            <PokemonPopup pokemon={pokemon} setState={setWindowState} />
          );
        }}
      >
        <img
          src={pokemon.sprites && pokemon.sprites.front_default}
          className="w-full h-auto block group-hover:hidden"
          alt={name}
          loading="lazy"
          width="400px"
          height="400px"
        />
        <img
          src={pokemon.sprites && pokemon.sprites.front_shiny}
          className="w-full h-auto hidden group-hover:block"
          alt={name + " shiny"}
          loading="lazy"
          width="400px"
          height="400px"
        />

        <div className="absolute bottom-0 left-0 right-0 text-left p-4 bg-opacity-30 bg-neutral-700 text-white rounded-b">
          <h3 className="text-2xl font-bold uppercase">{name}</h3>
          <div className="capitalize"></div>
        </div>
      </button>
      {windowsState}
    </div>
  );
};

export default PokemonCard;
