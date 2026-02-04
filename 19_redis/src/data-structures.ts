import client from "./redis/redis-config";

async function testDataStructureRedis() {
  try {
    await client.connect();
    // console.log("redis client connected");
    // Strings  -> SET, GET, MSET(set multiple values), MGET(get multiple values)
    // await client.set("user:name", "Rahul");
    // const name = await client.get("user:name");
    // const noOfKeysWhichAreRemoved = await client.del("user:name");
    // console.log("noOfKeysWhichAreRemoved :", noOfKeysWhichAreRemoved);
    // await client.MSET([
    //   "user:name",
    //   "Rahul",
    //   "user:age",
    //   "26",
    //   "user:email",
    //   "sandeep@gmail.com",
    // ]);
    // const [userName, age, email] = await client.mGet([
    //   "user:name",
    //   "user:age",
    //   "user:email",
    // ]);
    // console.log(userName, age, email);

    //List --> LPUSh(insert at begin), RPUSH(insert at end), LRANGE(retrive from a specific range), LPOP, RPOP(remove at last element)
    // const notes = await client.LPUSH("notes", ["note1", "note2", "note3"]);
    // console.log(notes);
    // const notes = await client.lRange("notes", 0, -1);
    // const lPOP = await client.lPop("notes");
    // console.log(lPOP);
    // const rPOP = await client.rPop("notes");
    // const lPOP = await client.lPop("notes");
    // console.log(rPOP);
    // console.log(lPOP);
    // console.log(notes);
    // const rpush = await client.rPush("notes", ["note1"]);
    // console.log(rpush);

    //SETS --> SADD(ADD 1 OR MORE MEMBERS), SMEMBERS(get all members), sIsMember(is member exists), Srem(remove 1 or more member)
    // await client.del("user:name");
    // await client.sAdd("user:name", ["rahul", "sandeep", "papa"]);
    // const names = await client.sMembers("user:name");
    // console.log(names);
    // const isRahulpresent = await client.sIsMember("user:name", "rahul");
    // console.log(isRahulpresent);
    // await client.sRem("user:name", "rahul");
    // console.log(await client.sMembers("user:name"));
    // const result = await client.del("user:name");
    // console.log(result);

    //Sorted Sets --> each member have score assosiated with them.
    //each data will be range according to the score.
    //zAdd(add elements with sorted score), zRange(get all members),getRank(get the rank/position), zrem(remove 1 or more member)
    // await client.zAdd("product:cart", [
    //   {
    //     value: "apple",
    //     score: 2,
    //   },
    //   {
    //     value: "mango",
    //     score: 3,
    //   },
    //   {
    //     value: "banana",
    //     score: 5,
    //   },
    // ]);
    const addGrape = await client.zAdd("product:cart", [
      { score: 10, value: "lichi" },
    ]);
    console.log(addGrape);
    const productCart = await client.zRange("product:cart", 0, -1);
    console.log(productCart);
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
  }
}

testDataStructureRedis();
