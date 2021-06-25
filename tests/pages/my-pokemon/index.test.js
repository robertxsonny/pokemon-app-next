import { render, screen, act, within, waitFor } from '@testing-library/react';

import { useMyPokemons } from '../../../hooks/my-pokemon';

import MyPokemonsPage from '../../../pages/my-pokemon/index';

const mockCaughtPokemons = {
  bulbee: 'bulbasaur',
  charmee: 'charmander',
  squirty: 'squirtle'
}

const mockPokemons = {
  bulbasaur: { id: 1, name: 'bulbasaur', sprite: { front_default: 'https://images.example.com/pokemon/1.jpg' } },
  charmander: { id: 2, name: 'charmander', sprite: { front_default: 'https://images.example.com/pokemon/2.jpg' } },
  squirtle: { id: 3, name: 'squirtle', sprite: { front_default: 'https://images.example.com/pokemon/3.jpg' } }
}

jest
  .mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />)
  .mock('next/router', () => ({
    useRouter: jest.fn(() => ({ pathname: '/' }))
  }))
  .mock('../../../hooks/breakpoints', () => ({
    useBreakpoints: jest.fn()
  }))
  .mock('../../../hooks/my-pokemon', () => ({
    useMyPokemons: jest.fn(() => ({
      caughtPokemons: mockCaughtPokemons,
      hasPokemonWithNickname: jest.fn(name => !!mockCaughtPokemons[name])
    }))
  }))
  .mock('../../../apollo-client', () => ({
    query: jest.fn(({ variables: { name } }) => Promise.resolve({
      data: {
        pokemon: mockPokemons[name]
      }
    }))
  }));

describe('MyPokemons page', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should initially render loading screen then render Pokemon list once it finished loading', async () => {
    act(() => {
      render(<MyPokemonsPage />)
    });
    expect(screen.queryByText('Loading your pokemon collection...')).toBeInTheDocument();
  
    const pokemonItemList = await screen.findByTestId('my-pokemon-list');
    expect(within(pokemonItemList).getAllByRole('link')).toHaveLength(3);
  })

  test('Should render empty screen if collection is empty', async () => {
    useMyPokemons.mockReturnValue({
      caughtPokemons: {},
      hasPokemonWithNickname: jest.fn(() => false)
    })
  
    act(() => {
      render(<MyPokemonsPage />)
    });

    await waitFor(() => {
      expect(screen.queryByText(/You haven't caught any Pokemons yet./)).toBeInTheDocument();
    })
  })
})