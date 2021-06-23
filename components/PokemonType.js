import { css } from '@emotion/react';
import styled from '@emotion/styled';

const typeStyle = {
  normal: css({ backgroundColor: 'lightgray', color: 'black' }),
  fighting: css({ backgroundColor: 'darkorange', color: 'white' }),
  flying: css({ backgroundColor: 'skyblue', color: 'black' }),
  poison: css({ backgroundColor: 'indigo', color: 'white' }),
  ground: css({ backgroundColor: 'sandybrown', color: 'black' }),
  rock: css({ backgroundColor: 'gold', color: 'white' }),
  bug: css({ backgroundColor: 'darkolivegreen', color: 'white' }),
  ghost: css({ backgroundColor: 'purple', color: 'white' }),
  steel: css({ backgroundColor: 'steelblue', color: 'white' }),
  fire: css({ backgroundColor: 'red', color: 'white' }),
  water: css({ backgroundColor: 'cyan', color: 'black' }),
  grass: css({ backgroundColor: 'limegreen', color: 'white' }),
  electric: css({ backgroundColor: 'yellow', color: 'black' }),
  psychic: css({ backgroundColor: 'violet', color: 'white' }),
  ice: css({ backgroundColor: 'lightskyblue', color: 'black' }),
  dragon: css({ backgroundColor: 'orange', color: 'white' }),
  dark: css({ backgroundColor: 'black', color: 'white' }),
  fairy: css({ backgroundColor: 'pink', color: 'white' }),
  unknown: css({ backgroundColor: 'dimgray', color: 'white' }),
  shadow: css({ backgroundColor: 'darkgray', color: 'white' }),
}

const TypeLabel = styled.div(
  {
    display: 'inline-block',
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 500,
    padding: '4px 12px',
    margin: '4px',
    borderRadius: 6
  },
  ({ type }) => typeStyle[type]
)

const PokemonType = ({ type }) => (
  <TypeLabel type={type}>
    {type}
  </TypeLabel>
)

export default PokemonType;
