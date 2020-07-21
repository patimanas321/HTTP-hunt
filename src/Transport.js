const axios = require('axios');

class Transport {
    static instance;

    static config() {
        this.instance = axios.create({
            baseURL: process.env.HTTP_HUNT_BASE_URL,
            headers: { 'userId': process.env.HTTP_HUNT_USER_ID }
        });
    }
}

module.exports = Transport;