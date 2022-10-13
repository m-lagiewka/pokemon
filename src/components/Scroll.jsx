import { useState, useEffect, useRef } from "react";
import PokemonCards from "./Pokemon-cards";
import { useNavigate } from "react-router-dom";

const Scroll = ({ pokemonList }) => {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [pokemons, setPokemons] = useState([]); // storing list
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list
  const navigate = useNavigate();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // This will be triggered after hitting the last element.
        // API call should be made here while implementing pagination.
        setCurrPage(currPage + 1);
        navigate("/pokemon-list?page=" + currPage);
      }
    }
  };

  useEffect(() => {
    const fetchData = () => {
      const start = currPage * 20;
      const end = start + 20;
      const list = pokemonList.slice(start, end) || [];
      if (!list.length) {
        setWasLastList(true);
        return;
      }
      setPrevPage(currPage);
      setPokemons([...pokemons, ...list]);
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, pokemons]);

  return (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      className="overflow-y-scroll"
      style={{ height: "400px" }}
    >
      <PokemonCards pokemons={pokemons} />
    </div>
  );
};

export default Scroll;
