import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { getPokemonListQuery } from '../../graphql/pokemon';
import PokemonListItem from '../../components/PokemonListItem';
import Modal from '../../components/Modal';

const PokemonsPage = () => {
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(null);
  const [pokemons, setPokemons] = useState([]);

  const [getPokemons, { loading }] = useLazyQuery(
    getPokemonListQuery,
    {
      onCompleted: (data) => {
        if (data && data.pokemons) {
          const { count: newCount, nextOffset, results } = data.pokemons;
          setCount(newCount);
          setOffset(nextOffset);
          setPokemons([...pokemons, ...results]);
        }
      }
    }
  );

  const loadPokemon = () => getPokemons({ variables: { limit: 20, offset } });

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <div>
      {pokemons.map(({ id, name, image }) => (<PokemonListItem key={id} detailUrl={`/pokemons/${name}`} name={name} image={image} />))}
      {loading && <span>Loading pokemons...</span>}
      {(!loading && pokemons.length < count) && <button onClick={loadPokemon}>Load More</button>}
      {/* <Modal /> */}
    </div>
  )
}

export default PokemonsPage;