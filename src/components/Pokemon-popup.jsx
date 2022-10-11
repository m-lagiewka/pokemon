const PokemonPopup = ({ pokemon, setState }) => {
  console.log(pokemon);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-300 z-50">
      <div className="flex">
        <div className="md:p-4 flex-grow">
          <h2 className="text-3xl bold text-indigo-900 uppercase">
            {pokemon.name}
          </h2>
        </div>
        <div className="p-4">
          <button
            className="bg-white rounded-full shadow-sm p-2 leading-3"
            onClick={() => setState(null)}
          >
            &#x2715;
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-1/2">
          <img
            src={pokemon.sprites && pokemon.sprites.front_default}
            className="w-full h-auto block group-hover:hidden"
            alt={pokemon.name}
            loading="lazy"
            width="400px"
            height="400px"
          />
        </div>
        <div className="w-1/2">
          <h3 className="text-2xl mb-4">Details</h3>
          <div className="m-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-1 px-4"></th>
                  <th className="py-1 px-4">value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 px-4">Weight</td>
                  <td className="py-1 px-4">{pokemon.weight}</td>
                </tr>
                <tr>
                  <td className="py-1 px-4">Types</td>
                  <td className="py-1 px-4">
                    {pokemon.types.map((el) => el.type.name).join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="m-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-1 px-4">Stat</th>
                  <th className="py-1 px-4">value</th>
                  <th className="py-1 px-4">effort</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.stats.map((el) => {
                  return (
                    <tr key={el.stat.name}>
                      <td className="capitalize py-1 px-4">{el.stat.name}</td>
                      <td className="capitalize py-1 px-4 text-center">
                        {el.base_stat}
                      </td>
                      <td className="capitalize py-1 px-4 text-center">
                        {el.effort}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="m-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-1 px-4">Ability name</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.abilities.map((el) => {
                  return (
                    <tr key={el.ability.name}>
                      <td className="capitalize py-1 px-4">
                        {el.ability.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPopup;
