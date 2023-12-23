import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
dotenv.config()
const { SERVER_PORT, MONGOODB_URL } = process.env;
const app = express();
app.use(cors({ origin: true }));
app.use(cookieParser())
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  '/api/portfolio',userRouter);
const startServer = async () => {
  try {
    await connect(MONGOODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(">>> Connected to MongoDB");

    app.listen(SERVER_PORT || 5000, () => {
      console.log(`>>> Listening on port ${SERVER_PORT || 5000}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

startServer();
