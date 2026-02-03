import redis from "redis";

const client = redis
  .createClient({
    host: "localhost",
    port: 6379,
  })
  .on("error", (err) => console.log(`Redis client error: ${err}`))
  .connect();
