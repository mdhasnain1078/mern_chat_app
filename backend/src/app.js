import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.Routes.js";
import chatRoutes from "./routes/chat.Routes.js";
import messageRoutes from "./routes/message.Routes.js";
//routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

export { app };
