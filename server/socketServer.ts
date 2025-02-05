import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["https://it-client.vercel.app", "http://localhost:3000"], // Allowed origins
      methods: ["GET", "POST"], // Allowed HTTP methods
      credentials: true, // Allow cookies and credentials
    },
    transports: ["websocket", "polling"], // Transport options
  });

  // Event listener for new connections
  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Listen for 'notification' event from clients
    socket.on("notification", (data) => {
      console.log("Received notification:", data);

      // Broadcast the notification to all clients
      io.emit("newNotification", data);
    });

    // Handle client disconnection
    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
    });
  });

  // Log Socket.IO initialization success
  console.log("Socket.IO server initialized");
};
