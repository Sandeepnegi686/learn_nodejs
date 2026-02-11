import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();
const url = process.env.REDIS_CLIENT_URL || "";
const client = new Redis(url);
export default client;
