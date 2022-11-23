import { useState, useEffect, useRef } from "react";
import PokemonCards from "./Pokemon-cards";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const Scroll = ({ pokemonList, setScrolled }) => {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(); // storing current page number
  const [pokemons, setPokemons] = useState([]); // storing list
  const [pageIndex, setPageIndex] = useState(new Set());
  const [viewedPages, setViewedPages] = useState(new Set());
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [throttleTO, setThrottleTO] = useState(null);

  const fetchData = () => {
    const start = (currPage - 1) * 20;
    const end = start + 20;
    const list = pokemonList.slice(start, end) || [];
    setPokemons([...pokemons, ...list]);
    setViewedPages(viewedPages.add(currPage));
  };

  useEffect(() => {
    setViewedPages(new Set());
  }, [pokemonList]);

  useEffect(() => {
    if (viewedPages.size === 0) {
      setPokemons([]);
    }
  }, [viewedPages]);

  useEffect(() => {
    if (pokemons.length === 0) {
      setCurrPage(0);
    }
  }, [pokemons]);

  useEffect(() => {
    if (currPage < 1) {
      setCurrPage(1);
    } else {
      if (!viewedPages.has(currPage)) {
        console.log(currPage, viewedPages.has(currPage));
        fetchData();
      }
    }
  }, [currPage]);

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
        setLink(currPage + 1);
        setPageIndex(pageIndex.add(scrollTop));
      } else if (index > -1 && currPage > 0) {
        setLink(index + 1);
      }

      if (scrollTop !== 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  };

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
