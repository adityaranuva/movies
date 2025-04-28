
function parseBudgetToUSD(budget) {
    return `$${Number(budget).toLocaleString('en-US')}`;
}

module.exports = { parseBudgetToUSD };
