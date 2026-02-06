const firstName = "Jaya";
// console.log(firstName);

// const

import express from "express";
import indentityServiceRouter from "./routes/identity-service";

const app = express();

app.use(express.json());

app.use("/", indentityServiceRouter);
