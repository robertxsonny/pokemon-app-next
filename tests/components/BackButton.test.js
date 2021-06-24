import { fireEvent, render, screen } from '@testing-library/react';

import BackButton from '../../components/BackButton';
import { useBreakpoints } from '../../hooks/breakpoints';

const mockBackFunction = jest.fn();

jest
  .mock('../../hooks/breakpoints', () => ({
    useBreakpoints: jest.fn()
  }))
  .mock('next/router', () => ({
  useRouter: () =>({
    back: mockBackFunction
  })
}))

describe('BackButton component', () => {
  test('Should render normal back button', () => {
    useBreakpoints.mockReturnValueOnce(true);
    const { container } = render(<BackButton />);
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByRole('button'));
    expect(mockBackFunction).toHaveBeenCalled();
  })

  test('Should render fixed back button', () => {
    useBreakpoints.mockReturnValueOnce(true);
    const { container } = render(<BackButton fixed />);
    expect(container).toMatchSnapshot();
  })

  test('Should not render back button on large', () => {
    useBreakpoints.mockReturnValueOnce(false);
    const { container } = render(<BackButton />);
    expect(container).toMatchSnapshot();
  })
})
