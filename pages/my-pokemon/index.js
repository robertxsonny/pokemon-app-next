import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled';

import PokemonListItem from '../../components/PokemonListItem';
import Header from '../../components/Header';
import { ListWrapper, LoadingWrapper, PageTitle, SentenceCase } from '../../styles/shared';

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

const EmptyWrapper = styled(LoadingWrapper.withComponent('p'))({
  display: 'inline',
  padding: 24,
  boxSizing: 'border-box'
});

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
      <StyledListWrapper data-testid="my-pokemon-list">
        {Object.keys(caughtPokemons).map((nickname) => {
          const originalName = caughtPokemons[nickname];
          const { id, name, sprites = {} } = pokemonInfo[originalName] || {};
          return (
            <PokemonListItem
              key={id}
              name={nickname}
              subtitle={<SentenceCase>({name})</SentenceCase>}
              detailUrl={`/my-pokemon/${nickname}`}
              image={sprites.front_default}
            />
          );
        })}
      </StyledListWrapper>
    )
  } else {
    pageContent = (
      <>
        <EmptyWrapper empty>
          You haven&apos;t caught any Pokemons yet.<br />
          Go to&nbsp;
          <Link href="/pokemons" passHref><LinkInWrapper>all Pokemon list</LinkInWrapper></Link>
          &nbsp;and catch some of them!
        </EmptyWrapper>
      </>
    )
  }

  return (
    <PageWrapper>
      <Head>
        <title>My Pokemons Collection</title>
        <meta property="og:title" content="My Pokemons Collection" key="title" />
      </Head>
      <Header mobileTitle="My Collection" />
      <PageTitle>My Pokemon Collection</PageTitle>
      {pageContent}
    </PageWrapper>

  )
}

export default MyPokemonsPage;
