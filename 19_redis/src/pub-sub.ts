//publisher --> send a message
//subscriber --> consume a message
import client from "./redis/redis-config";

const subscriber = client.duplicate();
subscriber.subscribe("channel", (message) => {
  console.log("Received : ", message);
});

async function testPubSubRedis() {
  try {
    await client.connect();

    //subscriber
    await subscriber.connect();

    //publisher
    await client.publish("channel", "Hello world");
    await client.publish("channel", "My self sandeep");

    //delay
    await new Promise((res) => setTimeout(res, 5000));

    await subscriber.unsubscribe("channel");
  } catch (error) {
  } finally {
    await client.quit();
    await subscriber.quit();
  }
}

testPubSubRedis();
