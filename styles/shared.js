import styled from '@emotion/styled';
import { md, sm } from './breakpoints';

export const PageTitle = styled.h1({
  marginBottom: 0,
  fontSize: 24,
  [sm.down]: {
    display: 'none'
  }
})

export const SentenceCase = styled.span({
  textTransform: 'capitalize'
})

export const Emoji = styled.span({
  fontSize: 32,
  marginBottom: 16
})

export const LoadingWrapper = styled.section(
  {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    fontWeight: 500,
    color: 'dimgray',
    fontSize: 16
  },
  ({ empty }) => ({ padding: empty ? '36px 0' : '12px 0' })
)

export const ListWrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  justifyContent: 'space-between',
  gap: 16,
  padding: 24,
  [sm.down]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(125px, 1fr))',
    gap: 12,
  }
})

export const DetailWrapper = styled.div({
  padding: 24,
  display: 'block',
  minHeight: '100%',
  [md.up]: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: 24,
    paddingTop: 84
  }
})

export const DetailImageWrapper = styled.div({
  width: 300,
  height: 300,
  backgroundColor: 'whitesmoke',
  position: 'relative',
  [md.up]: {
    borderRadius: 6
  },
  [sm.down]: {
    width: 'calc(100% + 48px)',
    height: 200,
    margin: '-24px -24px 0',
    background: 'linear-gradient(lightgray 70%, white 100%)'
  }
})

export const TextButton = styled.button({
  cursor: 'pointer',
  padding: 0,
  fontWeight: 500,
  border: 'none',
  fontFamily: '"IBM Plex Sans", sans-serif',
  transition: '0.3s all ease',
  textDecoration: 'none',
  backgroundColor: 'transparent',
  transition: '0.3s all ease',
  '&:hover': {
    textDecoration: 'underline'
  }
})

export const CtaButton = styled.button({
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 500,
  padding: 16,
  width: '100%',
  borderRadius: 6,
  border: 'none',
  fontFamily: '"IBM Plex Sans", sans-serif',
  color: 'white',
  backgroundColor: 'green',
  transition: '0.3s all ease',
  '&[disabled]': {
    backgroundColor: 'lightgray',
    color: 'dimgray'
  },
  '&:hover:not([disabled])': {
    backgroundColor: 'forestgreen'
  },
  '&:active:not([disabled])': {
    backgroundColor: 'darkgreen'
  },
  [sm.down]: {
    fontSize: 14,
    padding: 12,
  }
})

export const SmallCtaButton = styled(CtaButton)({
  fontSize: 13,
  padding: 12,
  [sm.down]: {
    fontSize: 13,
    padding: 10,
  }
})
