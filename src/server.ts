import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { setupSocket } from "./sockets/socketHandler";

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

setupSocket(io);
const PORT = process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));