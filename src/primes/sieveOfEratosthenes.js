import { assertValidCount } from "../primes/assertValidCount.js";


/**
 * The alogrithm for generating primes. 
 * Generates the first `count` prime numbers using the Sieve of Eratosthenes algorithm.
 * This is a classic algorithm for generating primes. A sieve finds all primes up to a limit,
 * but we don\'t know the limit in advance, so we can start with a guess and double it until we find enough primes.
 * @param {number} count 
 * @returns {number[]} The first `count` prime numbers
 */
export function sieveOfEratosthenes(count) 
{
    // First, assert a valid count of n
    assertValidCount(count);

    // Start with a guess: there are 25 primes below 100
    let limit = 100;
    let primes = findPrimesUpTo(limit);

    // If we didn't find enough primes, double the limit and sieve again
    while(primes.length < count)
    {
        limit = limit * 2;
        primes = findPrimesUpTo(limit);
    }

    // We may have found more primes than we need, so slice the array to the requested count
    return primes.slice(0, count);
}

/**
 * Finds all the prime numbers up to and including a given limit 
 * 
 * This is the core of the Sieve of Eratosthenes algorithm. It creates a boolean array
 * to cross out multiples of each prime number, leaving only primes.
 * The algorithm is O(n log log n) in time complexity. 
 * @param {number} limit - The upper limit to find primes up to (inclusive)
 * @returns {number[]} - An array of all prime numbers up to and including the limit 
 */
function findPrimesUpTo(limit)
{
    // One true/false flag per number, all started as not crossed out (true)
    const isCrossedOut = new Array(limit + 1).fill(false);
    const primes = [];

    // Loop through all numbers from 2 to the limit
    for (let number = 2; number <= limit; number++)
    {
        // If the number is not crossed out, it is prime
        if (!isCrossedOut[number]) {

            primes.push(number);

            // Cross out its multiples. We can start at number * number, because smaller
            // multiples will have already been crossed out by smaller primes (e.g., 2, 3, 5, etc.)
            for (let multiple = number * number; multiple <= limit; multiple += number) {
                isCrossedOut[multiple] = true;
            }
        }
    }

    return primes;
}