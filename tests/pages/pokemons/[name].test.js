import { render, screen, fireEvent } from '@testing-library/react';

import client from '../../../apollo-client';

import PokemonDetailPage, { getServerSideProps } from '../../../pages/pokemons/[name]';

const pokemon = {
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

jest
  .mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />)
  .mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      pathname: '/',
      replace: jest.fn()
    }))
  }))
  .mock('../../../hooks/breakpoints', () => ({
    useBreakpoints: jest.fn()
  }))
  .mock('../../../apollo-client', () => ({
    query: jest.fn(() => Promise.resolve({}))
  }))

describe('PokemonDetailPage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should render with correct Pokemon', () => {
    render(<PokemonDetailPage pokemon={pokemon} />);
    expect(screen.queryByTestId('header')).toBeTruthy();
    expect(screen.queryByRole('img')).toBeTruthy();
    expect(screen.queryByText('pikachu')).toBeTruthy();
    expect(screen.queryByText('electric')).toBeTruthy();
    expect(screen.queryByTestId('modal')).toBeFalsy();
  })

  test('Should open modal when trying to catch', () => {
    render(<PokemonDetailPage pokemon={pokemon} />);
    fireEvent.click(screen.getByText('Catch'));
    expect(screen.queryByTestId('modal')).toBeTruthy();
  })

  test('Should not render anything if pokemon is missing', () => {
    render(<PokemonDetailPage pokemon={null} />);
    expect(screen.queryByText('Pikachu')).toBeFalsy();
  })
})

describe('getServerSideProps', () => {
  test('Should get pokemon from API and return it as props', async () => {
    client.query.mockResolvedValueOnce({ data: { pokemon } });
    const { props } = await getServerSideProps({ params: { name: 'pikachu' } });
    expect(props.pokemon).toEqual(pokemon);
  });

  test('Should return empty pokemon if name is missing', async () => {
    client.query.mockResolvedValueOnce({ data: { pokemon } });
    const { props } = await getServerSideProps({ params: { name: '' } });
    expect(props.pokemon).toBeFalsy();
  });

  test('Should return empty pokemon if API does not return anything', async () => {
    client.query.mockResolvedValueOnce(null);
    const { props } = await getServerSideProps({ params: { name: '' } });
    expect(props.pokemon).toBeFalsy();
  });

  test('Should return empty pokemon if API returns error', async () => {
    client.query.mockRejectedValueOnce();
    const { props } = await getServerSideProps({ params: { name: '' } });
    expect(props.pokemon).toBeFalsy();
  });
})