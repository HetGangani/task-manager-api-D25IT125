require("dotenv").config();
const NodeCache = require("node-cache");

// Configurable TTL from environment variable CACHE_TTL (defaults to 60 seconds)
const envTTL = parseInt(process.env.CACHE_TTL, 10);
const stdTTL = !isNaN(envTTL) && envTTL > 0 ? envTTL : 60;

// Initialize NodeCache with configurable default TTL (checkperiod: 120s for automatic cleanup)
const cache = new NodeCache({
    stdTTL,
    checkperiod: Math.max(stdTTL * 2, 120)
});

module.exports = cache;


