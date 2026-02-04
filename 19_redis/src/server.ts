import client from "./redis/redis-config";

async function testRedis() {
  try {
    await client.connect();
    console.log("client connected");

    //set a key
    // await client.set("name", "Sandeep");
    //get a key
    // const name = await client.get("name");
    // console.log("value is", name);
    // const noOfKeysWhichAreRemoved = await client.del("name");
    // console.log(noOfKeysWhichAreRemoved);

    // await client.set("number", 100);
    // const number = await client.get("number");
    // console.log(number);
    // const incrementedNumber = await client.incr("number"); //  incr, incrBy, decr, decrBy
    // console.log(incrementedNumber);
    // const noOfKeysWhichAreRemoved = await client.del("number");
    // console.log(noOfKeysWhichAreRemoved);
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
  }
}

testRedis();
