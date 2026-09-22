import {describe, it} from "node:test";
import assert from "node:assert/strict";
import {parseN, MAX_N} from "../src/input.js";

describe("parseN", () => 
{
    it("accepts whole numbers from 1 up to the maximum allowed", () =>
    {
        assert.equal(parseN("1"), 1);
        assert.equal(parseN("10"), 10);
        assert.equal(parseN(String(MAX_N)), MAX_N);
        
    });

    it("ignores spaces around the number", () => 
    {
        assert.equal(parseN("  1  "), 1);
    });

    it("rejects numbers that are too small or too large", () =>
    {
        for(const invalidInput of ["0", "-5", String(MAX_N + 1)])
        {
            assert.throws(() => parseN(invalidInput), {
                message: `N must be a whole number between 1 and ${MAX_N}`
            })

        }
    });

    it("rejects input that is missing, not a number, or not a whole number", () =>
    {
        for(const invalidInput of [undefined, "abc", "3.14", "NaN", "Infinity"])
        {
            assert.throws(() => parseN(invalidInput), {
                message: `N must be a whole number between 1 and ${MAX_N}`
            })
        }
    });

});