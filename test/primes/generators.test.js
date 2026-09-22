import { describe, it } from "node:test";
import assert from "node:assert";
import { primeGenerators } from "../../src/primes/index.js";

// Define first ten prime numbers as a constant for testing
const FIRST_TEN_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

// Every algorithm must pass exactly the same tests, 
// so we can loop through the algorithms and run the same tests for each one
// through this suite
for (const [name, generatePrimes] of Object.entries(primeGenerators)) 
{
    describe(`Prime generator: ${name}`, () =>
    {
        it("returns [2] for a count of 1", () =>
        {
            assert.deepEqual(generatePrimes(1), [2]);
        });

        it("returns the first ten primes", () => {
            assert.deepEqual(generatePrimes(10), FIRST_TEN_PRIMES);
        });

        it("returns exactly the number of primes asked for", () => {
            assert.equal(generatePrimes(count).length, count);
        });

        it("returns the correct 1,000th prime (7,919)", () => {
            assert.equal(generatePrimes(1000)[999], 7919);
        });

        it("returns the correct 10,000th prime (104,729)", () => {
            assert.equal(generatePrimes(10000)[9999], 104729);
        });

        it("rejects a count that is not a positive whole number", () => {
            for (const invalidCount of [0, -1, 2.5, NaN, Infinity, "string", null, undefined]) {
                assert.throws(() => generatePrimes(invalidCount), {
                    name: "Error",
                    message: "Count must be a positive whole number"
                });
            }   
        })
    });
}