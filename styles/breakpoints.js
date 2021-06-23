const generateBreakpoint = (bp) => ({ max: `@media (max-width: ${bp - 1}px)`, min: `@media (min-width: ${bp}px)` })

export const xs = generateBreakpoint(576);
export const sm = generateBreakpoint(768);
export const md = generateBreakpoint(992);
export const lg = generateBreakpoint(1200)