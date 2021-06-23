import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { md, sm } from '../styles/breakpoints';

const HeaderWrapper = styled.header(
  {
    height: 50,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    boxShadow: '0 6px 6px rgba(0, 0, 0, 0.078)'
  },
  ({ hideOnSm }) => hideOnSm ? { [sm.max]: { display: 'none' } } : {}
)

const HeaderContainer = styled.div({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 24px',
  boxSizing: 'border-box',
  fontSize: 20
})

const LargeOnlyHeaderContainer = styled(HeaderContainer)({
  [sm.max]: {
    display: 'none'
  },
  [md.min]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

const SmallOnlyHeaderContainer = styled(HeaderContainer)({
  [md.min]: {
    display: 'none'
  }
})

const LargeOnlyTitle = styled.div({
  'h1': {
    marginBottom: 0,
    fontSize: 24,
    textAlign: 'left',
  },
  [sm.max]: {
    display: 'none'
  }
})

const HomeLink = styled.span({
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
})

const RightLinkWrapper = styled.div({ display: 'flex' });

const MenuLink = styled(HomeLink)(
  { fontSize: 14, marginLeft: 12 },
  ({ current }) => (current ? {
    cursor: 'default',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'none'
    }
  } : {})
);

const Header = ({ title, hideOnSm }) => {
  const router = useRouter();

  const { pathname } = router;

  const renderRightMenu = (path, title) => {
    return pathname === path ? <MenuLink current>{title}</MenuLink> : <Link href={path} passHref><MenuLink>{title}</MenuLink></Link>
  }

  return (
    <>
      <HeaderWrapper hideOnSm={hideOnSm}>
        <LargeOnlyHeaderContainer>
          <Link href="/" passHref>
            <HomeLink>Pokemon List App</HomeLink>
          </Link>
          <RightLinkWrapper>
            {renderRightMenu('/pokemons', 'All Pokemons')}
            {renderRightMenu('/my-pokemon', 'My collections')}
          </RightLinkWrapper>
        </LargeOnlyHeaderContainer>
        {!hideOnSm && <SmallOnlyHeaderContainer>{title}</SmallOnlyHeaderContainer>}
      </HeaderWrapper>
      {!hideOnSm && <LargeOnlyTitle><h1>{title}</h1></LargeOnlyTitle>}
    </>
  )
}

export default Header;