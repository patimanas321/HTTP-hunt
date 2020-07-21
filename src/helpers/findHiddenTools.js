/**
 * Find all hidden tools
 * @param {string} hiddenTools 
 * @param {string[]} tools 
 */
function findHiddenTools(hiddenTools, tools) {
    const availableChars = {};
    for (const char of hiddenTools) {
        availableChars[char] = (availableChars[char] || 0) + 1;
    }

    const res = [];
    for (const tool of tools) {
        if (findATool(availableChars, tool)) {
            res.push(tool);
        }
    }
    return res;
}

/**
 * Check if tool exists in hidden tools
 * @param {Object} availableChars 
 * @param {string} tool 
 */
function findATool(availableChars, tool) {
    for (const char of tool) {
        if (availableChars[char]) {
            availableChars[char] = availableChars[char] - 1;
        } else {
            return false;
        };
    }
    return true;
}

module.exports = findHiddenTools;