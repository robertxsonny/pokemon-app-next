import { render } from '@testing-library/react';
import PokemonDetail from '../../components/PokemonDetail';

const types = [{ type: { name: 'electric' } }]

const moves = [
  { move: { name: 'pound' } },
  { move: { name: 'karate-chop' } }
];

describe('PokemonDetailItem component', () => {
  test('Should render pokemon detail', () => {
    const { container } = render(<PokemonDetail name="Pikachu" types={types} moves={moves} />);
    expect(container).toMatchSnapshot();
  })

  test('Should render pokemon detail with nickname', () => {
    const { container } = render(<PokemonDetail nickname="Pikapika" name="Pikachu" types={types} moves={moves} />);
    expect(container).toMatchSnapshot();
  })

  test('Should render pokemon detail with height and weight', () => {
    const { container } = render(<PokemonDetail name="Pikachu" types={types} moves={moves} height={4} weight={600} />);
    expect(container).toMatchSnapshot();
  })

  test('Should render pokemon detail with number of collected pokemons', () => {
    const { container } = render(<PokemonDetail name="Pikachu" types={types} moves={moves} height={4} weight={600} numOfCollected={2} />);
    expect(container).toMatchSnapshot();
  })

})