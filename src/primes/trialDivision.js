
import { assertValidCount } from "./assertValidCount.js";

/**
 * Generates the first `count` prime numbers using trial division
 * 
 * Each candidate is tested by dividing it by the primes found so far
 * We only need to try primes up to the square root of the candidate: if n = a * b,
 * one of a or b must be <= sqrt(n).
 * 
 * This is simpler than the sieve technique but slower for large counts.
 * It exists as an alterantive strategy and as independent check on the sieve in the tests.
 * 
 * @param {number} count - the number of primes to generate
 * @returns {number[]} The first `count` prime numbers
 */
export function trialDivision(count)
{
    // First, assert a valid count of n
    assertValidCount(count);

    // Init empty array to hold the primes found so far
    const primes = [];

    // Loop through candidates starting at 2, until we have found `count` primes
    for (let candidate = 2; primes.length < count; candidate++) {

        // Test if the candidate is prime, given the primes found so far
        if (isPrime(candidate, primes)) {
            primes.push(candidate);
        }
    }

    return primes;
}

/**
 * Function to test if a candidate number is prime, given an array of smaller primes
 * 
 * We only need to test divisibility by primes up to the square root of the candidate
 * @param {number} candidate 
 * @param {number[]} smallerPrimes - Every prime below the candidate, in ascending order
 * @returns {boolean} true if the candidate is prime, false otherwise
 */
function isPrime(candidate, smallerPrimes)
{
    // Loop through the smaller primes and test for divisibility
    for (const prime of smallerPrimes) {

        // If the prime is greater than the square root of the candidate,
        // the candidate is prime (we've found no divisors)
        if (prime * prime > candidate) {
            return true;
        }

        // If the candidate is divisible by a smaller prime, it is not prime, return false
        if (candidate % prime === 0) {
            return false;
        }

    }

    // If we get here, the candidate is prime (we've found no divisors)
    return true;
}