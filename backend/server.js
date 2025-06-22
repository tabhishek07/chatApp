import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server);

io.use((socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new Error("Authentication error"));
    }
  
    socket.user = decoded; // Attach user info to the socket
    next();
  } catch (error) {
    console.error("Socket authentication error:", error);
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("a user connected ");
  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    /* … */
  });
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
