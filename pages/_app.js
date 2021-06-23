import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

const globalStyle = css({
  'html, body': {
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100%',
    fontFamily: '"IBM Plex Sans", sans-serif',
    fontWeight: 300
  },

  'h1, h2, h3, h4, h5, h6, b': {
    fontWeight: 600
  }
})

const Container = styled.div({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto'
})

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
