import PokemonCard from "./Pokemon-card";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const PokemonCards = React.forwardRef(
  ({ pokemons, perPage, viewedPages, setViewedPages, setIsRendered }, ref) => {
    const [pokemonPages, setPokemonPages] = useState([]);

    useEffect(() => {
      setPokemonPages([]);
      for (let i = 0; i < pokemons.length; i += perPage) {
        if (!viewedPages.has(i)) {
          setPokemonPages((prevState) =>
            [].concat(prevState, [pokemons.slice(i, i + perPage)])
          );
          setViewedPages(viewedPages.add(i / 20 + 1));
        }
      }
    }, [pokemons]);

    return (
      <div
        className="container-full md:container mx-auto my-8"
        id="content"
        ref={ref}
      >
        {pokemonPages.map((element, i) => {
          if (i + 1 === pokemonPages.length) {
            setIsRendered(true);
          }
          return (
            <div className="wrapper" key={i}>
              {element.map((el, j) => {
                return <PokemonCard key={el.name} {...el} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
);

PokemonCards.displayName = "PokemonCards";

export default PokemonCards;
