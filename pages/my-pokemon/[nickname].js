import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import ReleasePokemon from '../../components/ReleasePokemon'
import Header from '../../components/Header';
import PokemonDetail from '../../components/PokemonDetail';
import BackButton from '../../components/BackButton';
import { CtaButton, DetailImageWrapper, DetailWrapper, LoadingWrapper } from '../../styles/shared';
import { sm } from '../../styles/breakpoints';

import { getPokemonByNameQuery } from '../../graphql/pokemon';
import { useMyPokemons } from '../../hooks/my-pokemon';
import client from '../../apollo-client';

const ReleaseButtonWrapper = styled.div({
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

const ReleaseButton = styled(CtaButton)({
  backgroundColor: 'white',
  color: 'red',
  border: '1px solid red',
  '&:hover:not([disabled])': {
    backgroundColor: 'white',
    color: 'maroon',
    border: '1px solid maroon',
  },
  '&:active:not([disabled])': {
    border: '1px solid red',
    color: 'red',
    backgroundColor: 'lavenderblush'
  }
})

const MyPokemonDetailPage = ({ }) => {
  const router = useRouter();
  const { getPokemonName } = useMyPokemons();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const [releasing, setReleasing] = useState(false);

  const { nickname } = router.query;

  useEffect(() => {
    const loadPokemonInfo = async () => {
      try {
        setLoading(true);
        const pokemonName = getPokemonName(nickname);
        if (!pokemonName) {
          throw new Error('Pokemon not found')
        }

        const { data } = await client.query({ query: getPokemonByNameQuery, variables: { name: pokemonName } });
        if (!(data && data.pokemon)) {
          throw new Error('Pokemon not found')
        }

        setPokemon(data.pokemon)
        setLoading(false);

      } catch (e) {
        setPokemon(null);
        setLoading(false);
      }
    }

    if (nickname) {
      loadPokemonInfo();
    }
  }, [nickname, getPokemonName])

  if (!pokemon) {
    router.replace('/404');
    return null;
  }

  const { name, sprites = {}, types = [], moves = [], height, weight } = pokemon || {};

  const pageContent = loading ? (
    <LoadingWrapper empty>Loading your pokemon...</LoadingWrapper>
  ) : (
    <>
      <section>
        <DetailImageWrapper>
          <Image src={sprites.front_default} alt={nickname} layout="fill" objectFit="contain" />
        </DetailImageWrapper>
        <ReleaseButtonWrapper>
          <ReleaseButton onClick={() => setReleasing(true)}>Release from collection</ReleaseButton>
        </ReleaseButtonWrapper>
      </section>
      <PokemonDetail nickname={nickname} name={name} types={types} moves={moves} height={height} weight={weight} />
      <ReleasePokemon open={releasing} onClose={() => setReleasing(false)} nickname={nickname} />
    </>
  )

  return (
    <DetailWrapper>
      <Head>
        <title>{nickname} - My Pokemon Collection</title>
        <meta property="og:title" content={`${nickname} - My Pokemon Collection`} key="title" />
      </Head>
      <Header hideOnSm />
      <BackButton fixed />
      {pageContent}
    </DetailWrapper>
  )
}

export default MyPokemonDetailPage;
