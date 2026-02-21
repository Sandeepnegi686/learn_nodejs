import amqplib from "amqplib";
import logger from "./logger";

let connection = null;
let channel: any = null;

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

async function publishEvent(routingKey: string, message: string) {
  if (!channel) {
    await connectRabbitMQ();
  }
  channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(message)),
  );
  logger.info(`Event published: ${routingKey}`);
}

async function consumeEvent(routingKey: string, callback: any) {
  if (!channel) {
    await connectRabbitMQ();
  }
  const q = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(q.queue, EXCHANGE_NAME, routingKey);
  channel.consume(q.queue, (msg: any) => {
    if (msg !== null) {
      const content = msg.content.toString();
      callback(content);
      channel.ack(msg);
    }
  });
  logger.info(`subscribe to event : ${routingKey}`);
}

export { connectRabbitMQ, publishEvent, consumeEvent };
