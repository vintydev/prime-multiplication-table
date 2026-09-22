
/**
 * Guards the contract shared by every prime generator:
 * `count` must be a whole number of at least 1
 * @param {number} count 
 * @throws {Error} if count is not a positive integer
 */
export function assertValidCount(count)
{
    if (!Number.isInteger(count) || count < 1) {
        throw new Error("Count must be a positive whole number");
    }
}