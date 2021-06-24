import { useLayoutEffect, useState } from 'react';
import { xs, sm, md, lg, xl } from '../styles/breakpoints';

export const useBreakpoints = (breakpoint, layoutDir) => {
  const [width, setWidth] = useState(undefined);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoints = { xs, sm, md, lg, xl }
  
  if (!breakpoints.hasOwnProperty(breakpoint)) {
    return false;
  }

  const { min, max } = breakpoints[breakpoint];

  if (layoutDir === 'up') { return width >= min; }
  if (layoutDir === 'down') { return width <= max; }
  return (width >= min && width <= max);
}