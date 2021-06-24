import { render } from '@testing-library/react';
import PokemonType from '../../components/PokemonType';

const allTypes = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow'];

describe('PokemonType component', () => {
  test('Should render each type with correct style correctly', () => {
    const { container, rerender } = render(<PokemonType />);

    allTypes.forEach((type) => {
      rerender(<PokemonType type={type} />);
      expect(container).toMatchSnapshot();
    })
  })
})