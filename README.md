# Prime Multiplication Table

A Node.js command-line app that takes a whole number **N** and prints a multiplication table of the first N prime numbers.

```
$ npm start -- 3

|    |  2 |  3 |  5 |
|  2 |  4 |  6 | 10 |
|  3 |  6 |  9 | 15 |
|  5 | 10 | 15 | 25 |
```

<details>
<summary>Output for N = 10</summary>

```
|     |   2 |   3 |   5 |   7 |  11 |  13 |  17 |  19 |  23 |  29 |
|   2 |   4 |   6 |  10 |  14 |  22 |  26 |  34 |  38 |  46 |  58 |
|   3 |   6 |   9 |  15 |  21 |  33 |  39 |  51 |  57 |  69 |  87 |
|   5 |  10 |  15 |  25 |  35 |  55 |  65 |  85 |  95 | 115 | 145 |
|   7 |  14 |  21 |  35 |  49 |  77 |  91 | 119 | 133 | 161 | 203 |
|  11 |  22 |  33 |  55 |  77 | 121 | 143 | 187 | 209 | 253 | 319 |
|  13 |  26 |  39 |  65 |  91 | 143 | 169 | 221 | 247 | 299 | 377 |
|  17 |  34 |  51 |  85 | 119 | 187 | 221 | 289 | 323 | 391 | 493 |
|  19 |  38 |  57 |  95 | 133 | 209 | 247 | 323 | 361 | 437 | 551 |
|  23 |  46 |  69 | 115 | 161 | 253 | 299 | 391 | 437 | 529 | 667 |
|  29 |  58 |  87 | 145 | 203 | 319 | 377 | 493 | 551 | 667 | 841 |
```

</details>

## How to run

You need **Node.js 22 or later**. There is nothing to install: the project has no dependencies. This was done on purpose to make the app as simple as possible to run and understand.

```bash
git clone https://github.com/vintydev/prime-multiplication-table.git
cd prime-multiplication-table

npm start -- 10      # print the table for N = 10
npm test             # run the tests
npm run coverage     # run the tests and show test coverage
```

N must be a whole number from 1 to 1,000. Anything else prints an error message and exits with a failure code:

```
$ npm start -- abc
Error: N must be a whole number between 1 and 1000
```

The upper limit of 1,000 is about what can be read on screen, not about speed per se: the table has N x N cells, so N = 1,000 is already a million of them. Generating the primes themselves is far quicker than that (see below).

## How it works

The app runs the same few steps in order, and each one lives in it's own small module:

```
N --> check the input --> generate the primes --> build the table --> format it --> print
      input.js            primes/               table.js            table.js
```

| File | What it does |
| --- | --- |
| `src/index.js` | Entry point. Reads N from the command line, runs the steps, prints the table or an error. |
| `src/input.js` | Turns what the user typed into a valid N, or throws an error explaining why it isn't. |
| `src/primes/sieveOfEratosthenes.js` | Generates primes with a sieve. This is the algorithm the app uses. |
| `src/primes/trialDivision.js` | A second, simpler prime algorithm. |
| `src/primes/assertValidCount.js` | The rule every prime algorithm shares: the count must be a whole number of at least 1. |
| `src/primes/index.js` | The registry of available prime algorithms. |
| `src/table.js` | Builds the grid of numbers, then turns it into lined-up text. |

Keeping these apart was purposeful and means that the math logic, layout and terminal handling can be each changed or tested without touching the others. The app is small enough that it can be read in a few minutes, and the tests are small enough that they can be read in a few more minutes.

## Generating the Primes

The Sieve of eratosthenes works like crossing numbers off a list, and is a proven and efficient algorithm for generating primes. It is the one used in this app for the sake of speed. It works by creating a list of numbers from 2 to some upper limit, then repeatedly crossing off the multiples of each prime number starting from 2. The remaining numbers in the list are the prime numbers.

Two details worth pointing out:

- **Crossing out starts at `number * number`.** Any smaller mulitple has a smaller prime factor and has already been crossed out. For example, for 5, the multiples 10, 15 and 20 were already handled by 2 and 3, so the first one left is 25.
- **The flags are kept in a `Uint8Array`.** This uses one byte per number instead of a full JavaScript value, which is more memory efficient for this type of algorithm that needs to keep track of a large number of boolean flags.

A sieve needs a limit, but the problem asks for the first N primes, and you can't tell in advance how big the Nth prime is. The code starts with a limit of 100, and doubles it until the sieve returns enough primes, then takes the first N. This is a simple and effective way to ensure that the algorithm can generate the required number of primes without needing to know their upper limit in advance.

### Adding another algorithm

Every prime algorithm is a function with the same shampe: give it a count, get back that many primes. To add one:

1. Create a new exported function in `src/primes/` that takes a count and returns an array of primes.
2. Add it to the `primeGenerators` registry in `src/primes/index.js` so it can be selected by name.

The shared test suite in `src/primes/__tests__/` will automatically run against any new algorithm added to the registry, ensuring that it behaves correctly and meets the requirements of the app. No new test code is needed when a new algorithm is added, as long as it follows the same interface and is added to the registry. **Trial division** is included as a second algorithm to show this, and a test checks that both algorithms return exactly the same primes. 

## Testing

The app has a comprehensive test suite. Tests use Node's built in test runner (`node --test`), so there is nothing additional needed to install. There are 23 tests, and `npm run coverage` reports **100% line, branch and function coverage** of the application logic.

- **The prime algorithms** share one test suite that runs against every registered algorithm: known values such as the 1,000th prime (7,919) and the 10,000th prime (104,729), the right number of primes returned, and invalid counts rejected.
- **A cross-check** confirms the sieve and trial division return identical results for the first 2,000 primes. Trial division is simple enough to trust, so agreement is good evidence the sieve is right too.
- **A performance test** checks that 100,000 primes are generated in under a second. The limit is deliberately generous so the test doesn't fail just because the machine running it is busy.
- **The table tests** check the exact output for the example in the brief, plus a single-prime table and that every line stays the same width as the numbers get longer.
- **The input tests** cover missing, empty, non-numeric, decimal, zero, negative and too-large values.

## How I developed the app

I used test-driven development to build the app. For each part, I comitted the tests first purposefully, so they fail at first. This was done to ensure the tests were actually testing the right thing, and to make sure that the code was being written to pass the tests, rather than the other way around. Following, I would commit the code to make the tests pass, optionally refactoring the code to make it cleaner or more efficient if needed. The commit history shows this as `test:` commits, followed by `feat:` commits. Later `perf:` commits improve the sieve, with the existing tests confirming nothing broke. Smaller adjustments, like formatting, are committed as `fix:`.

I built fromt he core outwards, essentially. The prime algorithms first, then the table, then the input checking, and finally the command-line entry point last, since it only wires around the finished pieces together. 

## What I'm pleased with

- Each part of the app is small and focused, and can be read and understood in a few minutes. The prime algorithms know nothing about the tables and the table code knows nothing about the terminal, so they can be changed or tested independently. Seperation of concerns was purposeful and worked well. 
- Adding another prime algorithm is very easy, only requring another function and a single line in the registry. The shared test suite automatically tests it, so no new test code is needed. This was also purposeful, and worked well.
- The output lines up for any number N, because every cell is padded to the same width as the largest number in the table. This was a bit fiddly to get right, but it works well and is easy to read on smaller numbers of N. 
- I measured the sieve rather than assuming it was fast. My first version was barely quicker than trial division in tests, so I changed where the crossing-out starts and switched to a `Uint8Array` for the flags. This made it about three times faster, and still passes all the tests.

## What I would do differently next time

- Add end-to-end tests that run the actual program itself, since `src/index.js` is the one piece that unit tests don't cover. 
- Work out the sieve's starting limit from N instead of having to double up from 100, so it usually sieves only once. This would be a small performance improvement. 
- Let the user pick the algorithm with a command-line option so they can see the difference in speed.
 