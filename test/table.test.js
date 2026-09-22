import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildTable, formatTable } from "../src/table.js";

describe("buildTable", () =>
{

    it("builds the example table from brief for [2, 3, 5]", () =>
    {

        assert.deepEqual(buildTable([2, 3, 5]), [
            ["", 2, 3, 5],
            [2, 4, 6, 10],
            [3, 6, 9, 15],
            [5, 10, 15, 25]
        ])
    });

    it("builds a 2x2 table for a singular prime", () => 
    {
        assert.deepEqual(buildTable([2]), [
            ["", 2],
            [2, 4]
        ]);
    });
});

describe("formatTable", () =>
{

    it("formats the example table from brief with the columns lined up", () => 
    {
        const expected = [
            "|    |  2 |  3 |  5 |",
            "|  2 |  4 |  6 | 10 |",
            "|  3 |  6 |  9 | 15 |",
            "|  5 | 10 | 15 | 25 |"
        ].join("\n");

        // Build the table and format it, then compare to the expected string
        assert.equal(formatTable(buildTable([2, 3, 5])), expected);
    });

    it("formats a simple single-prime table", () => 
    {
        assert.equal(formatTable(buildTable([2])), "|    |  2 |\n|  2 |  4 |");
    });

    it("keeps every line the same width, even for larger numbers", () =>
    {
        const firstTenPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        const lines = formatTable(buildTable(firstTenPrimes)).split("\n");

        assert.equal(lines.length, 11);

        for (const line of lines) {
            assert.equal(line.length, lines[0].length);
        }
    });
    
});

