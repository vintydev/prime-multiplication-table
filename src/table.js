

/**
 * Builds a multiplication table from a list of numbers
 * 
 * The first row holds the column headers (with an empty cell in the top left corner)
 * the first column holds the row headers, and every other cell is row * column
 * @param {number[]} numbers - the numbers to multiply together (e.g., the first `count` prime numbers)
 * @returns {number[][]} - a 2D array representing the multiplication table
 */
export function buildTable(numbers)
{
    // Create the header row with an empty cell followed by the prime numbers
    // mutate the input array to avoid creating a new array
    const headerRow = ["", ...numbers];

    const bodyRows = numbers.map((rowNumber) =>
    {
        const products = numbers.map((columnNumber) => rowNumber * columnNumber);
        return [rowNumber, ...products];
    })

    return [headerRow, ...bodyRows];
}

/**
 * Turns the table into text, with each column lined up
 * @param {number[][]} table - a 2D array representing the multiplication table
 * @returns {string} - The table as lines of text (e.g., "|  2 |  3 |  5 |")
 */
export function formatTable(table)
{
    // The biggest number is always in the bototm right corner,
    // so its length will determine the width of all cells
    const lastRow = table[table.length - 1];
    const biggestNumber = lastRow[lastRow.length - 1];
    const cellWidth = Math.max(2, String(biggestNumber).length);

    return table.map((row) => formatRow(row, cellWidth)).join("\n");
}

/**
 * Formats one row, padding each cell to the left so numbers line up in columns
 * @param {(string|number)[]} row - an array of strings or numbers to format as a row 
 * @param {number} cellWidth 
 * @returns {string} - The row as a string, with each cell padded to the left
 */
function formatRow(row, cellWidth)
{
    const cells = row.map((cell) => String(cell).padStart(cellWidth));
    return "| " + cells.join(" | ") + " |";
}