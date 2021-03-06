/**
 * Sort Tools for Lara based on their usage time
 * @param {any[]} toolsUsage 
 */
function sortToolsOnUsage(toolsUsage) {
    const totalUsedTime = {};
    for (const toolUsage of toolsUsage) {
        const timeUsedInMinutes = getTimeDifferenceInMinutes(toolUsage.useStartTime, toolUsage.useEndTime);
        totalUsedTime[toolUsage.name] = (totalUsedTime[toolUsage.name] || 0) + timeUsedInMinutes;
    }

    const resp = [];
    for (const key in totalUsedTime) {
        if (totalUsedTime.hasOwnProperty(key)) {
            resp.push({
                name: key,
                timeUsedInMinutes: totalUsedTime[key]
            });
        }
    }

    resp.sort((priv, next) => next.timeUsedInMinutes - priv.timeUsedInMinutes);
    return resp;
}

/**
 * Calculate Time difference between Two date values
 * @param {string} startTime 
 * @param {string} endTime 
 */
function getTimeDifferenceInMinutes(startTime, endTime) {
    const diff = Math.abs(new Date(startTime) - new Date(endTime));
    return Math.floor((diff / 1000) / 60);
}

module.exports = sortToolsOnUsage;