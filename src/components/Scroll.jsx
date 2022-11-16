import { useState, useEffect, useRef } from "react";
import PokemonCards from "./Pokemon-cards";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const Scroll = ({ pokemonList, setScrolled }) => {
  const listInnerRef = useRef();
  const [viewedPages, setViewedPages] = useState(new Set());
  const [pokemons, setPokemons] = useState([]); // storing list
  const [currPage, setCurrPage] = useState(0); // storing current page number
  const [pageIndex, setPageIndex] = useState(new Set());

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [throttleTO, setThrottleTO] = useState(null);

  const setLink = useCallback(
    (page) => {
      setCurrPage(page);

      if (!throttleTO) {
        setThrottleTO(
          setTimeout(() => {
            setSearchParams({ page: page });
            setThrottleTO(null);
          }, 300)
        );
      }
    },
    [navigate]
  );

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      let index = Array.from(pageIndex).findIndex((v) => v >= scrollTop);

      if (scrollTop + clientHeight > scrollHeight - 10 && index < currPage) {
        // setLink(currPage + 1);
        setPageIndex(pageIndex.add(scrollTop));
      } else if (index > -1 && currPage > 0) {
        // setLink(index + 1);
      }

      if (scrollTop !== 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  };

  const fetchData = (source) => {
    const start = currPage * 20;
    const end = start + 20;
    const list = source.slice(start, end) || [];
    setPokemons([...pokemons, ...list]);
  };

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  useEffect(() => {
    if (!viewedPages.has(currPage)) {
      fetchData(pokemonList);
      setViewedPages(viewedPages.add(currPage));
    }
  }, [currPage]);

  useEffect(() => {
    // console.log(pokemons);
    setViewedPages(new Set());
    setPokemons([]);
    setCurrPage(0);
    // console.log(pokemonList);
  }, [pokemonList]);

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
