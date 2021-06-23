import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled';

import PokemonListItem from '../../components/PokemonListItem';
import Header from '../../components/Header';
import { ListWrapper, LoadingWrapper } from '../../styles/shared';

import { getPokemonByNameQuery } from '../../graphql/pokemon';
import { useMyPokemons } from '../../hooks/my-pokemon';
import client from '../../apollo-client';

const PageWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 64,
  paddingBottom: 64
})

const StyledListWrapper = styled(ListWrapper)({
  alignSelf: 'stretch'
})

const EmptyWrapper = LoadingWrapper.withComponent('p');

const LinkInWrapper = styled.span({
  color: 'black',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
})

const MyPokemonsPage = () => {
  const { caughtPokemons } = useMyPokemons();
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [loading, setLoading] = useState(true);

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
      } else {
        setLoading(false);
      }
    }

    loadMyPokemonInfo();
  }, [caughtPokemons])

  let pageContent;
  if (loading) {
    pageContent = <LoadingWrapper empty>Loading your pokemon collection...</LoadingWrapper>
  } else if (caughtPokemons && Object.keys(caughtPokemons).length > 0) {
    pageContent = (
      <StyledListWrapper>
        {Object.keys(caughtPokemons).map((nickname) => {
          const originalName = caughtPokemons[nickname];
          const { id, sprites = {} } = pokemonInfo[originalName] || {};
          return (<PokemonListItem key={id} name={nickname} detailUrl={`/my-pokemon/${nickname}`} image={sprites.front_default} />);
        })}
      </StyledListWrapper>
    )
  } else {
    pageContent = (
      <>
        <EmptyWrapper empty>
          You haven&apos;t caught any Pokemons yet.&nbsp;
          <Link href="/pokemons"><LinkInWrapper>Go to all Pokemon list</LinkInWrapper></Link>
          &nbsp;and catch some of them!
        </EmptyWrapper>
      </>
    )
  }

  return (
    <PageWrapper>
      <Head>
        <title>My Pokemon Collection</title>
        <meta property="og:title" content="My Pokemon Collection" key="title" />
      </Head>
      <Header title="My Pokemon Collection" />
      {pageContent}
    </PageWrapper>

  )
}

export default MyPokemonsPage;
