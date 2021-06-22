import React, { useState } from 'react';
import Image from 'next/image';

import client from "../../apollo-client"
import { getPokemonByNameQuery } from "../../graphql/pokemon"
import PokemonType from '../../components/PokemonType';
import CatchPokemon from '../../components/CatchPokemon';

export const getServerSideProps = async ({ params: { name } }) => {
  let pokemon = null;

  if (name) {
    try {
      const { data } = await client.query({ query: getPokemonByNameQuery, variables: { name } });
  
      if (data && data.pokemon) {
        pokemon = data.pokemon
      }
    } catch (e) {
      pokemon = null;
    }
  }

  return {
    props: { pokemon }
  }
}

const PokemonDetailPage = ({ pokemon }) => {
  const [catching, setCatching] = useState(false);

  if (!pokemon) {
    return <h1>Pokemon not found!</h1>
  }

  const { name, sprites = {}, types = [], moves = [] } = pokemon || {};

  return (
    <div>
      <Image src={sprites.front_default} width={300} height={300} />
      <div>
        <h1>{name}</h1>
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

export default PokemonDetailPage;
