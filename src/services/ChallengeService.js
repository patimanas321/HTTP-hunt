/**
 * Service to connect to game REST
 */

const Transport = require('../Transport');
const ChallengeDescription = require('../models/ChallengeDescription');

class Challenge {
    static async getNextChallengeDescription() {
        const response = await Transport.instance.get('/challenge');
        return new ChallengeDescription(response);
    }

    static async getNextChallenge() {
        const response = await Transport.instance.get('/challenge/input');
        return response.data || {};
    }

    static async completePreviousChallenge(payload) {
        const response = await Transport.instance.post('/challenge/output', payload);
        return response;
    }
}

module.exports = Challenge;