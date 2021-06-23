import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

import PokemonListItem from '../../components/PokemonListItem';
import Header from '../../components/Header';
import { LoadingWrapper, ListWrapper, TextButton } from '../../styles/shared';

import { getPokemonListQuery } from '../../graphql/pokemon';
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

const LoadMoreButton = styled(TextButton)({
  color: 'green',
  fontSize: 14
})

const PokemonsPage = () => {
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPokemon = async () => {
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

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <PageWrapper>
      <Head>
        <title>Pokemon List</title>
        <meta property="og:title" content="Pokemon List" key="title" />
        <meta name="description" content="Pokemon list demo site" />
      </Head>
      <Header title="Pokemon List" />
      <StyledListWrapper>
        {pokemons.map(({ id, name, image }) => (<PokemonListItem key={id} detailUrl={`/pokemons/${name}`} name={name} image={image} />))}
      </StyledListWrapper>
      {loading && <LoadingWrapper>Loading pokemons...</LoadingWrapper>}
      {(!loading && pokemons.length < count) && <LoadMoreButton onClick={loadPokemon}>Load More</LoadMoreButton>}
    </PageWrapper>
  )
}

export default PokemonsPage;