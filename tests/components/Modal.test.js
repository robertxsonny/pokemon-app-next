import { render } from '@testing-library/react';
import Modal from '../../components/Modal';

describe('Modal component', () => {
  test('Should render modal if open', () => {
    const { container } = render(<Modal open>Modal Content Goes Here</Modal>);
    expect(container).toMatchSnapshot();
  })

  test('Should render modal with title if open', () => {
    const { container } = render(<Modal open title="Modal Title">Modal Content Goes Here</Modal>);
    expect(container).toMatchSnapshot();
  })

  test('Should render modal with emoji if open', () => {
    const { container } = render(<Modal open emoji="😃" title="Modal Title">Modal Content Goes Here</Modal>);
    expect(container).toMatchSnapshot();
  })

  test('Should not render modal if not open', () => {
    const { container } = render(<Modal open={false}>Modal Content Goes Here</Modal>);
    expect(container).toMatchSnapshot();
  })
})