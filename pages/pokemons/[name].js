import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import CatchPokemon from '../../components/CatchPokemon';
import Header from '../../components/Header';
import PokemonDetail from '../../components/PokemonDetail';
import BackButton from '../../components/BackButton';
import { sm } from '../../styles/breakpoints';
import { CtaButton, DetailImageWrapper, DetailWrapper } from '../../styles/shared';

import { getPokemonByNameQuery } from '../../graphql/pokemon';
import { useMyPokemons } from '../../hooks/my-pokemon';
import client from '../../apollo-client';

const CatchButtonWrapper = styled.div({
  padding: '24px 0',
  background: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 15%)',
  width: '100%',
  [sm.down]: {
    padding: 24,
    boxSizing: 'border-box',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99
  }
})

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
  const router = useRouter();
  const { getNumOfCollected } = useMyPokemons();

  if (!pokemon) {
    router.replace('/404');
    return null;
  }

  const { name, sprites = {}, types = [], moves = [], height, weight } = pokemon || {};
  const numOfCollected = getNumOfCollected(name) || 0;

  return (
    <DetailWrapper>
      <Head>
        <title>{name} - Pokemon List</title>
        <meta property="og:title" content={`${name} - Pokemon List`} key="title" />
      </Head>
      <BackButton fixed />
      <Header hideOnSm />
      <section>
        <DetailImageWrapper>
          <Image src={sprites.front_default} alt={name} layout="fill" objectFit="contain" />
        </DetailImageWrapper>
        <CatchButtonWrapper>
          <CtaButton onClick={() => setCatching(true)}>Catch</CtaButton>
        </CatchButtonWrapper>
      </section>
      <PokemonDetail name={name} types={types} moves={moves} height={height} weight={weight} numOfCollected={numOfCollected} />
      <CatchPokemon open={catching} name={name} onClose={() => setCatching(false)} />
    </DetailWrapper>
  )
}

export default PokemonDetailPage;
