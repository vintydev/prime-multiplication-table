import {trialDivision} from "./trialDivision.js";

// Create an object to hold the prime generators
// freeze it to prevent modification
export const primeGenerators = Object.freeze({
    'trial-division': trialDivision
})