/**
 * Sort tools on their Value and fit in maximum weight
 * @param {any[]} tools 
 * @param {number} maxWeight 
 */
function whichToolsToCarry(tools, maxWeight) {
    tools.sort((priv, next) => next.value - priv.value);
    console.log(tools);

    let toolsToCarry = [];
    for (const tool of tools) {
        if (tool.weight <= maxWeight) {
            toolsToCarry.push(tool.name);
            maxWeight = maxWeight - tool.weight;
        }

        if (maxWeight === 0) break;
    }
    return toolsToCarry;
}

module.exports = whichToolsToCarry;