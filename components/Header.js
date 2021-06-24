import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useBreakpoints } from '../hooks/breakpoints';
import { sm } from '../styles/breakpoints';
import BackButton from './BackButton';

const HeaderWrapper = styled.header({
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
})

const HeaderContainer = styled.div({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 24px',
  boxSizing: 'border-box',
  fontSize: 20,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
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

const Header = ({ mobileTitle, hideOnSm }) => {
  const router = useRouter();
  const isSmallScreen = useBreakpoints('sm', 'down');

  const { pathname } = router;

  const renderRightMenu = (path, title) => {
    return pathname === path ? <MenuLink current>{title}</MenuLink> : <Link href={path} passHref><MenuLink>{title}</MenuLink></Link>
  }

  if (hideOnSm && isSmallScreen) {
    return null;
  }

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {isSmallScreen ? (
          <div>
            <BackButton />
            {mobileTitle}
          </div>
        ) : (
          <>
            <Link href="/" passHref>
              <HomeLink>Pokemon List App</HomeLink>
            </Link>
            <RightLinkWrapper>
              {renderRightMenu('/pokemons', 'All Pokemons')}
              {renderRightMenu('/my-pokemon', 'My Collections')}
            </RightLinkWrapper>
          </>
        )}
      </HeaderContainer>
    </HeaderWrapper>
  )
}

export default Header;