import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

import PokemonListItem from '../../components/PokemonListItem';
import Header from '../../components/Header';
import { LoadingWrapper, ListWrapper, PageTitle, TextButton } from '../../styles/shared';

import { getPokemonListQuery } from '../../graphql/pokemon';
import client from '../../apollo-client';
import { useMyPokemons } from '../../hooks/my-pokemon';

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

const LoadMoreButton = styled(TextButton)({
  color: 'green',
  fontSize: 14
})

const PokemonsPage = () => {
  const { caughtPokemons } = useMyPokemons();
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPokemon = useCallback(() => {
    const getPokemonByName = async () => {
      setLoading(true);
      const { data } = await client.query({ query: getPokemonListQuery, variables: { limit: 12, offset } });
      if (data && data.pokemons) {
        const { count: newCount, nextOffset, results } = data.pokemons;
        setCount(newCount);
        setOffset(nextOffset);
        setPokemons([...pokemons, ...results]);
      }
      setLoading(false);
    }

    getPokemonByName();
  }, [offset, pokemons, setLoading])

  useEffect(loadPokemon, []);

  const caughtNames = Object.values(caughtPokemons);

  return (
    <PageWrapper>
      <Head>
        <title>All Pokemon List</title>
        <meta property="og:title" content="All Pokemon List" key="title" />
      </Head>
      <Header mobileTitle="All Pokemons" />
      <PageTitle>All Pokemons List</PageTitle>
      {(pokemons.length > 0) && (
        <StyledListWrapper>
          {pokemons.map(
            ({ id, name, image }) => {
              const ownedCount = caughtNames.filter((caughtName) => caughtName === name).length;
              return (<PokemonListItem key={id} detailUrl={`/pokemons/${name}`} name={name} subtitle={`${ownedCount} owned`} image={image} />)
            }
          )}
        </StyledListWrapper>
      )}
      {loading && <LoadingWrapper empty={(pokemons.length === 0)}>Loading pokemons...</LoadingWrapper>}
      {(!loading && pokemons.length < count) && <LoadMoreButton onClick={loadPokemon}>Load More</LoadMoreButton>}
    </PageWrapper>
  )
}

export default PokemonsPage;