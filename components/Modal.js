import styled from '@emotion/styled';
import { sm } from '../styles/breakpoints';
import { Emoji } from '../styles/shared';

const ModalContainer = styled.div({
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999
})

const ModalContent = styled.div({
  backgroundColor: 'white',
  width: '100%',
  height: 'auto',
  maxWidth: 320,
  maxHeight: 480,
  margin: 48,
  padding: 24,
  boxSizing: 'border-box',
  borderRadius: 6,
  fontSize: 13,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [sm.down]: {
    margin: 24
  }
})

const ModalTitle = styled.h3({
  fontSize: 16,
  marginTop: 0,
  textAlign: 'center'
})

const Modal = ({ children, open, title, emoji }) => {
  if (!open) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent data-testid="modal">
        {emoji && <Emoji role="img" aria-label={title}>{emoji}</Emoji>}
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </ModalContent>
    </ModalContainer>
  )
}

export default Modal;