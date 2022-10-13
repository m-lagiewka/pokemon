import PokemonCard from "./Pokemon-card";
import React from "react";

const PokemonCards = React.forwardRef(({ pokemons }, ref) => {
  return (
    <div
      className="container-full md:container mx-auto my-8"
      id="content"
      ref={ref}
    >
      {pokemons
        .filter((el, i) => {
          return pokemons.indexOf(el) === i;
        })
        .map((element) => {
          return <PokemonCard key={element.name} {...element} />;
        })}
    </div>
  );
});

export default PokemonCards;
