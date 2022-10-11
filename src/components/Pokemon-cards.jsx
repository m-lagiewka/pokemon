import PokemonCard from "./Pokemon-card";

const PokemonCards = ({ pokemons }) => {
  return (
    <div
      className="overflow-y-scroll container-full md:container mx-auto my-8"
      id="content"
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
};

export default PokemonCards;
