# WebSocket API

## Overview
This project implements a **WebSocket API** using **Node.js, TypeScript, and Socket.IO**. It provides real-time bidirectional communication between clients and the server. Users can join rooms, send messages, and receive updates in real time.

## Features
- **WebSocket Connection**: Establishes a connection between clients and the server.
- **Join Rooms**: Users can join specific rooms.
- **Send & Receive Messages**: Messages are broadcasted within rooms.
- **Automatic Disconnection Handling**: Logs when a user disconnects.

## Technologies Used
- **Node.js**
- **TypeScript**
- **Express.js**
- **Socket.IO**

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Dhananjay5233/Websocket-Api.git
   cd Websocket-Api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the server:**
   ```sh
   npm run dev
   ```

## WebSocket Events

### 1️⃣ **Connection**
- When a client connects, it logs:
  ```
  User connected: <socket_id>
  ```

### 2️⃣ **Join Room**
- Event: `joinRoom`
- Payload: `{ room: "room-name" }`
- Example:
  ```ts
  socket.emit("joinRoom", "Room1");
  ```
- Server logs:
  ```
  User <socket_id> joined room: Room1
  ```

### 3️⃣ **Send Message**
- Event: `message`
- Payload: `{ room: "room-name", message: "Hello!" }`
- Example:
  ```ts
  socket.emit("message", { room: "Room1", message: "Hello!" });
  ```
- The server then broadcasts the message to all users in that room.

### 4️⃣ **Disconnect**
- When a client disconnects, it logs:
  ```
  User disconnected: <socket_id>
  ```

## Testing WebSockets
### **Using WebSocket King**
1. Open [WebSocket King](https://websocketking.com/).
2. Connect to `ws://localhost:8000`.
3. Send test events like `joinRoom` and `message`.

## License
This project is licensed under the **MIT License**.

## Author
Developed by **Dhananjay Bedarkar**.

