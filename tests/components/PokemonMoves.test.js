import { fireEvent, render, screen } from '@testing-library/react';
import PokemonMoves from '../../components/PokemonMoves';

const moves = [
  { move: { name: 'pound' } },
  { move: { name: 'karate-chop' } },
  { move: { name: 'double-slap' } },
  { move: { name: 'comet-punch' } },
  { move: { name: 'mega-punch' } },
  { move: { name: 'pay-day' } }
];

const moreMoves = [
  { move: { name: 'fire-punch' } },
  { move: { name: 'ice-punch' } },
  { move: { name: 'thunder-punch' } },
  { move: { name: 'scratch' } },
  { move: { name: 'vise-grip' } },
  { move: { name: 'guillotine' } },
  { move: { name: 'razor-wind' } },
  { move: { name: 'swords-dance' } },
  { move: { name: 'cut' } },
  { move: { name: 'gust' } },
  { move: { name: 'wing-attack' } },
  { move: { name: 'whirlwind' } },
  { move: { name: 'fly' } },
  { move: { name: 'bind' } }
]

describe('PokemonMoves component', () => {
  test('Should render all moves if less than 12 items', () => {
    const { container } = render(<PokemonMoves moves={moves} />);
    expect(container).toMatchSnapshot();
  })

  test('Should render 12 moves partially at first if more than 12 items', () => {
    const { container } = render(<PokemonMoves moves={[...moves, ...moreMoves]} />);
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByRole('button', { name: 'Show all 20 moves' }))
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByRole('button', { name: 'Show only first 12 moves' }))
    expect(container).toMatchSnapshot();
  })
});
