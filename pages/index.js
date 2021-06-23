import styled from '@emotion/styled';
import Head from 'next/head';
import Link from 'next/link';

import { Emoji } from '../styles/shared';
import { sm } from '../styles/breakpoints';

const HomeWrapper = styled.section({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh'
})

const CardWrapper = styled.section({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 48,
  boxSizing: 'border-box',
  flexWrap: 'wrap',
  [sm.max]: {
    padding: '16px 24px'
  }
})

const BigEmoji = styled(Emoji)({
  fontSize: 48,
  [sm.max]: {
    fontSize: 36
  }
})

const CardMenu = styled.a({
  cursor: 'pointer',
  width: 200,
  height: 200,
  backgroundColor: 'whitesmoke',
  padding: 16,
  margin: 8,
  boxSizing: 'border-box',
  boxShadow: '0 4px 4px rgba(0, 0, 0, 0.034), 0 6px 6px rgba(0, 0, 0, 0.048)',
  borderRadius: 6,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  transition: '0.3s all ease',
  '&:hover': {
    boxShadow: '0 8px 8px rgba(0, 0, 0, 0.034), 0 12px 12px rgba(0, 0, 0, 0.048)',
  },
  [sm.max]: {
    fontSize: 14,
    width: 135,
    height: 135
  }
})

export default function Home() {
  return (
    <HomeWrapper>
      <Head>
        <title>Welcome</title>
        <meta property="og:title" content="Welcome" key="title" />
      </Head>
      <h1>Welcome to Pokemon List!</h1>
      <CardWrapper>
        <Link href="/pokemons" passHref>
          <CardMenu>
            <BigEmoji role="img" area-label="pokemons">📜</BigEmoji>
            All Pokemons
          </CardMenu>
        </Link>
        <Link href="/my-pokemon" passHref>
          <CardMenu>
            <BigEmoji role="img" area-label="pokemons">💼</BigEmoji>
            My collections
          </CardMenu>
        </Link>
      </CardWrapper>
    </HomeWrapper>
  )
}
