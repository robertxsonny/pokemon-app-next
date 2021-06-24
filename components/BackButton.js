import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { useBreakpoints } from '../hooks/breakpoints';
import { TextButton } from '../styles/shared';

const LargeTextButton = styled(TextButton)(
  {
    fontSize: 20,
    fontWeight: 500,
    marginRight: 16
  },
  ({ fixed }) => (fixed ? {
    position: 'fixed',
    top: 12,
    left: 24,
    zIndex: 9
  } : {})
)

const BackButton = ({ fixed }) => {
  const { back } = useRouter();
  const isSmallScreen = useBreakpoints('sm', 'down');

  return isSmallScreen ? <LargeTextButton fixed={fixed} onClick={back}>&lt;</LargeTextButton> : null;
}

export default BackButton;
