
import { WebSocketServer } from "ws";
import { Message } from "./types/message.type";
import { ChannelsList } from "./types/channelsObject.type";

const wss = new WebSocketServer({ port: 5000 });



wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send("Connection has completed");

  ws.on("message", async (message) => {
    const json = JSON.parse(message.toString());
    if(!json.header || typeof json.header !== 'string'){
        ws.send(JSON.stringify({header:"error", error: "header is required"}));
        return;
    }
    const messageData = json as Message;
    switch(messageData.header){
        case "ChatConnection":{

        }
    }
  });

  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});

console.log("WebSocket-server started");
