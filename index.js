const dotEnv = require("dotenv");
const Transport = require('./src/Transport');
const Game = require('./src/Game');

dotEnv.config();
Transport.config();

async function Start() {
    await Game.play();
}
Start();