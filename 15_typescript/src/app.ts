import express, { Express, Request, Response, NextFunction } from "express";

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

interface CustomeRequest extends Request {
  startTime?: number;
}
app.use("/", (req: CustomeRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  next();
});

app.get("/", (req: Request, res: Response) => res.send("Hello"));

interface User {
  name: string;
  email: string;
}
app.get(
  "/user",
  (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    // console.log(req);
    const name = req?.body.name;
    const email = req?.body.email;
    res.json({ message: `User created: ${name}-${email}` });
  }
);
app.get("/user/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = req?.params?.id;
  res.json({ message: `User id : ${id}` });
});

app.listen(PORT, () => console.log("Server Running"));
