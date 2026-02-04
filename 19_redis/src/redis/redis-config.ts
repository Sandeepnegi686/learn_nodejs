import dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";

const url = process.env.REDIS_CLIENT_URL || "";
const client = createClient({
  url,
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export default client;
