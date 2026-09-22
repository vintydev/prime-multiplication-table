import {trialDivision} from "./trialDivision.js";
import {sieveOfEratosthenes} from "./sieveOfEratosthenes.js";

// Create an object to hold the prime generators
// freeze it to prevent modification
export const primeGenerators = Object.freeze({
    'sieve-of-eratosthenes': sieveOfEratosthenes,
    'trial-division': trialDivision,
    
})