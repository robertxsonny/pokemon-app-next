import { render, screen, fireEvent, act, within } from '@testing-library/react';

import client from '../../../apollo-client';

import PokemonsPage from '../../../pages/pokemons/index';

jest
  .mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />)
  .mock('next/router', () => ({
    useRouter: jest.fn(() => ({ pathname: '/' }))
  }))
  .mock('../../../hooks/breakpoints', () => ({
    useBreakpoints: jest.fn()
  }))
  .mock('../../../apollo-client', () => ({
    query: jest.fn(() => Promise.resolve({
      data: {
        pokemons: {
          count: 12,
          nextOffset: 6,
          results: [
            { id: 1, name: 'bulbasaur', image: 'https://images.example.com/pokemon/1.jpg' },
            { id: 2, name: 'charmander', image: 'https://images.example.com/pokemon/2.jpg' },
            { id: 3, name: 'squirtle', image: 'https://images.example.com/pokemon/3.jpg' },
            { id: 4, name: 'caterpie', image: 'https://images.example.com/pokemon/4.jpg' },
            { id: 5, name: 'weedle', image: 'https://images.example.com/pokemon/5.jpg' },
            { id: 6, name: 'pidgey', image: 'https://images.example.com/pokemon/6.jpg' }
          ]
        }
      }
    }))
  }))

describe('Pokemons page', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should initially render loading screen then render Pokemon list once it finished loading', async () => {
    act(() => {
      render(<PokemonsPage />)
    });
    expect(screen.queryByText('Loading pokemons...')).toBeInTheDocument();
  
    const pokemonItemList = await screen.findByTestId('pokemon-list');
    expect(within(pokemonItemList).getAllByRole('link')).toHaveLength(6);
    expect(screen.queryByText('Load More')).toBeInTheDocument();
  })

  test('Should not load more button once it loads all Pokemons', async () => {
    act(() => {
      render(<PokemonsPage />)
    });
    const loadMoreButton = await screen.findByText('Load More');

    client.query.mockResolvedValueOnce({
      data: {
        pokemons: {
          count: 12,
          nextOffset: null,
          results: [
            { id: 7, name: 'pikachu', image: 'https://images.example.com/pokemon/7.jpg' },
            { id: 8, name: 'jigglypuff', image: 'https://images.example.com/pokemon/8.jpg' },
            { id: 9, name: 'ekans', image: 'https://images.example.com/pokemon/9.jpg' },
            { id: 10, name: 'nidorina', image: 'https://images.example.com/pokemon/10.jpg' },
            { id: 11, name: 'nidorino', image: 'https://images.example.com/pokemon/11.jpg' },
            { id: 12, name: 'vulpix', image: 'https://images.example.com/pokemon/12.jpg' }
          ]
        }
      }
    })
    act(() => {
      fireEvent.click(loadMoreButton)
    });
    const pokemonItemList = await screen.findByTestId('pokemon-list');
    expect(within(pokemonItemList).getAllByRole('link')).toHaveLength(12);
    expect(screen.queryByText('Load More')).not.toBeInTheDocument();
  })
})
