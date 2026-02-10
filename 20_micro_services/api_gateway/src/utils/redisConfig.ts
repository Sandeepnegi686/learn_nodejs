import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();

// import { createClient } from "redis";

const url = process.env.REDIS_CLIENT_URL || "";
// const client = createClient({
//   url,
// });

// client.on("error", (err) => {
//   console.error("Redis Client Error", err);
// });

const client = new Redis(url);

export default client;
