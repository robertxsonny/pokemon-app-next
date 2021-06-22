import React, { useState, useEffect } from 'react';

import { getPokemonByNameQuery } from '../../graphql/pokemon';
import PokemonListItem from '../../components/PokemonListItem';
import { useMyPokemons } from '../../hooks/my-pokemon';
import client from '../../apollo-client';

const MyPokemonsPage = () => {
  const { caughtPokemons } = useMyPokemons();
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMyPokemonInfo = async () => {
      const pokemonIds = Object.values(caughtPokemons);
      if (pokemonIds.length > 0) {
        setLoading(true);

        const uniquePokemonIds = Array.from(new Set(pokemonIds));
        const pokemonInfo = {};

        await Promise.all(uniquePokemonIds.map(
          async (name) => {
            const { data } = await client.query({ query: getPokemonByNameQuery, variables: { name } });
            if (data && data.pokemon) {
              pokemonInfo[name] = data.pokemon;
            }
          }
        ));

        setPokemonInfo(pokemonInfo);
        setLoading(false);
      }
    }

    loadMyPokemonInfo();
  }, [caughtPokemons])

  return (
    <div>
      {loading && <span>Loading my pokemons...</span>}
      {!loading && caughtPokemons && Object.keys(caughtPokemons).map((nickname) => {
        const originalName = caughtPokemons[nickname];
        const { id, sprites = {} } = pokemonInfo[originalName] || {};
        return (<PokemonListItem key={id} name={nickname} detailUrl={`/my-pokemon/${nickname}`} image={sprites.front_default} />);
      })}
    </div>
  )
}

export default MyPokemonsPage;
