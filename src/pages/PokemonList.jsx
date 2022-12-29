import Logo from "../components/Logo";
import { useContext } from "react";
import { PokemonContext } from "../components/PokemonContextProvider";
import Scroll from "../components/Scroll";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const PokemonList = () => {
  const { pokemonList } = useContext(PokemonContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchResults, setSearchResults] = useState(pokemonList);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (pokemonList.length === 0) {
      navigate(
        "/" +
          (searchParams.toString().length ? "?" : "") +
          searchParams.toString()
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log("scrolled");
  // }, [isScrolled]);

  const search = (e) => {
    let search = e.target.value;
    if (search.length > 2) {
      setSearchParams({ search: search });
      setSearchResults(
        pokemonList.filter((pokemon) => pokemon.name.match(search))
      );
    } else {
      setSearchResults(pokemonList);
      setSearchParams({});
    }
  };

  return (
    <>
      <div className={`${isScrolled && "scrolled"}`}>
        <Logo />
        <div className="bg-white container-full md:container mx-auto rounded-lg px-8 flex shadow-sm">
          <input
            className="flex-grow outline-none text-xl p-2"
            id="search"
            autoComplete="off"
            autofill="false"
            type="text"
            placeholder="Search..."
            onChange={search}
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
      <Scroll pokemonList={searchResults} setScrolled={setIsScrolled} />
    </>
  );
};

export default PokemonList;
