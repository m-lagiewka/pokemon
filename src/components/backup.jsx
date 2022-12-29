import { useState, useEffect, useRef } from "react";
import PokemonCards from "./Pokemon-cards";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const Scroll = ({ pokemonList, setScrolled }) => {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(); // storing current page number
  const [pokemons, setPokemons] = useState([]); // storing list
  const [viewedPages, setViewedPages] = useState(new Set());
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [throttleTO, setThrottleTO] = useState(null);
  const perPage = 20;
  const [initPage, setInitPage] = useState(searchParams.get("page") || 0);

  const fetchData = (page) => {
    const start = page ? 0 : (currPage - 1) * perPage;
    const end = page ? (page - 1) * perPage + perPage : start + perPage;
    const list = pokemonList.slice(start, end) || [];
    setPokemons([...pokemons, ...list]);
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
    if (initPage > 0) {
      setTimeout(() => {
        scrollTo(parseInt(initPage));
        setTimeout(() => setInitPage(0), 50);
      }, 100);
    }
  }, [pokemons]);

  useEffect(() => {
    if (currPage < 1) {
      setCurrPage(1);
    } else {
      if (!viewedPages.has(currPage)) {
        setTimeout(() => {
          fetchData(searchParams.get("page"));
        }, 10);
      }
    }
  }, [currPage]);

  useEffect(() => {
    if (searchParams.get("page")) {
      // onScroll(searchParams.get("page"));
    }
  }, []);

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

  const scrollTo = (page) => {
    let content = document.getElementById("content");
    if (content && content.childElementCount >= page - 1) {
      setTimeout(() => {
        content.childNodes[page - 1].scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    }
  };

  const onScroll = () => {
    if (listInnerRef.current && initPage === 0) {
      let content = document.getElementById("content");
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      if (
        (scrollTop + clientHeight > scrollHeight - 10 &&
          currPage + 1 >= content.childElementCount) ||
        initPage > 0
      ) {
        setLink(currPage + 1);
      } else if (
        content.children[currPage - 1] &&
        content.children[currPage - 1].getBoundingClientRect().top
      ) {
        debugger;
        setLink(currPage - 1);
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
      <PokemonCards
        pokemons={pokemons}
        perPage={perPage}
        viewedPages={viewedPages}
        setViewedPages={setViewedPages}
      />
    </div>
  );
};

export default Scroll;
