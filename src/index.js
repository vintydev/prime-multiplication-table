import {sieveOfEratosthenes} from "./primes/sieveOfEratosthenes.js";
import {buildTable, formatTable} from "./table.js";
import {parseN} from "./input.js";

// Actual command-line entry point for the program
try
{
    // Parse the command line argument to get the number of primes to generate
    const n = parseN(process.argv[2]);

    // Generate the first `n` prime numbers using the sieve of Eratosthenes
    const primes = sieveOfEratosthenes(n);

    // Build and format the table
    const table = buildTable(primes);
    const formattedTable = formatTable(table);

    // Print to console
    console.log(formattedTable);
}
catch(error)
{
    console.error(`Error: ${error.message}`);

    // Exit
    process.exitCode = 1;
}