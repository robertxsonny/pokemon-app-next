import { render, screen, fireEvent, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import { useRouter } from 'next/router';

import client from '../../../apollo-client';

import MyPokemonDetailPage from '../../../pages/my-pokemon/[nickname]';

const mockPokemonName = jest.fn(() => 'pikachu');

jest
  .mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />)
  .mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      query: { nickname: 'pikapika' },
      replace: jest.fn()
    }))
  }))
  .mock('../../../hooks/my-pokemon', () => ({
    useMyPokemons: jest.fn(() => ({
      getPokemonName: mockPokemonName,
      releasePokemon: jest.fn()
    }))
  }))
  .mock('../../../hooks/breakpoints', () => ({
    useBreakpoints: jest.fn()
  }))
  .mock('../../../apollo-client', () => ({
    query: jest.fn(() => Promise.resolve({
      data: {
        pokemon: {
          id: 2,
          name: 'pikachu',
          height: 4,
          weight: 60,
          sprites: { front_default: 'https://images.example.com/pokemon/6.jpg' },
          types: [{ type: { name: 'electric' } }],
          moves: [
            { move: { name: 'pound' } },
            { move: { name: 'karate-chop' } },
            { move: { name: 'double-slap' } },
            { move: { name: 'comet-punch' } },
            { move: { name: 'mega-punch' } },
            { move: { name: 'pay-day' } }
          ]
        }
      }
    }))
  }))


describe('MyPokemonDetailPage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should render with correct Pokemon', async () => {
    act(() => {
      render(<MyPokemonDetailPage />)
    });

    await waitForElementToBeRemoved(() => screen.getByText('Loading your pokemon...'))

    expect(screen.queryByRole('img')).toBeInTheDocument();
    expect(screen.queryByText('pikapika')).toBeInTheDocument();
    expect(screen.queryByText('(pikachu)')).toBeInTheDocument();
    expect(screen.queryByText('electric')).toBeInTheDocument();
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  })

  test('Should open modal when trying to catch', async () => {
    act(() => {
      render(<MyPokemonDetailPage />)
    });

    const releaseButton = await screen.findByText('Release from collection')
    fireEvent.click(releaseButton);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  })

  test('Should not render anything if nickname is missing from collection list', async () => {
    mockPokemonName.mockReturnValueOnce('')

    act(() => {
      render(<MyPokemonDetailPage />)
    });

    expect(screen.queryByText('pikapika')).not.toBeInTheDocument();
  })

  test('Should not render anything if API does not return anything', async () => {
    client.query.mockResolvedValueOnce(null);
    act(() => {
      render(<MyPokemonDetailPage />)
    });

    await waitForElementToBeRemoved(() => screen.getByText('Loading your pokemon...'))
    expect(screen.queryByText('pikapika')).not.toBeInTheDocument();
  })

  test('Should not render anything if API returns error', async () => {
    client.query.mockRejectedValueOnce({});
    act(() => {
      render(<MyPokemonDetailPage />)
    });
   
    await waitForElementToBeRemoved(() => screen.getByText('Loading your pokemon...'))
    expect(screen.queryByText('pikapika')).not.toBeInTheDocument();
  })
})
