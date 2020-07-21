const Transport = require('./Transport');
const ChallengeResponse = require('./models/ChallengeResponse');

class Challenge {
    static async getNextChallenge() {
        const response = await Transport.instance.get('/challenge');
        return new ChallengeResponse(response);
    }
}

module.exports = Challenge;