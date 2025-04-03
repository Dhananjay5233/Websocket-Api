import { Server, Socket } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Handle any message event
    socket.on("message", (rawData: string) => {
      try {
        const data = JSON.parse(rawData); //  Parse JSON message
        if (!data || !data.event) {
          console.error("Invalid message format:", rawData);
          return;
        }

        if (data.event === "joinRoom") {
          if (!data.room) {
            console.error("Missing room:", data);
            return;
          }
          console.log(`User ${socket.id} joined room: ${data.room}`);
          socket.join(data.room);
          io.to(data.room).emit("message", { sender: "server", text: `User ${socket.id} joined room ${data.room}` });
        }

        if (data.event === "message") {
          if (!data.room || !data.message) {
            console.error(" Missing room or message:", data);
            return;
          }
          console.log(`Message received in room ${data.room}: ${data.message}`);
          io.to(data.room).emit("message", { sender: socket.id, text: data.message });
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
