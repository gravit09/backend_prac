import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
//Cors setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//setting limit of data sent by user using form
app.use(express.json({ limit: "16kb" }));
//handling data sent by url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//for handling my static/public assets like image
app.use(express.static("public"));
//allow us to perform crud on user browser cookies
app.use(cookieParser());

//routes

import userRouter from "./routes/user.routes.js";

//route decleration
//whenever user get to users route userRouter will handle from there
app.use("/api/v1/users", userRouter);

export { app };
