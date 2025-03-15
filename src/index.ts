import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 5000 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send("Connection has completed");

  ws.on("message", (message) => {
    console.log(`Recieved: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});

console.log("WebSocket-server started");
