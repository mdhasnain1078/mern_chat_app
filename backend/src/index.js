import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { app } from "./app.js";
import { Server } from "socket.io"; // Correct import statement
import colors from "colors";
import http from "http"; // Import http module
import path from "path";
import express from "express";

dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(
        ` Server is running at port : ${process.env.PORT}`.yellow.bold
      );
    });

    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
        // credentials: true,
      },
    });
    io.on("connection", (socket) => {
      console.log("connected to socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

      socket.on("new message", ({ newMessageRecieved, room }) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        // socket.to(room).emit("message recieved", newMessageRecieved);

        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;

          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected");
      });
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed !!! ", error);
  });
// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------
