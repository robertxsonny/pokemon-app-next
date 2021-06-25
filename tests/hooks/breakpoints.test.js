import { renderHook, act } from '@testing-library/react-hooks';
import { useBreakpoints } from '../../hooks/breakpoints';

const mockWindowResize = (width) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

describe('breakpoint hooks', () => {
  test('Should calculate against window width on resize', () => {
    const { result } = renderHook(() => useBreakpoints('sm'));

    act(() => { mockWindowResize(400) })
    expect(result.current).toBe(false)

    act(() => { mockWindowResize(600) })
    expect(result.current).toBe(true)

    act(() => { mockWindowResize(800) })
    expect(result.current).toBe(false)
  })

  test('If down is specified, should also return true for width below breakpoints', () => {
    const { result } = renderHook(() => useBreakpoints('sm', 'down'));

    act(() => { mockWindowResize(400) })
    expect(result.current).toBe(true)

    act(() => { mockWindowResize(600) })
    expect(result.current).toBe(true)

    act(() => { mockWindowResize(800) })
    expect(result.current).toBe(false)
  })

  test('If up is specified, should also return true for width above breakpoints', () => {
    const { result } = renderHook(() => useBreakpoints('sm', 'up'));

    act(() => { mockWindowResize(400) })
    expect(result.current).toBe(false)

    act(() => { mockWindowResize(600) })
    expect(result.current).toBe(true)

    act(() => { mockWindowResize(800) })
    expect(result.current).toBe(true)
  })

  test('Should always return false for unknown breakpoints', () => {
    const { result } = renderHook(() => useBreakpoints('xx'));

    act(() => { mockWindowResize(400) })
    expect(result.current).toBe(false)

    act(() => { mockWindowResize(600) })
    expect(result.current).toBe(false)

    act(() => { mockWindowResize(800) })
    expect(result.current).toBe(false)
  })
})