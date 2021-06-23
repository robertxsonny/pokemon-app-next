import { useCallback, useEffect } from "react";
import { useState } from "react";

export const useMyPokemons = () => {
  const [caughtPokemons, setCaughtPokemons] = useState(() => {
    if (typeof window === "undefined") {
      return {}
    }

    const caughtPokemonsStr = localStorage.getItem('caught-pokemons');
    return caughtPokemonsStr ? JSON.parse(caughtPokemonsStr) : {};
  });

  useEffect(() => {
    localStorage.setItem('caught-pokemons', JSON.stringify(caughtPokemons));
  }, [caughtPokemons])

  const caughtPokemonNicknames = Object.keys(caughtPokemons);

  const hasPokemonWithNickname = useCallback((nickname) => caughtPokemonNicknames.includes(nickname), [caughtPokemonNicknames]);

  const getPokemonName = useCallback((nickname) => caughtPokemons[nickname], [caughtPokemons]);

  const getNumOfCollected = useCallback((name) => Object.values(caughtPokemons).filter(v => v === name).length, [caughtPokemons]);

  const catchPokemon = useCallback((name, nickname) => {
    if (!caughtPokemons[nickname]) {
      const newCaughtPokemons = {
        ...caughtPokemons,
        [nickname]: name
      }

      setCaughtPokemons(newCaughtPokemons);
    }
  }, [caughtPokemons]);

  const releasePokemon = useCallback((nicknameToRelease) => {
    const newCaughtPokemons = Object.keys(caughtPokemons).reduce((pokemons, nickname) => {
      return nickname === nicknameToRelease ? pokemons : { ...pokemons, [nickname]: caughtPokemons[nickname] }
    }, {})

    setCaughtPokemons(newCaughtPokemons);
  }, [caughtPokemons]);

  return { caughtPokemons, hasPokemonWithNickname, getNumOfCollected, getPokemonName, catchPokemon, releasePokemon };
}
