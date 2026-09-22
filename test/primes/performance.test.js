import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sieveOfEratosthenes } from "../../src/primes/sieveOfEratosthenes.js";

// Performance test for the Sieve of Eratosthenes algorithm
describe("Sieve of Eratosthenes performance", () =>
{
    it("generate 100,000 primes in under 1 second", () =>
    {
        const start = performance.now();
        const primes = sieveOfEratosthenes(100000);
        const timeTaken = performance.now() - start;
     
        // Check that we got the correct 100,000th prime (1,299,709)
        assert.equal(primes[99999], 1299709);

        // Check that it took less than 1 second
        assert.ok(timeTaken < 1000, `took ${Math.round(timeTaken)}ms`);
    });
});