import client from "./redis/redis-config";

async function pipelineTransactionRedis() {
  try {
    await client.connect();

    // const pipelines = client.multi();
    // pipelines.set("value", 10);
    // pipelines.incrBy("value", 10);
    // pipelines.get("value");
    // const results = await pipelines.exec();
    // console.log(results);

    //Transactions MULTI, EXEC, DISCARD, WATCH
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
}

pipelineTransactionRedis();
