import { WebSocketServer } from "ws";
import { InitialConnection, Message } from "./types/message.type";
import { ChannelsList } from "./types/channelsObject.type";
import { initialConnectionController } from "./controllers/initialConnection.controller";
import { ClientsArray } from "./types/clientsArray.type";

const wss = new WebSocketServer({ port: 5000 });



wss.on("connection", (ws) => {
  console.log("Client connected");

  const clients: ClientsArray[] = []

  ws.send("Connection has completed");

  ws.on("message", async (message: string) => {
    const json = JSON.parse(message.toString());
    if(!json.header || typeof json.header !== 'string'){
        ws.send(JSON.stringify({header:"error", error: "header is required"}));
        return;
    }
    const messageData = json as Message;
    switch(messageData.header){
        case "ChatConnection":{
          break;
        }
        case "InitialConnection": {
          initialConnectionController(ws, messageData as InitialConnection, clients);
        }
    }
  });

  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});

console.log("WebSocket-server started");


// {
//   "client": ws,
//   "name": "gg"
// }