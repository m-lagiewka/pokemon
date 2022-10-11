import * as React from 'react';
import { useState } from 'react';


export const PokemonContext = React.createContext({});

const PokemonContextProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [counter, setCounter] = useState(0);
  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        counter,
        setCounter,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContextProvider;
