import Logo from "../components/Logo";
import { useContext } from "react";
import { PokemonContext } from "../components/PokemonContextProvider";
import Scroll from "../components/Scroll";

const PokemonList = () => {
  const { pokemonList } = useContext(PokemonContext);

  return (
    <>
      <div>
        <Logo />
        <div className="bg-white container-full md:container mx-auto rounded-lg px-8 flex shadow-sm">
          <input
            className="flex-grow outline-none text-xl p-2"
            id="search"
            autoComplete="off"
            autofill="false"
            type="text"
            placeholder="Search..."
          />
          <div className="flex-shrink-0">
            <img
              width="40px"
              height="40px"
              className="p-2 w-10 h-10"
              src="search-icon.svg"
              alt="search"
              loading="eager"
            />
          </div>
        </div>
      </div>
      <Scroll pokemonList={pokemonList}></Scroll>
    </>
  );
};

export default PokemonList;