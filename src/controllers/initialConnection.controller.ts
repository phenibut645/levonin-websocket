import { WebSocket } from "ws";
import { InitialConnection, Message } from "../types/message.type";
import { ClientsArray } from "../types/clientsArray.type";
import { findUser } from "../utils/clientsUtil.js";
import { ApiService } from "../services/ApiService.js";

export async function initialConnectionController(ws: WebSocket, message: Message, clients: ClientsArray[]): Promise<string> {
    const initialConnecetion: InitialConnection = message as InitialConnection;
    const { name, token, userId } = initialConnecetion;
    const client = clients.find(el => el.client === ws);
    if(!client) {
        if(await ApiService.IsUsersToken(token, userId)){
            clients.push({
                "client": ws,
                name, token, userId, "connected": true
            })
            return JSON.stringify({header: "InitialConnectionResponse", success: true})
        }
        return JSON.stringify({header: "InitialConnectionResponse", success: false})
    }
    else{
        client.connected = true;
        return JSON.stringify({header: "InitialConnectionResponse", success: true})
    }
    
}