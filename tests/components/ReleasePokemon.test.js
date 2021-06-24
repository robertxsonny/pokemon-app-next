import { render, screen, fireEvent } from '@testing-library/react';
import ReleasePokemon from '../../components/ReleasePokemon';

jest.mock('../../hooks/my-pokemon', () => ({
  useMyPokemons: () => ({
    releasePokemon: jest.fn()
  })
}))

describe('ReleasePokemon component', () => {
  test('Should render confirmation screen at first', () => {
    const { container } = render(<ReleasePokemon open nickname="pikachu" />);
    expect(container).toMatchSnapshot();
  })

  test('Should render notification after confirming to release Pokemon', () => {
    const { container } = render(<ReleasePokemon open nickname="pikachu" />);
    fireEvent.click(screen.getByRole('button', { name: 'Yes, release from collection' }));
    expect(container).toMatchSnapshot();
  })

  test('Should not render anything if not opened', () => {
    const { container } = render(<ReleasePokemon open={false}/>);
    expect(container).toMatchSnapshot();
  })
})