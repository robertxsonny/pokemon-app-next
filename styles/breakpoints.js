const generateBreakpoint = (min, max) => ({
  min,
  max,
  down: min ? `@media (max-width: ${max}px)` : undefined,
  up: max ? `@media (min-width: ${min}px)` : undefined
})

export const xs = generateBreakpoint(0, 575);
export const sm = generateBreakpoint(576, 767);
export const md = generateBreakpoint(768, 991);
export const lg = generateBreakpoint(992, 1199);
export const xl = generateBreakpoint(1200);
