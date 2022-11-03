import Logo from "../components/Logo";
import { useContext } from "react";
import { PokemonContext } from "../components/PokemonContextProvider";
import Scroll from "../components/Scroll";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const PokemonList = () => {
  const { pokemonList } = useContext(PokemonContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (pokemonList.length === 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("scrolled");
  }, [isScrolled]);

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
      <Scroll pokemonList={pokemonList} setScrolled={setIsScrolled} />
    </>
  );
};

export default PokemonList;
