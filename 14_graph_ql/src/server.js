const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
require("dotenv").config();

const resolvers = require("./graphql/resolver");
const typeDefs = require("./graphql/schema");
const connectDb = require("./db/connectDB");

async function startServer() {
  try {
    await connectDb(process.env.DB_URL);
    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT },
    });
    console.log("server started at", url);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();
