require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/user";
import cardsRouter from "./routes/card";

const { errors } = require("celebrate");
const { port = 3000 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.body = {
    ...req.body,
    _id: "65537ecc91e292c3c2a585ea",
  };
  next();
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? "Ошибка сервера" : message });
});

app.listen(port, () => {
  console.log(`Открылся порт ${port}`);
});
