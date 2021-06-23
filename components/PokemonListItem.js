import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';

import { xs } from '../styles/breakpoints';

const TextWrapper = styled.div({
  background: 'linear-gradient(rgba(0,0,0,0) 10%, rgba(0,0,0,0.45) 90%)',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 50,
  transition: '0.3s all ease',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  paddingBottom: 12
})

const Name = styled.b({
  color: 'white',
  fontSize: '1rem',
  textTransform: 'capitalize'
})

const Card = styled.a({
  display: 'block',
  backgroundColor: 'lightgrey',
  boxShadow: '0 4px 4px rgba(0, 0, 0, 0.034), 0 6px 6px rgba(0, 0, 0, 0.048)',
  borderRadius: 6,
  width: '100%',
  position: 'relative',
  transition: '0.3s all ease',
  overflow: 'hidden',
  height: 180,
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 8px 8px rgba(0, 0, 0, 0.034), 0 12px 12px rgba(0, 0, 0, 0.048)',

    [TextWrapper]: {
      height: 80,
      paddingBottom: 20
    }
  },
  [xs.max]: {
    height: 125
  }
})

const PokemonListItem = ({ name, image, detailUrl, onDelete }) => (
  <Link href={detailUrl}>
    <Card>
      {onDelete && (
        <button onClick={onDelete}>x</button>
      )}
      {image && <Image src={image} layout="fill" objectFit="contain" />}
      <TextWrapper>
        <Name>{name}</Name>
      </TextWrapper>
    </Card>
  </Link>
)

export default PokemonListItem;
