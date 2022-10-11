import { useCallback, useContext } from "react";
import { useEffect, useState } from "react";
import { getPokemons } from "../api/getPokemonList";
import Logo from "./Logo";
import { PokemonContext } from "./PokemonContextProvider";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState({ width: "0%" });
  const { pokemonList, setPokemonList, counter, setCounter } =
    useContext(PokemonContext);

  const fetchPokemon = async () => {
    const data = await getPokemons(1);
    setCounter(data.count);
    return data;
  };

  const fetchPokemonParallel = useCallback(
    async (limit, offset) => {
      const data = await getPokemons(limit, offset);
      setPokemonList((prevState) => [...prevState, ...data.results]);
    },
    [setPokemonList]
  );

  const dowhile = useCallback(
    async (counter) => {
      let limit = 20;
      let offset = 0;
      do {
        await fetchPokemonParallel(limit, offset);
        offset += limit;
      } while (offset < counter);
    },
    [fetchPokemonParallel]
  );

  useEffect(() => {
    if (pokemonList.length < counter) {
      dowhile(counter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  useEffect(() => {
    fetchPokemon();
    // return () => {
    //   setWidth({ width: 0 });
    //   // setPokemonList([]);
    //   // setCounter(0);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setWidth({
      width: Math.round((pokemonList.length / counter) * 100) + "%",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonList]);

  useEffect(() => {
    if (width.width === "100%") {
      setTimeout(() => navigate("/pokemon-list"), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div className="fixed z-50 left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center bg-white">
      <Logo />
      <div className="w-64 h-2 bg-slate-900 rounded">
        <div className="h-2 rounded bg-red-500" style={width}></div>
      </div>
    </div>
  );
};

export default Loader;
