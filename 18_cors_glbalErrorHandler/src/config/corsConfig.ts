import cors from "cors";

function corsConfiguration() {
  return cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"], //Headers the client is allowed to send
    exposedHeaders: ["Authorization", "X-Total-Count"], //Headers the browser is allowed to READ
    credentials: true,
    maxAge: 3600 * 24, //1 day
    preflightContinue: false, //Whether to pass OPTIONS request to next middleware
    optionsSuccessStatus: 204,
  });
}

export default corsConfiguration;
