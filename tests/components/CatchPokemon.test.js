import { render, screen, fireEvent, act } from '@testing-library/react';
import CatchPokemon from '../../components/CatchPokemon';

jest.mock('../../hooks/my-pokemon', () => ({
  useMyPokemons: () => ({
    hasPokemonWithNickname: jest.fn(name => name === 'squirtle'),
    catchPokemon: jest.fn()
  })
}))

describe('CatchPokemon loading state', () => {
  test('Should initially render loading screen', () => {
    const { container } = render(<CatchPokemon open name="pikachu"/>);
    expect(container).toMatchSnapshot();
  })

  test('Should not render anything if not opened', () => {
    const { container } = render(<CatchPokemon open={false}/>);
    expect(container).toMatchSnapshot();
  })
});

describe('CatchPokemon success state', () => {
  const actualRandom = global.Math.random;

  beforeEach(() => {
    jest.useFakeTimers();
    global.Math.random = jest.fn(() => 0.1);
  })

  afterEach(() => {
    jest.useRealTimers();
    global.Math.random = actualRandom;
  })

  test('Should render saving form once it allows to catch', () => {
    const { container } = render(<CatchPokemon open name="pikachu" />);
    act(() => jest.runAllTimers());
    expect(container).toMatchSnapshot();
    expect(screen.getByDisplayValue('pikachu')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Save to my collection' }));
    expect(container).toMatchSnapshot();
  })

  test('Should give prefilled unique nickname', () => {
    const { container } = render(<CatchPokemon open name="squirtle" />);
    act(() => jest.runAllTimers());
    expect(container).toMatchSnapshot();
    expect(screen.getByDisplayValue('squirtle1')).toBeTruthy();
  })
})

describe('CatchPokemon failed state', () => {
  const actualRandom = global.Math.random;

  beforeEach(() => {
    jest.useFakeTimers();
    global.Math.random = jest.fn(() => 0.8);
  })

  afterEach(() => {
    jest.useRealTimers();
    global.Math.random = actualRandom;
  })

  test('Should show error dialog if catching Pokemon is failed', () => {
    const { container } = render(<CatchPokemon open name="pikachu" />);
    act(() => jest.runAllTimers());
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(container).toMatchSnapshot();
  })
})
