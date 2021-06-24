import { render } from '@testing-library/react';
import PokemonListItem from "../../components/PokemonListItem";

jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />)

describe('PokemonListItem component', () => {
  test('Should render list item component', () => {
    const { container } = render(<PokemonListItem name="Pikachu" detailUrl="/pikachu" />);
    expect(container).toMatchSnapshot();
  })

  test('Should render list item component with subtitle', () => {
    const { container } = render(<PokemonListItem name="Pikachu" subtitle="Pikachu" detailUrl="/pikachu" />);
    expect(container).toMatchSnapshot();
  })

  test('Should render list item component with image', () => {
    const { container } = render(<PokemonListItem name="Pikachu" detailUrl="/pikachu" image="https://images.example.com/pikachu.png" />);
    expect(container).toMatchSnapshot();
  })
})