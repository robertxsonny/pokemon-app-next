import styled from '@emotion/styled';
import { sm } from '../styles/breakpoints';

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

const Header = ({ title, hideOnSm }) => (
  <HeaderWrapper hideOnSm={hideOnSm}>
    <HeaderContainer>
      {title}
    </HeaderContainer>
  </HeaderWrapper>
)

export default Header;