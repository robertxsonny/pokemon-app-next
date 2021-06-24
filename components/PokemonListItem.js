import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';

import { sm } from '../styles/breakpoints';

const TextWrapper = styled.div({
  background: 'linear-gradient(rgba(0,0,0,0) 15%, rgba(0,0,0,0.5) 85%)',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 60,
  transition: '0.3s all ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingBottom: 12
})

const Name = styled.b({
  color: 'white',
  fontSize: '1rem',
  textTransform: 'capitalize'
})

const Subtitle = styled.span({
  color: 'whitesmoke',
  fontSize: 12
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
  height: 200,
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 8px 8px rgba(0, 0, 0, 0.034), 0 12px 12px rgba(0, 0, 0, 0.048)',

    [TextWrapper]: {
      height: 90,
      paddingBottom: 20
    }
  },
  [sm.down]: {
    height: 150
  }
})

const PokemonListItem = ({ name, subtitle, image, detailUrl }) => (
  <Link href={detailUrl} passHref>
    <Card>
      {image && <Image src={image} alt={name} layout="fill" objectFit="contain" />}
      <TextWrapper>
        <Name>{name}</Name>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TextWrapper>
    </Card>
  </Link>
)

export default PokemonListItem;
