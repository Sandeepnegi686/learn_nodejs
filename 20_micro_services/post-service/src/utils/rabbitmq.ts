import amqplib from "amqplib";
import logger from "./logger";

let connection = null;
let channel = null;

const EXCHANGE_NAME = "social_event";
const RABIT_MQ = process.env.RABIT_MQ || "";

async function connectRabbitMQ() {
  try {
    connection = await amqplib.connect(RABIT_MQ);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: false });
    logger.info("Connected to Rabbit MQ");
    return channel;
  } catch (error) {
    logger.error("Error connecting to rabbitMQ: ", error);
  }
}

export default connectRabbitMQ;
