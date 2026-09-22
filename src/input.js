
// Tables bigger than this would be too wide to read in terminal
export const MAX_N = 1000;

/**
 * Turns what user typed into a valid number
 * @param {string | undefined} input 
 * @returns {number} - the number of primes to generate
 * @throws {Error} if the input is not valid
 */
export function parseN(input)
{
    const n = Number(input);

    if(!Number.isInteger(n) || n < 1 || n > MAX_N)
    {
        throw new Error(`N must be a whole number between 1 and ${MAX_N}`);
    }

    return n;
}