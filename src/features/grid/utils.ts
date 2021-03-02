/**
 * ensure `min <= n <= max`
 */
export const clamp = (n: number, min: number, max: number): number => Math.max(Math.min(n, max), min);

/**
 * get pseudo random index in range `[0; maxExcl)`
 */
export const getPseudoRandomIdx = (maxExcl: number): number => Math.round(Math.random() * (maxExcl - 1));

/**
 * convert from 2D to 1D index
 */
export const to1DIdx = (cols: number) => (i: number, j: number): number => i * cols + j;
