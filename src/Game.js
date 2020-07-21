const ChallengeService = require('./services/ChallengeService');
const decryptMessage = require('./helpers/decryptMessage');
const findHiddenTools = require('./helpers/findHiddenTools');
const sortToolsOnUsage = require('./helpers/sortToolsOnUsage');
const whichToolsToCarry = require('./helpers/whichToolsToCarry');

class Game {
    static async play() {
        //await this.getNextChallenge();
        //await this.stageOne();

        // await this.getNextChallenge();
        // await this.stageTwo();

        // await this.getNextChallenge();
        // await this.stageThree();

        await this.getNextChallenge();
        await this.stageFour();
    }

    static async getNextChallenge() {
        const challengeDescription = await ChallengeService.getNextChallengeDescription();
        this.printChallengeDescription(challengeDescription);
    }

    static printChallengeDescription(description) {
        console.log(`***************************** STAGE ${description.stage} *****************************`);
        console.log(description.statement);
    }

    static async stageOne() {
        const challenge = await ChallengeService.getNextChallenge();
        this.printStageOneDescription(challenge);
        const decryptedMessage = decryptMessage(challenge.encryptedMessage, challenge.key);
        console.log('DECRYPTED MESSAGE : ', decryptedMessage);
        const response = await ChallengeService.completePreviousChallenge({
            message: decryptedMessage
        });
        this.printSuccessMessage(response.data.message);
    }

    static printStageOneDescription(challenge) {
        console.log(`***************************** YOUR TASK *****************************`);
        console.log(`Encrypted Message: ${challenge.encryptedMessage}`);
        console.log(`Encryption Key:    ${challenge.key}`);
    }

    static async stageTwo() {
        const challenge = await ChallengeService.getNextChallenge();
        this.printStageTwoDescription(challenge);
        const hiddenTools = findHiddenTools(challenge.hiddenTools, challenge.tools);
        console.log('HIDDEN TOOLS : ', JSON.stringify(hiddenTools));

        const response = await ChallengeService.completePreviousChallenge({
            toolsFound: hiddenTools
        });
        this.printSuccessMessage(response.data.message);
    }

    static printStageTwoDescription(challenge) {
        console.log(`***************************** YOUR TASK *****************************`);
        console.log(`Hidden Tools: ${challenge.hiddenTools}`);
        console.log(`Tools:        ${JSON.stringify(challenge.tools)}`);
        console.log('*********************************************************************');
    }

    static async stageThree() {
        const challenge = await ChallengeService.getNextChallenge();
        this.printStageThreeDescription(challenge);
        const sortedToolsOnUsage = sortToolsOnUsage(challenge.toolUsage);
        console.log('TOOLS SORTED AS PER USAGE : ', JSON.stringify(sortedToolsOnUsage));

        const response = await ChallengeService.completePreviousChallenge({
            toolsSortedOnUsage: sortedToolsOnUsage
        });
        this.printSuccessMessage(response.data.message);
    }

    static printStageThreeDescription(challenge) {
        console.log(`***************************** YOUR TASK *****************************`);
        console.log('Tools Usage:');
        for (const toolUsage of challenge.toolUsage) {
            console.log(JSON.stringify(toolUsage));
        }
        console.log('*********************************************************************');
    }

    static async stageFour() {
        const challenge = await ChallengeService.getNextChallenge();
        this.printStageFourDescription(challenge);
        const toolsToCarry = whichToolsToCarry(challenge.tools, challenge.maximumWeight);
        console.log('TOOLS SHE SHOULD CARRY : ', JSON.stringify(toolsToCarry));

        const response = await ChallengeService.completePreviousChallenge({
            toolsToTakeSorted: toolsToCarry
        });
        this.printSuccessMessage(response.data.message);
    }

    static printStageFourDescription(challenge) {
        console.log(`***************************** YOUR TASK *****************************`);
        console.log('Tools : ');
        for (const tool of challenge.tools) {
            console.log(JSON.stringify(tool));
        }
        console.log(`Maximum Weight : ${challenge.maximumWeight}`);
        console.log('*********************************************************************');
    }

    static printSuccessMessage(message) {
        console.log(`***************************** CONGRATULATIONS *****************************`);
        console.log(message);
        console.log('***************************************************************************');
    }
}

module.exports = Game;