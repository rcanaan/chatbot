// server/src/server.ts
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import cors from "cors"; // Import cors

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;

// Use the cors middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/build")));

// A simple route to test the server
app.get("/api", (req, res) => {
  res.send("Socket.io Chat Server");
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle chat message event
  socket.on("chat-message", (msg: string) => {
    console.log("Received message:", msg);
    io.emit("chat-message", ` ${socket.id.substring(0, 5)}: ${msg}`); // Broadcast message to all connected clients
  });

  socket.on("delete-message", (id: string) => {
    console.log("Message deleted:", id);
    io.emit("delete-message", id);
  });
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// All other routes should serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
