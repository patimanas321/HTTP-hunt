const dotEnv = require("dotenv");
const Transport = require('./src/Transport');
const Challenge = require('./src/Challenge');

dotEnv.config();
Transport.config();

async function Start() {
    const challenge = await Challenge.getNextChallenge();
    console.log(challenge);
}
Start();