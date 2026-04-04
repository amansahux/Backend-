const Redis = require("ioredis").default;

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Server is conected to redis");
});

redis.on("error", (err) => {
  console.error("Error occurred while connecting to redis:", err);
});

module.exports = redis;
