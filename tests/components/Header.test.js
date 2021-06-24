import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import Header from '../../components/Header';
import { useBreakpoints } from '../../hooks/breakpoints';

jest
  .mock('../../hooks/breakpoints', () => ({
    useBreakpoints: jest.fn()
  }))
  .mock('next/router', () => ({
    useRouter: jest.fn(() => ({ pathname: '/' }))
  }))

describe('Header component', () => {
  test('Should render all components in large screen', () => {
    useBreakpoints.mockReturnValueOnce(false);
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  })

  test('Should render header menu in active state if the current page matches with the link', () => {
    useBreakpoints.mockReturnValueOnce(false);

    useRouter.mockReturnValueOnce({ pathname: '/pokemons' });
    const { container, rerender } = render(<Header />);
    expect(container).toMatchSnapshot();

    useRouter.mockReturnValueOnce({ pathname: '/my-pokemon' });
    rerender(<Header />);
    expect(container).toMatchSnapshot();
  })

  test('Should render title and back button in small screen', () => {
    useBreakpoints.mockReturnValueOnce(true);
    const { container } = render(<Header mobileTitle="Mobile" />);
    expect(container).toMatchSnapshot();
  })

  test('Should not render header in small screen if is set to hide on small screen', () => {
    useBreakpoints.mockReturnValueOnce(true);
    const { container } = render(<Header mobileTitle="Mobile" hideOnSm />);
    expect(container).toMatchSnapshot();
  })
});