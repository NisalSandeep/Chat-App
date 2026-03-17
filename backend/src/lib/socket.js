import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
}); // on top of the express server we use socket.io

//apply authencation middleware

io.use(socketAuthMiddleware);


// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  const sockets = userSocketMap[userId];
  if (!sockets || sockets.size === 0) return null;
  return [...sockets][0];
}

//thi is for stroing online users
const userSocketMap = {}; // { userId: Set<socketId> }

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName); // if we didn't have above middleware  have this line this will be undefined

  const userId = socket.userId;
  if (!userSocketMap[userId]) {
    userSocketMap[userId] = new Set();
  }
  userSocketMap[userId].add(socket.id);

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //listen connection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);

    const sockets = userSocketMap[userId];
    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        delete userSocketMap[userId];
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});


export {io, app, server};