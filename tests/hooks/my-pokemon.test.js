import { renderHook, act } from '@testing-library/react-hooks';
import { useMyPokemons } from '../../hooks/my-pokemon';

describe('my-pokemon hooks', () => {
  test('Should add to caught list when catching new pokemons', () => {
    const { result } = renderHook(() => useMyPokemons())

    act(() => { result.current.catchPokemon('bulbasaur', 'bulbee'); });
    act(() => { result.current.catchPokemon('squirtle', 'squirty'); });

    expect(result.current.caughtPokemons).toEqual({ bulbee: 'bulbasaur', squirty: 'squirtle' });
  })

  test('Should perform correct calculations against caught pokemons', () => {
    const { result } = renderHook(() => useMyPokemons())

    act(() => {
      result.current.catchPokemon('bulbasaur', 'bulbee');
      result.current.catchPokemon('squirtle', 'squirty');
    })

    expect(result.current.getNumOfCollected('bulbasaur')).toBe(1);
    expect(result.current.getNumOfCollected('pikachu')).toBe(0);

    expect(result.current.hasPokemonWithNickname('bulbee')).toBe(true);
    expect(result.current.hasPokemonWithNickname('pikapika')).toBe(false);

    expect(result.current.getPokemonName('bulbee')).toBe('bulbasaur');
    expect(result.current.getPokemonName('pikapika')).toBe(undefined);
  })

  test('Should remove from caught list when releasing new pokemons', () => {
    const { result } = renderHook(() => useMyPokemons())

    act(() => { result.current.catchPokemon('bulbasaur', 'bulbee'); });
    act(() => { result.current.catchPokemon('squirtle', 'squirty'); });

    expect(result.current.caughtPokemons).toEqual({ bulbee: 'bulbasaur', squirty: 'squirtle' });

    act(() => {
      result.current.releasePokemon('bulbee');
    })

    expect(result.current.caughtPokemons).toEqual({ squirty: 'squirtle' });
  })
})