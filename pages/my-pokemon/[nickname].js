import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'

import client from "../../apollo-client"
import { getPokemonByNameQuery } from "../../graphql/pokemon"
import PokemonType from '../../components/PokemonType';
import CatchPokemon from '../../components/CatchPokemon';
import { useMyPokemons } from '../../hooks/my-pokemon';


const MyPokemonDetailPage = ({  }) => {
  const router = useRouter();
  const { getPokemonName } = useMyPokemons();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);

  const { nickname } = router.query;

  if (!nickname) {
    return <h1>Pokemon not found!</h1>
  }

  useEffect(() => {
    const loadPokemonInfo = async () => {
      setLoading(true);

      const pokemonName = getPokemonName(nickname);

      const { data } = await client.query({ query: getPokemonByNameQuery, variables: { name: pokemonName } });
      if (data && data.pokemon) {
        setPokemon(data.pokemon)
      }

      setLoading(false);
    }

    loadPokemonInfo();
  }, [nickname])

  const { name, sprites = {}, types = [], moves = [] } = pokemon || {};

  return (
    <div>
      <Image src={sprites.front_default} width={300} height={300} />
      <div>
        <h1>{nickname}</h1>
        <h3>({name})</h3>
        <div>
          {types.map(({ type }) => <PokemonType type={type.name} />)}
        </div>
        <div>
          <h2>Moves</h2>
          {moves.map(({ move }) => <div>{move.name}</div>)}
        </div>
        <button onClick={() => setCatching(true)}>Catch</button>
      </div>
      <CatchPokemon open={catching} name={name} onClose={() => setCatching(false)} />
    </div>
  )
}

export default MyPokemonDetailPage;
