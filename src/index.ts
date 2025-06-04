import { WebSocket, WebSocketServer } from "ws";
import { InitialConnection, Message } from "./types/message.type";
import { ChannelsList } from "./types/channelsObject.type";
import { initialConnectionController } from "./controllers/initialConnection.controller.js";
import { ClientsArray } from "./types/clientsArray.type";
import { findUser } from "./utils/clientsUtil.js";
import { messageInChannelController } from "./controllers/messageInChannel.controller.js";
import { reRenderChannels } from "./controllers/reRenderChannels.controller.js";

const wss = new WebSocketServer({ port: 5000 });

interface IHandlers {
    [key: string]: (ws: WebSocket, message: Message, clients: ClientsArray[]) => Promise<string>
}

const handlers: IHandlers = {
    "InitialConnection": initialConnectionController,
    "MessageInChannel": messageInChannelController,
    "ReRenderChannels": reRenderChannels
    
}

const clients: ClientsArray[] = []

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message: string) => {
    let json;
    try{ json = JSON.parse(message.toString()); }
    catch(err){ ws.send(JSON.stringify({header:"error", error:"Ivalid JSON"})); }
    
    if(!json.header || typeof json.header !== 'string'){
        ws.send(JSON.stringify({header:"error", error: "header is required"}));
        return;
    }
    console.log(json.header, "header")
    const messageData = json as Message;
    const handler = handlers[messageData.header];
    if(handler){
        const response = await handler(ws, messageData, clients);
        ws.send(response);
    }
    else{
        ws.send(JSON.stringify({"header": "error", error: "invalid message"}))
    }
    
  });

  ws.on("close", () => {
    const client = clients.find(el => el.client === ws);
    if(client) client.connected = false;

    console.log("Client has disconnected");
  });
});

console.log("WebSocket-server started");


// {
//   "client": ws,
//   "name": "gg"
// }